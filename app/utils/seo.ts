import { SITE_TITLE } from '#app/data'

export interface SEOConfig {
	title: string
	description: string
	url: string
	image?: string
	type?: 'website' | 'article'
	publishedTime?: string
	modifiedTime?: string
	author?: string
	tags?: string[]
}

export function generateSEOMeta(config: SEOConfig) {
	const twitterHandle = '@jonwinsley' // Update to your Twitter handle

	const meta = [
		{ title: config.title },
		{ name: 'description', content: config.description },

		// OpenGraph tags
		{ property: 'og:title', content: config.title },
		{ property: 'og:description', content: config.description },
		{ property: 'og:type', content: config.type || 'website' },
		{ property: 'og:url', content: config.url },
		{ property: 'og:site_name', content: SITE_TITLE },
		{ property: 'og:locale', content: 'en_US' },

		// Twitter Card tags
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: config.title },
		{ name: 'twitter:description', content: config.description },
		{ name: 'twitter:creator', content: twitterHandle },

		// Additional SEO tags
		{ name: 'author', content: config.author || 'Jon Winsley' },
		{ name: 'robots', content: 'index, follow' },
	]

	// Add image (use default if none provided)
	const domain = new URL(config.url).origin
	const imageUrl =
		domain + (config.image ?? '/assets/images/site-feature-image-optimized.png')
	meta.push(
		{ property: 'og:image', content: imageUrl },
		{ name: 'twitter:image', content: imageUrl },
	)

	// Add article-specific tags
	if (config.type === 'article') {
		if (config.publishedTime) {
			meta.push({
				property: 'article:published_time',
				content: config.publishedTime,
			})
		}
		if (config.modifiedTime) {
			meta.push({
				property: 'article:modified_time',
				content: config.modifiedTime,
			})
		}
		if (config.author) {
			meta.push({ property: 'article:author', content: config.author })
		}
		if (config.tags) {
			config.tags.forEach((tag) => {
				meta.push({ property: 'article:tag', content: tag })
			})
		}
	}

	return meta
}

export function generateBlogPostMeta(
	title: string,
	description: string,
	slug: string,
	date: string,
	tags?: string[],
) {
	const url = `https://jonwinsley.com/notes/${date}/${slug}` // Update to your actual domain

	return generateSEOMeta({
		title: `${title} | ${SITE_TITLE}`,
		description,
		url,
		type: 'article',
		publishedTime: new Date(date).toISOString(),
		tags,
	})
}
