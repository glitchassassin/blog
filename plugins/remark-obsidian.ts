import { readFileSync } from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'

type MdastNode = {
	type: string
	value?: string
	url?: string
	alt?: string
	title?: string | null
	children?: MdastNode[]
	data?: {
		hName?: string
		hProperties?: Record<string, unknown>
		[key: string]: unknown
	}
	name?: string
	attributes?: Array<{
		type: 'mdxJsxAttribute'
		name: string
		value: string
	}>
}

type NoteReference = {
	slug: string
	title: string
}

const imageExtensions = new Set([
	'avif',
	'gif',
	'jpeg',
	'jpg',
	'png',
	'svg',
	'webp',
])

function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '')
}

function normalizeLookupKey(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\.mdx?$/i, '')
		.replace(/\\/g, '/')
}

function loadNoteLookup() {
	const notes = new Map<string, NoteReference>()

	for (const filePath of glob.sync('app/routes/notes.*.md')) {
		const fileContent = readFileSync(filePath, 'utf-8')
		const { data: frontmatter } = matter(fileContent)
		const filename = path.basename(filePath, path.extname(filePath))
		const slug = filename.replace(/\._[^.]+\./, '.').replace('notes.', '')
		const title =
			typeof frontmatter.title === 'string' ? frontmatter.title : slug
		const note = { slug, title }

		notes.set(normalizeLookupKey(slug), note)
		notes.set(normalizeLookupKey(title), note)
		notes.set(normalizeLookupKey(path.basename(slug)), note)
	}

	return notes
}

function splitObsidianTarget(value: string) {
	const [rawTarget, alias] = value.split('|')
	const [rawPath, heading] = (rawTarget ?? '').split('#')
	const targetPath = rawPath.trim()

	return {
		targetPath,
		heading: heading?.trim() || undefined,
		alias: alias?.trim() || undefined,
	}
}

function isImageTarget(targetPath: string) {
	const extension = targetPath.split('.').pop()?.toLowerCase()
	return extension ? imageExtensions.has(extension) : false
}

function imageUrl(targetPath: string) {
	const normalizedPath = targetPath
		.replace(/^\/+/, '')
		.replace(/^attachments\//i, '')
		.replace(/^assets\/images\//i, '')

	return encodeURI(`/assets/images/${normalizedPath}`)
}

function mdxAttribute(name: string, value: string) {
	return { type: 'mdxJsxAttribute' as const, name, value }
}

function resolveNoteLink(
	noteLookup: Map<string, NoteReference>,
	rawValue: string,
	embedded = false,
): MdastNode {
	const { targetPath, heading, alias } = splitObsidianTarget(rawValue)
	const note = noteLookup.get(normalizeLookupKey(targetPath))
	const label = alias || heading || note?.title || targetPath

	if (!note) {
		return {
			type: 'mdxJsxTextElement',
			name: 'span',
			attributes: [
				mdxAttribute('className', 'obsidian-unresolved-link'),
				mdxAttribute('data-wikilink-target', targetPath),
			],
			children: [{ type: 'text', value: label }],
		}
	}

	const hash = heading ? `#${slugify(heading)}` : ''
	const href = `/notes/${note.slug}${hash}`

	if (embedded) {
		return {
			type: 'mdxJsxTextElement',
			name: 'ObsidianEmbed',
			attributes: [
				mdxAttribute('href', href),
				mdxAttribute('title', label),
				mdxAttribute('targetTitle', note.title),
			],
			children: [],
		}
	}

	return {
		type: 'link',
		url: href,
		title: null,
		children: [{ type: 'text', value: label }],
	}
}

function createFlowEmbed(
	noteLookup: Map<string, NoteReference>,
	rawValue: string,
): MdastNode {
	const inlineEmbed = resolveNoteLink(noteLookup, rawValue, true)

	return {
		...inlineEmbed,
		type: 'mdxJsxFlowElement',
	}
}

function transformObsidianText(
	value: string,
	noteLookup: Map<string, NoteReference>,
): MdastNode[] {
	const nodes: MdastNode[] = []
	const obsidianPattern = /(!)?\[\[([^\]]+)\]\]/g
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = obsidianPattern.exec(value))) {
		if (match.index > lastIndex) {
			nodes.push({
				type: 'text',
				value: stripBlockRefs(value.slice(lastIndex, match.index)),
			})
		}

		const embedded = Boolean(match[1])
		const rawTarget = match[2] ?? ''
		const { targetPath, alias } = splitObsidianTarget(rawTarget)

		if (embedded && isImageTarget(targetPath)) {
			nodes.push({
				type: 'image',
				url: imageUrl(targetPath),
				alt: alias || path.basename(targetPath, path.extname(targetPath)),
				title: null,
			})
		} else {
			nodes.push(resolveNoteLink(noteLookup, rawTarget, embedded))
		}

		lastIndex = match.index + match[0].length
	}

	if (lastIndex < value.length) {
		nodes.push({ type: 'text', value: stripBlockRefs(value.slice(lastIndex)) })
	}

	return nodes.filter((node) => node.type !== 'text' || node.value)
}

function stripBlockRefs(value: string) {
	return value.replace(/(^|\s)\^[A-Za-z0-9_-]+(?=\s|$)/g, '$1')
}

function transformCallout(node: MdastNode) {
	if (node.type !== 'blockquote' || !node.children?.length) {
		return
	}

	const firstChild = node.children[0]
	const firstText = firstChild?.children?.find((child) => child.type === 'text')
	if (!firstText?.value) {
		return
	}

	const match = firstText.value.match(
		/^\[!([A-Za-z][\w-]*)\]([+-]?)[ \t]*([^\r\n]*)(?:\r?\n([\s\S]*))?$/,
	)
	if (!match) {
		return
	}

	const calloutType = match[1].toLowerCase()
	const foldState = match[2] || undefined
	const title = match[3]?.trim() || calloutType
	const remainingText = match[4]?.trimStart()
	firstText.value = title

	if (remainingText) {
		node.children.splice(1, 0, {
			type: 'paragraph',
			children: [{ type: 'text', value: remainingText }],
		})
	}

	node.data = {
		...node.data,
		hProperties: {
			...node.data?.hProperties,
			className: ['obsidian-callout', `obsidian-callout-${calloutType}`],
			'data-callout': calloutType,
			...(foldState ? { 'data-callout-fold': foldState } : {}),
		},
	}

	firstChild.data = {
		...firstChild.data,
		hProperties: {
			...firstChild.data?.hProperties,
			className: ['obsidian-callout-title'],
		},
	}
}

function transformTree(
	node: MdastNode,
	noteLookup: Map<string, NoteReference>,
) {
	if (!node.children?.length) {
		return
	}

	transformCallout(node)

	for (let index = 0; index < node.children.length; index++) {
		const child = node.children[index]

		if (child.type === 'paragraph' && child.children?.length === 1) {
			const onlyChild = child.children[0]
			const embedMatch =
				onlyChild.type === 'text'
					? onlyChild.value?.trim().match(/^!\[\[([^\]]+)\]\]$/)
					: null
			if (embedMatch) {
				const { targetPath } = splitObsidianTarget(embedMatch[1])
				if (!isImageTarget(targetPath)) {
					node.children.splice(
						index,
						1,
						createFlowEmbed(noteLookup, embedMatch[1]),
					)
					continue
				}
			}
		}

		if (child.type === 'text' && child.value) {
			const replacements = transformObsidianText(child.value, noteLookup)
			node.children.splice(index, 1, ...replacements)
			index += replacements.length - 1
			continue
		}

		transformTree(child, noteLookup)
	}
}

export function remarkObsidian() {
	return (tree: MdastNode) => {
		transformTree(tree, loadNoteLookup())
	}
}
