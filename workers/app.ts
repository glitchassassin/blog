import { RouterContextProvider, createRequestHandler } from 'react-router'
import { cloudflareContext } from '#app/context'

const requestHandler = createRequestHandler(
	() => import('virtual:react-router/server-build'),
	import.meta.env.MODE,
)

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)
		const isDevelopment = env.ENVIRONMENT === 'development'

		// Force HTTPS - redirect HTTP to HTTPS (except in development)
		if (url.protocol === 'http:' && !isDevelopment) {
			url.protocol = 'https:'
			return Response.redirect(url.toString(), 301)
		}

		const loadContext = new RouterContextProvider()
		loadContext.set(cloudflareContext, { env, ctx })

		const response = await requestHandler(request, loadContext)

		// Add HSTS header for HTTPS-only enforcement (except in development)
		const headers = new Headers(response.headers)
		if (!isDevelopment) {
			headers.set(
				'Strict-Transport-Security',
				'max-age=31536000; includeSubDomains; preload',
			)
		}

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		})
	},
} satisfies ExportedHandler<Env>
