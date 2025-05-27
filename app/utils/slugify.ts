/**
 * Convert text to a URL-friendly slug
 *
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
	return (
		text
			.toString()
			.toLowerCase()
			.trim()
			// Remove accents/diacritics
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			// Replace spaces and underscores with hyphens
			.replace(/[\s_]+/g, '-')
			// Remove non-alphanumeric characters except hyphens
			.replace(/[^a-z0-9-]/g, '')
			// Remove multiple consecutive hyphens
			.replace(/-+/g, '-')
			// Remove leading/trailing hyphens
			.replace(/^-+|-+$/g, '')
	)
}
