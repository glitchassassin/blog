import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { ProgressBar } from './components/ProgressBar'
import { SITE_TITLE } from './data'
import { ClientHintCheck, getHints } from './utils/client-hints'
import { getDomainUrl } from './utils/misc'

export async function loader({ request }: Route.LoaderArgs) {
	return {
		requestInfo: {
			hints: getHints(request),
		},
		domainUrl: getDomainUrl(request),
	}
}

export const meta: Route.MetaFunction = ({ data }) => [
	{ title: SITE_TITLE },
	{
		name: 'description',
		content: 'The observations and experiments of Jon Winsley',
	},
	// OpenGraph tags
	{ property: 'og:title', content: SITE_TITLE },
	{
		property: 'og:description',
		content: 'The observations and experiments of Jon Winsley',
	},
	{ property: 'og:type', content: 'website' },
	{ property: 'og:url', content: data?.domainUrl },
	{ property: 'og:site_name', content: SITE_TITLE },
	{ property: 'og:locale', content: 'en_US' },

	// Twitter Card tags
	{ name: 'twitter:card', content: 'summary_large_image' },
	{ name: 'twitter:title', content: SITE_TITLE },
	{
		name: 'twitter:description',
		content: 'The observations and experiments of Jon Winsley',
	},
	{ name: 'twitter:creator', content: '@jonwinsley' }, // Update to your Twitter handle

	// Additional SEO tags
	{ name: 'author', content: 'Jon Winsley' },
	{ name: 'robots', content: 'index, follow' },
	{ name: 'googlebot', content: 'index, follow' },

	// RSS feed
	{
		tagName: 'link',
		rel: 'alternate',
		type: 'application/rss+xml',
		title: `${SITE_TITLE} RSS Feed`,
		href: '/rss.xml',
	},
]

export const links: Route.LinksFunction = () => [
	// Standard favicon
	{ rel: 'icon', href: '/assets/favicon.ico' },

	// PNG favicons for different sizes
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '16x16',
		href: '/assets/favicon-16x16.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '32x32',
		href: '/assets/favicon-32x32.png',
	},

	// Apple Touch Icon
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/assets/apple-touch-icon.png',
	},

	// Android Chrome icons
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '192x192',
		href: '/assets/android-chrome-192x192.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '512x512',
		href: '/assets/android-chrome-512x512.png',
	},

	// Web App Manifest
	{ rel: 'manifest', href: '/site.webmanifest' },

	// Fonts
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
]

function Document({
	children,
	theme = 'light',
}: {
	children: React.ReactNode
	theme?: string
}) {
	return (
		<html lang="en" className={theme}>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#f59e0b" />
				<meta name="msapplication-TileColor" content="#f59e0b" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App({ loaderData }: Route.ComponentProps) {
	const theme = loaderData.requestInfo.hints.theme

	return (
		<Document theme={theme}>
			<ProgressBar />
			<Outlet />
		</Document>
	)
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = 'Oops!'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	)
}
