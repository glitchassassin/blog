import { generateRobotsTxt } from '@nasa-gcn/remix-seo'
import type {LoaderFunctionArgs} from 'react-router';
import { getDomainUrl } from '#app/utils/misc'

export function loader({ request }: LoaderFunctionArgs) {
	const domainUrl = getDomainUrl(request)
	return generateRobotsTxt(
		[
			{ type: 'sitemap', value: `${domainUrl}/sitemap.xml` },
			{ type: 'sitemap', value: `${domainUrl}/rss.xml` }, // RSS feed as additional sitemap
			{ type: 'disallow', value: '/admin' },
			{ type: 'disallow', value: '/api' },
			{ type: 'disallow', value: '/_*' }, // Disallow React Router internal routes
			{ type: 'disallow', value: '/prototypes' }, // Disallow prototype routes
		],
		{
			headers: {
				'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
			},
		},
	)
}
