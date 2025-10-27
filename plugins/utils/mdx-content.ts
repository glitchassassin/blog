/**
 * Clean MDX content by removing markup and formatting
 * Used for both reading time calculation and search indexing
 */
export function cleanMDXContent(content: string): string {
	return (
		content
			// Remove MDX/JSX components and their props
			.replace(/<[^>]*>/g, ' ')
			// Remove code blocks (```...```)
			.replace(/```[\s\S]*?```/g, ' ')
			// Remove inline code (`...`)
			.replace(/`[^`]*`/g, ' ')
			// Remove markdown links but keep the text
			.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
			// Remove markdown images
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
			// Remove markdown headers
			.replace(/^#{1,6}\s+/gm, '')
			// Remove markdown emphasis
			.replace(/[*_]{1,2}([^*_]*)[*_]{1,2}/g, '$1')
			// Remove extra whitespace and normalize
			.replace(/\s+/g, ' ')
			.trim()
	)
}
