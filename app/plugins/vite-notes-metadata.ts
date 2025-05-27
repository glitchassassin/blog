import { readFileSync } from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
import { z } from 'zod'

// Zod schema for frontmatter validation
const FrontmatterSchema = z
	.object({
		title: z.string().optional(),
		date: z.string().optional(),
		category: z.string().optional(),
		excerpt: z.string().optional(),
		tags: z.array(z.string()).optional(),
	})
	.passthrough() // Allow additional properties

// Zod schema for the complete note metadata (including computed fields)
const NoteMetadataSchema = FrontmatterSchema.extend({
	slug: z.string(),
	filePath: z.string(),
})

// Generate TypeScript types from Zod schemas
export type NoteMetadata = z.infer<typeof NoteMetadataSchema>

export function notesMetadataPlugin() {
	const virtualModuleId = 'virtual:notes-metadata'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	let notesData: NoteMetadata[] = []

	const generateNotesMetadata = () => {
		// Find all notes.*.mdx files in the routes directory
		const noteFiles = glob.sync('app/routes/notes.*.mdx')
		const validationErrors: string[] = []
		notesData = []

		for (const filePath of noteFiles) {
			try {
				const content = readFileSync(filePath, 'utf-8')
				const { data: frontmatter } = matter(content)

				// Extract the slug from filename (e.g., notes.entropy-code-thermodynamics.mdx -> entropy-code-thermodynamics)
				const filename = path.basename(filePath, '.mdx')
				const slug = filename
					.replace(/\._[^.]+\./, '.') // remove layout segments
					.replace('notes.', '') // remove notes prefix

				// Validate frontmatter with Zod
				const frontmatterResult = FrontmatterSchema.safeParse(frontmatter)
				if (!frontmatterResult.success) {
					const errorMessages = frontmatterResult.error.errors
						.map((err) => `${err.path.join('.')}: ${err.message}`)
						.join(', ')
					validationErrors.push(`${filePath}: ${errorMessages}`)
					continue // Skip this file if validation fails
				}

				// Create the complete note metadata
				const noteMetadata = {
					slug,
					...frontmatterResult.data,
					filePath: filePath.replace('app/', '/'),
				}

				// Validate the complete metadata
				const metadataResult = NoteMetadataSchema.safeParse(noteMetadata)
				if (!metadataResult.success) {
					const errorMessages = metadataResult.error.errors
						.map((err) => `${err.path.join('.')}: ${err.message}`)
						.join(', ')
					validationErrors.push(`${filePath}: ${errorMessages}`)
					continue // Skip this file if validation fails
				}

				notesData.push(metadataResult.data)
			} catch (error) {
				validationErrors.push(
					`${filePath}: Failed to read or parse file - ${error}`,
				)
			}
		}

		// Report validation errors
		if (validationErrors.length > 0) {
			console.error('\n❌ Notes frontmatter validation errors:')
			validationErrors.forEach((error) => console.error(`  ${error}`))
			console.error(
				`\n${validationErrors.length} file(s) had validation errors and were skipped.\n`,
			)
		}

		// Sort by date (most recent first) - safely handle dates
		notesData.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0
			const dateB = b.date ? new Date(b.date).getTime() : 0
			return dateB - dateA
		})

		if (validationErrors.length > 0) {
			console.log(
				`✅ Generated notes metadata for ${notesData.length} valid notes (${validationErrors.length} files skipped due to validation errors)`,
			)
		} else {
			console.log(
				`✅ Generated notes metadata for ${notesData.length} notes (all passed validation)`,
			)
		}
	}

	const generateVirtualModuleContent = () => {
		return `// This file is auto-generated from notes.*.mdx files in app/routes/
// Virtual module: ${virtualModuleId}

export const notes = ${JSON.stringify(notesData, null, 2)}

export const notesBySlug = notes.reduce((acc, note) => {
	acc[note.slug] = note
	return acc
}, {})

export const notesByCategory = notes.reduce((acc, note) => {
	if (note.category) {
		if (!acc[note.category]) {
			acc[note.category] = []
		}
		acc[note.category].push(note)
	}
	return acc
}, {})

// Create category index by slug
export const notesByCategorySlug = notes.reduce((acc, note) => {
	if (note.category) {
		const categorySlug = slugify(note.category)
		if (!acc[categorySlug]) {
			acc[categorySlug] = []
		}
		acc[categorySlug].push(note)
	}
	return acc
}, {})

export const allTags = Array.from(
	new Set(notes.flatMap(note => note.tags || []))
).sort()

// Create tag index by slug
export const notesByTagSlug = notes.reduce((acc, note) => {
	if (note.tags) {
		note.tags.forEach(tag => {
			const tagSlug = slugify(tag)
			if (!acc[tagSlug]) {
				acc[tagSlug] = []
			}
			acc[tagSlug].push(note)
		})
	}
	return acc
}, {})

// Create lookup maps from slug to human-readable label
export const categorySlugToLabel = notes.reduce((acc, note) => {
	if (note.category) {
		const categorySlug = slugify(note.category)
		acc[categorySlug] = note.category
	}
	return acc
}, {})

export const tagSlugToLabel = notes.reduce((acc, note) => {
	if (note.tags) {
		note.tags.forEach(tag => {
			const tagSlug = slugify(tag)
			acc[tagSlug] = tag
		})
	}
	return acc
}, {})

// Helper function for slugifying (re-exported)
function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		// Remove accents/diacritics
		.normalize('NFD')
		.replace(/[\\u0300-\\u036f]/g, '')
		// Replace spaces and underscores with hyphens
		.replace(/[\\s_]+/g, '-')
		// Remove non-alphanumeric characters except hyphens
		.replace(/[^a-z0-9-]/g, '')
		// Remove multiple consecutive hyphens
		.replace(/-+/g, '-')
		// Remove leading/trailing hyphens
		.replace(/^-+|-+$/g, '')
}
`
	}

	return {
		name: 'notes-metadata',
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id: string) {
			if (id === resolvedVirtualModuleId) {
				return generateVirtualModuleContent()
			}
		},
		buildStart() {
			generateNotesMetadata()
		},
		handleHotUpdate({ file, server }: { file: string; server: any }) {
			// Check if the changed file is a notes MDX file
			if (file.includes('notes.') && file.endsWith('.mdx')) {
				console.log(`Notes file changed: ${file}`)
				generateNotesMetadata()

				// Invalidate the virtual module so it gets reloaded
				const virtualModule = server.moduleGraph.getModuleById(
					resolvedVirtualModuleId,
				)
				if (virtualModule) {
					server.reloadModule(virtualModule)
				}
			}
		},
	}
}
