declare module '*.mdx' {
	let MDXComponent: (props: any) => JSX.Element
	export const frontmatter: any
	export default MDXComponent
}

declare module 'virtual:notes-metadata' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	type NoteMetadata = import('#app/plugins/vite-notes-metadata').NoteMetadata

	// Exported data
	export const notes: NoteMetadata[]
	export const notesBySlug: Record<string, NoteMetadata>
	export const notesByCategory: Record<string, NoteMetadata[]>
	export const allTags: string[]
}
