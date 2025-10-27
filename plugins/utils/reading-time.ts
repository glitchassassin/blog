import { cleanMDXContent } from './mdx-content'

/**
 * Calculate reading time for text content
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
	// Clean the content by removing MDX/HTML tags and code blocks
	const cleanContent = cleanMDXContent(content)

	// Count words (split by whitespace and filter out empty strings)
	const words = cleanContent.split(/\s+/).filter((word) => word.length > 0)
	const wordCount = words.length

	// Calculate reading time in minutes (200 words per minute)
	// Round to nearest minute, with minimum of 1 minute
	const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200))

	return readingTimeMinutes
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
	if (minutes === 1) {
		return '1 min read'
	}
	return `${minutes} min read`
}
