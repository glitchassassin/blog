import { Link } from 'react-router'
import { notesByTagSlug, tagSlugToLabel } from 'virtual:notes-metadata'
import { BlogPost } from '#app/components/BlogPost'
import { DefaultErrorBoundary } from '#app/components/errors/DefaultErrorBoundary'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
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
import { generateSEOMeta } from '#app/utils/seo'
import { slugify } from '#app/utils/slugify'
import type { Route } from './+types/tags.$tag'

export function meta({ params, location, matches }: Route.MetaArgs) {
	const tagName = tagSlugToLabel[params.tag] ?? params.tag
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: `${tagName} | Tags | ${SITE_TITLE}`,
		description: `Notes tagged with ${tagName}.`,
		url,
		type: 'website',
	})
}

const POSTS_PER_PAGE = 5

export function loader({ request, params }: Route.LoaderArgs) {
	const tagSlug = params.tag

	// Get notes by tag slug directly
	const tagNotes = notesByTagSlug[tagSlug]

	if (!tagNotes || tagNotes.length === 0) {
		throw new Response('Tag Not Found', { status: 404 })
	}

	// Get the human-readable tag name from the lookup map
	const tagName = tagSlugToLabel[tagSlug] || tagSlug

	const url = new URL(request.url)
	const currentPage = Math.max(1, parseInt(url.searchParams.get('page') || '1'))

	// Calculate pagination
	const totalPosts = tagNotes.length
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
	const endIndex = startIndex + POSTS_PER_PAGE
	const currentPosts = tagNotes.slice(startIndex, endIndex)

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
		tagName,
		currentPage,
		currentPosts,
		totalPosts,
		totalPages,
		startIndex,
		endIndex,
		visiblePages,
		showPrevEllipsis,
		showNextEllipsis,
	}
}

export default function TagPage({
	loaderData: {
		tagName,
		currentPage,
		currentPosts,
		totalPosts,
		totalPages,
		startIndex,
		endIndex,
		visiblePages,
		showPrevEllipsis,
		showNextEllipsis,
	},
}: Route.ComponentProps) {
	const tagUrl = `/tags/${slugify(tagName)}`

	return (
		<PageLayout theme="botany">
			<Header />

			{/* Tag Header */}
			<div className="mb-8">
				<div className="mb-4">
					<Link
						to="/tags"
						className="font-mono text-sm text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
					>
						← Tags
					</Link>
				</div>
				<h1 className="mb-4 font-serif text-3xl text-amber-900 dark:text-stone-100">
					{tagName}
				</h1>
				<p className="text-amber-800 dark:text-stone-200">
					{totalPosts} {totalPosts === 1 ? 'note' : 'notes'} tagged with "
					{tagName}"
				</p>
			</div>

			{/* Posts */}
			<main className="space-y-12">
				{currentPosts.map((post) => (
					<BlogPost
						key={post.filePath}
						date={post.date ?? ''}
						category={post.category ?? ''}
						title={post.title ?? ''}
						excerpt={post.excerpt ?? ''}
						tags={post.tags ?? []}
						href={`/notes/${post.slug}`}
					/>
				))}
			</main>

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
												? tagUrl
												: `${tagUrl}?page=${currentPage - 1}`
										}
									/>
								</PaginationItem>
							)}

							{/* First page */}
							{showPrevEllipsis && (
								<>
									<PaginationItem>
										<PaginationLink to={tagUrl} isActive={currentPage === 1}>
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
										to={page === 1 ? tagUrl : `${tagUrl}?page=${page}`}
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
											to={`${tagUrl}?page=${totalPages}`}
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
									<PaginationNext to={`${tagUrl}?page=${currentPage + 1}`} />
								</PaginationItem>
							)}
						</PaginationContent>
					</Pagination>

					{/* Page info */}
					<div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
						Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of{' '}
						{totalPosts} posts
					</div>
				</div>
			)}

			<Footer />
		</PageLayout>
	)
}

export { DefaultErrorBoundary as ErrorBoundary }
