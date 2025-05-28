import { useLoaderData, Link } from 'react-router'
import {
	notesByCategorySlug,
	categorySlugToLabel,
} from 'virtual:notes-metadata'
import { BlogPost } from '#app/components/BlogPost'
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
import { type Route } from './+types/categories.$category'

export function meta({ params, location, matches }: Route.MetaArgs) {
	const categoryName = categorySlugToLabel[params.category] ?? params.category
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: `${categoryName} | Categories | ${SITE_TITLE}`,
		description: `Notes in the ${categoryName} category.`,
		url,
		type: 'website',
	})
}

const POSTS_PER_PAGE = 5

export function loader({ request, params }: Route.LoaderArgs) {
	const categorySlug = params.category

	// Get notes by category slug directly
	const categoryNotes = notesByCategorySlug[categorySlug]

	if (!categoryNotes || categoryNotes.length === 0) {
		throw new Response('Category Not Found', { status: 404 })
	}

	// Get the human-readable category name from the lookup map
	const categoryName = categorySlugToLabel[categorySlug] ?? categorySlug

	const url = new URL(request.url)
	const currentPage = Math.max(1, parseInt(url.searchParams.get('page') || '1'))

	return {
		categoryName,
		notes: categoryNotes,
		currentPage,
	}
}

export default function CategoryPage() {
	const { categoryName, notes, currentPage } = useLoaderData<typeof loader>()

	// Calculate pagination
	const totalPosts = notes.length
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
	const endIndex = startIndex + POSTS_PER_PAGE
	const currentPosts = notes.slice(startIndex, endIndex)

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

	const categoryUrl = `/categories/${slugify(categoryName)}`

	return (
		<PageLayout theme="botany">
			<Header />

			{/* Category Header */}
			<div className="mb-8">
				<div className="mb-4">
					<Link
						to="/categories"
						className="font-mono text-sm text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
					>
						← Categories
					</Link>
				</div>
				<h1 className="mb-4 font-serif text-3xl text-amber-900 dark:text-stone-100">
					{categoryName}
				</h1>
				<p className="text-amber-800 dark:text-stone-200">
					{totalPosts} {totalPosts === 1 ? 'note' : 'notes'} in this category
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
												? categoryUrl
												: `${categoryUrl}?page=${currentPage - 1}`
										}
									/>
								</PaginationItem>
							)}

							{/* First page */}
							{showPrevEllipsis && (
								<>
									<PaginationItem>
										<PaginationLink
											to={categoryUrl}
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
										to={
											page === 1 ? categoryUrl : `${categoryUrl}?page=${page}`
										}
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
											to={`${categoryUrl}?page=${totalPages}`}
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
									<PaginationNext
										to={`${categoryUrl}?page=${currentPage + 1}`}
									/>
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
