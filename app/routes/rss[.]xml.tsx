import { type LoaderFunctionArgs } from 'react-router'
import { notes } from 'virtual:notes-metadata'
import { SITE_DESCRIPTION, SITE_TITLE } from '#app/data'
import { getDomainUrl } from '#app/utils/misc'

function generateRSSXml(posts: typeof notes, siteUrl: string): string {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
			.filter((post) => post.date) // Only include posts with dates
			.map(
				(post) => `
    <item>
      <title><![CDATA[${post.title || post.slug.replace(/-/g, ' ')}]]></title>
      <description><![CDATA[${post.excerpt || 'Read more...'}]]></description>
      <link>${siteUrl}/notes/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/notes/${post.slug}</guid>
      <pubDate>${new Date(post.date!).toUTCString()}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
    </item>`,
			)
			.join('')}
  </channel>
</rss>`

	return xml
}

export async function loader({ request }: LoaderFunctionArgs) {
	const siteUrl = getDomainUrl(request)
	const xml = generateRSSXml(notes, siteUrl)

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
		},
	})
}
