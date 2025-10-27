import { portfolio } from 'virtual:portfolio-metadata'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { PortfolioProject } from '#app/components/PortfolioProject'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '#app/components/ui/pagination'
import { SITE_TITLE } from '#app/data'
import { getDomainUrl } from '#app/utils/misc'
import { generateSEOMeta } from '#app/utils/seo'
import type { Route } from './+types/portfolio_._index'

export function meta({ location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: `Portfolio | ${SITE_TITLE}`,
		description:
			'A showcase of projects, experiments, and professional work by Jon Winsley.',
		url,
		type: 'website',
	})
}

const PROJECTS_PER_PAGE = 6

export function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const currentPage = Math.max(1, parseInt(url.searchParams.get('page') || '1'))

	// Calculate pagination
	const totalProjects = portfolio.length
	const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE)
	const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
	const endIndex = startIndex + PROJECTS_PER_PAGE
	const currentProjects = portfolio.slice(startIndex, endIndex)

	// Generate page numbers to show
	const getVisiblePages = () => {
		const visiblePages: number[] = []
		const showPages = 5 // Show 5 page numbers at a time

		if (totalPages <= showPages) {
			// Show all pages if total is less than or equal to showPages
			for (let i = 1; i <= totalPages; i++) {
				visiblePages.push(i)
			}
		} else {
			// Calculate range around current page
			let start = Math.max(1, currentPage - Math.floor(showPages / 2))
			let end = Math.min(totalPages, start + showPages - 1)

			// Adjust start if we're near the end
			if (end - start < showPages - 1) {
				start = Math.max(1, end - showPages + 1)
			}

			for (let i = start; i <= end; i++) {
				visiblePages.push(i)
			}
		}

		return visiblePages
	}

	const visiblePages = getVisiblePages()
	const showPrevEllipsis = visiblePages.length > 0 && visiblePages[0]! > 1
	const showNextEllipsis =
		visiblePages.length > 0 &&
		visiblePages[visiblePages.length - 1]! < totalPages

	return {
		domainUrl: getDomainUrl(request),
		currentPage,
		currentProjects,
		totalProjects,
		totalPages,
		startIndex,
		endIndex,
		visiblePages,
		showPrevEllipsis,
		showNextEllipsis,
	}
}

export default function Portfolio({
	loaderData: {
		currentPage,
		currentProjects,
		totalProjects,
		totalPages,
		startIndex,
		endIndex,
		visiblePages,
		showPrevEllipsis,
		showNextEllipsis,
	},
}: Route.ComponentProps) {
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
			{currentProjects.length > 0 ? (
				<main className="grid gap-8 sm:grid-cols-2">
					{currentProjects.map((project) => (
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

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-12 mb-8">
					<Pagination>
						<PaginationContent>
							{/* Previous Button */}
							{currentPage > 1 && (
								<PaginationItem>
									<PaginationPrevious
										to={
											currentPage === 2
												? '/portfolio'
												: `/portfolio?page=${currentPage - 1}`
										}
									/>
								</PaginationItem>
							)}

							{/* First page */}
							{showPrevEllipsis && (
								<>
									<PaginationItem>
										<PaginationLink
											to="/portfolio"
											isActive={currentPage === 1}
										>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								</>
							)}

							{/* Visible page numbers */}
							{visiblePages.map((page) => (
								<PaginationItem key={page}>
									<PaginationLink
										to={page === 1 ? '/portfolio' : `/portfolio?page=${page}`}
										isActive={currentPage === page}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}

							{/* Last page */}
							{showNextEllipsis && (
								<>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink
											to={`/portfolio?page=${totalPages}`}
											isActive={currentPage === totalPages}
										>
											{totalPages}
										</PaginationLink>
									</PaginationItem>
								</>
							)}

							{/* Next Button */}
							{currentPage < totalPages && (
								<PaginationItem>
									<PaginationNext to={`/portfolio?page=${currentPage + 1}`} />
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>

					{/* Page info */}
					<div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
						Showing {startIndex + 1}-{Math.min(endIndex, totalProjects)} of{' '}
						{totalProjects} projects
					</div>
				</div>
			)}

			<Footer />
		</PageLayout>
	)
}
