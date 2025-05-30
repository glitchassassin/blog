import Fuse from 'fuse.js'
import { useLoaderData } from 'react-router'
import { searchIndex, type SearchIndexEntry } from 'virtual:notes-metadata'
import { BlogPost } from '#app/components/BlogPost'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { SITE_TITLE } from '#app/data'
import { generateSEOMeta } from '#app/utils/seo'
import { type Route } from './+types/search'

export function meta({ location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname
	const searchParams = new URLSearchParams(location.search)
	const query = searchParams.get('q') || ''

	const title = query
		? `Search results for "${query}" - ${SITE_TITLE}`
		: `Search - ${SITE_TITLE}`
	const description = query
		? `Search results for "${query}" on ${SITE_TITLE}`
		: `Search through all blog posts on ${SITE_TITLE}`

	return generateSEOMeta({
		title,
		description,
		url,
		type: 'website',
	})
}

export function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const query = url.searchParams.get('q') || ''

	if (!query.trim()) {
		return {
			query: '',
			results: [],
			totalResults: 0,
		}
	}

	// Configure Fuse.js for fuzzy search
	const fuse = new Fuse(searchIndex, {
		keys: [
			{ name: 'title', weight: 0.6 },
			{ name: 'content', weight: 0.4 },
		],
		threshold: 0.15, // Lower = more strict matching
		includeScore: true,
		includeMatches: true,
		minMatchCharLength: 3, // Require at least 3 characters to match
		ignoreLocation: true, // Don't consider position of match in the text
		findAllMatches: false, // Only find the best matches
	})

	// Perform the search
	const searchResults = fuse.search(query)

	// Extract the items from Fuse results
	const results: SearchIndexEntry[] = searchResults.map((result) => result.item)

	return {
		query,
		results,
		totalResults: results.length,
	}
}

export default function Search({
	loaderData: { query, results, totalResults },
}: Route.ComponentProps) {
	return (
		<PageLayout theme="botany">
			<Header />

			<main id="main-content">
				{/* Search Results Header */}
				<div className="mb-8">
					{query ? (
						<>
							<h1 className="mb-2 font-serif text-3xl text-amber-900 dark:text-stone-100">
								Search Results
							</h1>
							<p className="text-lg text-amber-700 dark:text-stone-300">
								{totalResults > 0
									? `Found ${totalResults} result${totalResults === 1 ? '' : 's'} for "${query}"`
									: `No results found for "${query}"`}
							</p>
						</>
					) : (
						<>
							<h1 className="mb-2 font-serif text-3xl text-amber-900 dark:text-stone-100">
								Search
							</h1>
							<p className="text-lg text-amber-700 dark:text-stone-300">
								Enter a search term to find blog posts
							</p>
						</>
					)}
				</div>

				{/* Search Results */}
				{results.length > 0 ? (
					<section className="space-y-12" aria-label="Search results">
						{results.map((post) => (
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
					</section>
				) : query ? (
					<div className="py-12 text-center">
						<p className="text-lg text-amber-700 dark:text-stone-300">
							No posts found matching your search.
						</p>
						<p className="mt-2 text-amber-600 dark:text-stone-400">
							Try different keywords or check your spelling.
						</p>
					</div>
				) : null}
			</main>

			<Footer />
		</PageLayout>
	)
}
