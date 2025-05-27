import { portfolio } from 'virtual:portfolio-metadata'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { PortfolioProject } from '#app/components/PortfolioProject'
import { type Route } from './+types/portfolio_._index'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Portfolio - Field Notes' },
		{
			name: 'description',
			content: 'A showcase of projects and work by Jon Winsley',
		},
	]
}

export default function Portfolio() {
	return (
		<PageLayout theme="botany">
			<Header />

			{/* Portfolio Header */}
			<div className="mb-12">
				<h1 className="mb-4 font-serif text-4xl text-amber-900 dark:text-stone-100">
					Portfolio
				</h1>
				<p className="text-lg text-amber-700 dark:text-stone-200">
					A showcase of projects, experiments, and professional work.
				</p>
			</div>

			{/* Projects Grid */}
			{portfolio.length > 0 ? (
				<main className="grid gap-8 sm:grid-cols-2">
					{portfolio.map((project) => (
						<PortfolioProject
							key={project.filePath}
							date={project.date ?? ''}
							title={project.title ?? ''}
							excerpt={project.excerpt ?? ''}
							featureImage={project.featureImage}
							href={`/portfolio/${project.slug}`}
						/>
					))}
				</main>
			) : (
				<div className="py-12 text-center">
					<p className="text-amber-700 dark:text-stone-300">
						No portfolio projects found. Check back soon!
					</p>
				</div>
			)}

			<Footer />
		</PageLayout>
	)
}
