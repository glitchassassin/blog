import type { PortfolioMetadata } from '#app/types/metadata'
import { Outlet } from 'react-router'
import { portfolioBySlug } from 'virtual:portfolio-metadata'
import { Footer } from '#app/components/Footer'
import { MDXContent } from '#app/components/mdx/MDXContent'
import { PageLayout } from '#app/components/PageLayout'
import { PortfolioHeader } from '#app/components/PortfolioHeader'
import { SITE_TITLE } from '#app/data'
import { getRoutePathname } from '#app/utils/misc'
import { generateSEOMeta } from '#app/utils/seo'
import type { Route } from './+types/portfolio'

export async function loader({ request }: Route.LoaderArgs) {
	const pathSegments = getRoutePathname(request).split('/')
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

export function meta({ loaderData, location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].loaderData.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: loaderData?.portfolioMetadata?.title
			? `${loaderData.portfolioMetadata.title} | Portfolio | ${SITE_TITLE}`
			: `Portfolio | ${SITE_TITLE}`,
		description:
			loaderData?.portfolioMetadata?.excerpt || 'Portfolio project by Jon Winsley',
		url,
		type: 'article',
		image: loaderData?.portfolioMetadata?.featureImage,
	})
}

export default function PortfolioLayout({
	loaderData: { portfolioMetadata },
}: Route.ComponentProps) {
	return (
		<PageLayout theme="botany">
			<PortfolioHeader
				project={portfolioMetadata}
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
