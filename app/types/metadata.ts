export interface NoteMetadata {
	title?: string
	date?: string
	category?: string
	excerpt?: string
	tags?: string[]
	featureImage?: string
	draft?: boolean
	slug: string
	filePath: string
	readingTime: number
}

export interface SearchIndexEntry extends NoteMetadata {
	content: string
}

export interface PortfolioMetadata {
	title?: string
	date?: string
	excerpt?: string
	featureImage?: string
	slug: string
	filePath: string
}
