export function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ??
		request.headers.get('host') ??
		new URL(request.url).host
	const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http'
	return `${protocol}://${host}`
}

export function getRoutePathname(request: Request) {
	const { pathname } = new URL(request.url)

	// React Router data requests append ".data" to the matched document URL.
	if (pathname.endsWith('/_.data')) {
		return pathname.slice(0, -'_.data'.length) || '/'
	}

	if (pathname.endsWith('.data')) {
		return pathname.slice(0, -'.data'.length)
	}

	return pathname
}
