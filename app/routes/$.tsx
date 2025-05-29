import { redirect } from 'react-router'
import { notesBySlug } from 'virtual:notes-metadata'
import { DefaultErrorBoundary } from '#app/components/errors/DefaultErrorBoundary'
import { SITE_TITLE } from '#app/data'
import { generateSEOMeta } from '#app/utils/seo'
import { type Route } from './+types/$'

export async function loader({ params }: Route.LoaderArgs) {
	const splatPath = params['*'] ?? ''

	// Extract the last segment as potential slug
	// For URLs like "/screeps/2021/08/24/screeps-for-science/" we want "screeps-for-science"
	const segments = splatPath.split('/').filter(Boolean)
	const potentialSlug = segments[segments.length - 1]

	if (potentialSlug && notesBySlug[potentialSlug]) {
		// Found a matching note! Redirect to the new path
		throw redirect(`/notes/${potentialSlug}`, 301)
	}

	// No matching note found, throw 404 with data for the error boundary
	throw new Response('Not Found', {
		status: 404,
		statusText: 'Not Found',
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}

export function meta({ location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: `Page Not Found | ${SITE_TITLE}`,
		description: 'The page you were looking for could not be found.',
		url,
		type: 'website',
	})
}

export { DefaultErrorBoundary as ErrorBoundary }

// Remove the default export since we're using ErrorBoundary
export default function SplatRoute() {
	// This should never be reached since the loader always throws
	return null
}
