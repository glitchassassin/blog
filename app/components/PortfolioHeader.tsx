import { Link } from 'react-router'
import { type PortfolioMetadata } from 'virtual:portfolio-metadata'
import { SITE_TITLE } from '#app/data'

interface PortfolioHeaderProps {
	project: PortfolioMetadata
	backLink?: {
		url: string
		label: string
	}
}

export function PortfolioHeader({ project, backLink }: PortfolioHeaderProps) {
	const defaultBackLink = {
		url: '/',
		label: SITE_TITLE,
	}

	const activeBackLink = backLink ?? defaultBackLink

	return (
		<header className="mb-8 border-b border-amber-300 dark:border-zinc-700">
			<div className="flex flex-col">
				{/* Navigation breadcrumb */}
				<div className="mb-4">
					<Link
						to={activeBackLink.url}
						className="font-mono text-sm text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
					>
						← {activeBackLink.label}
					</Link>
				</div>

				{/* Project title and metadata */}
				<div className="mb-4">
					<h1 className="mb-3 font-serif text-3xl text-amber-900 md:text-4xl dark:text-stone-100">
						{project.title ?? 'Untitled Project'}
					</h1>

					{/* Project metadata */}
					{project.date && (
						<div className="mb-4">
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								{project.date}
							</time>
						</div>
					)}

					{/* Excerpt */}
					{project.excerpt && (
						<div className="mb-4">
							<p className="text-lg text-amber-800 dark:text-stone-300">
								{project.excerpt}
							</p>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
