import type {LoaderFunctionArgs} from 'react-router';
import { notes } from 'virtual:notes-metadata'
import { portfolio } from 'virtual:portfolio-metadata'
import { getDomainUrl } from '#app/utils/misc'

interface SitemapEntry {
	url: string
	lastmod?: string
	changefreq?:
		| 'always'
		| 'hourly'
		| 'daily'
		| 'weekly'
		| 'monthly'
		| 'yearly'
		| 'never'
	priority?: number
}

function generateSitemapXml(entries: SitemapEntry[]): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`,
	)
	.join('\n')}
</urlset>`
}

export async function loader({ request }: LoaderFunctionArgs) {
	const siteUrl = getDomainUrl(request)

	const entries: SitemapEntry[] = [
		// Static routes
		{
			url: siteUrl,
			changefreq: 'daily',
			priority: 1.0,
		},
		{
			url: `${siteUrl}/notes`,
			changefreq: 'daily',
			priority: 0.9,
		},
		{
			url: `${siteUrl}/portfolio`,
			changefreq: 'weekly',
			priority: 0.8,
		},
		{
			url: `${siteUrl}/categories`,
			changefreq: 'weekly',
			priority: 0.7,
		},
		{
			url: `${siteUrl}/tags`,
			changefreq: 'weekly',
			priority: 0.7,
		},

		// Blog posts
		...notes.map((note) => ({
			url: `${siteUrl}/notes/${note.slug}`,
			lastmod: note.date ? new Date(note.date).toISOString() : undefined,
			changefreq: 'monthly' as const,
			priority: 0.8,
		})),

		// Portfolio projects
		...portfolio.map((project) => ({
			url: `${siteUrl}/portfolio/${project.slug}`,
			lastmod: project.date ? new Date(project.date).toISOString() : undefined,
			changefreq: 'monthly' as const,
			priority: 0.7,
		})),
	]

	const xml = generateSitemapXml(entries)

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
		},
	})
}
