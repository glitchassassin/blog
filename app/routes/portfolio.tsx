import { Outlet, useLoaderData } from 'react-router'
import { portfolioBySlug } from 'virtual:portfolio-metadata'
import { Footer } from '#app/components/Footer'
import { NoteHeader } from '#app/components/NoteHeader'
import { PageLayout } from '#app/components/PageLayout'
import { type PortfolioMetadata } from '#app/plugins/vite-portfolio-metadata'
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

	return { portfolioMetadata }
}

export function meta({ data }: Route.MetaArgs) {
	if (data?.portfolioMetadata) {
		const project = data.portfolioMetadata
		return [
			{
				title: project.title
					? `${project.title} | Portfolio | Field Notes`
					: 'Portfolio | Field Notes',
			},
			{
				name: 'description',
				content: project.excerpt || 'Portfolio project by Jon Winsley',
			},
		]
	}

	return [
		{ title: 'Portfolio | Field Notes' },
		{
			name: 'description',
			content: 'Portfolio projects by Jon Winsley',
		},
	]
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
					<Outlet />
				</article>
			</main>

			<Footer />
		</PageLayout>
	)
}
