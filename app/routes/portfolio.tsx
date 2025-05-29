import { Outlet, useLoaderData } from 'react-router'
import { portfolioBySlug } from 'virtual:portfolio-metadata'
import { Footer } from '#app/components/Footer'
import { MDXContent } from '#app/components/mdx/MDXContent'
import { NoteHeader } from '#app/components/NoteHeader'
import { PageLayout } from '#app/components/PageLayout'
import { SITE_TITLE } from '#app/data'
import { type PortfolioMetadata } from '#app/plugins/vite-portfolio-metadata'
import { generateSEOMeta } from '#app/utils/seo'
import { type Route } from './+types/portfolio'

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const pathSegments = url.pathname.split('/')
	const portfolioIndex = pathSegments.indexOf('portfolio')

	let portfolioMetadata: PortfolioMetadata | null = null

	if (portfolioIndex !== -1 && portfolioIndex < pathSegments.length - 1) {
		const slug = pathSegments[portfolioIndex + 1]
		if (slug) {
			portfolioMetadata = portfolioBySlug[slug] || null
		}
	}

	if (!portfolioMetadata) {
		throw new Response('Not Found', { status: 404 })
	}

	return {
		portfolioMetadata,
	}
}

export function meta({ data, location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: data?.portfolioMetadata?.title
			? `${data.portfolioMetadata.title} | Portfolio | ${SITE_TITLE}`
			: `Portfolio | ${SITE_TITLE}`,
		description:
			data?.portfolioMetadata?.excerpt || 'Portfolio project by Jon Winsley',
		url,
		type: 'article',
	})
}

export default function PortfolioLayout() {
	const { portfolioMetadata } = useLoaderData<typeof loader>()

	return (
		<PageLayout theme="botany">
			<NoteHeader
				note={portfolioMetadata}
				backLink={{
					url: '/portfolio',
					label: 'Portfolio',
				}}
			/>

			<main className="mx-auto max-w-4xl px-4 py-4">
				<article className="prose prose-lg dark:prose-invert mx-auto">
					<MDXContent>
						<Outlet />
					</MDXContent>
				</article>
			</main>

			<Footer />
		</PageLayout>
	)
}
