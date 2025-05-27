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
	export const notesByCategorySlug: Record<string, NoteMetadata[]>
	export const allTags: string[]
	export const notesByTagSlug: Record<string, NoteMetadata[]>
	export const categorySlugToLabel: Record<string, string>
	export const tagSlugToLabel: Record<string, string>
}

declare module 'virtual:portfolio-metadata' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	type PortfolioMetadata =
		import('#app/plugins/vite-portfolio-metadata').PortfolioMetadata

	// Exported data
	export const portfolio: PortfolioMetadata[]
	export const portfolioBySlug: Record<string, PortfolioMetadata>
}
