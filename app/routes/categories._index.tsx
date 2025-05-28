import { useLoaderData, Link } from 'react-router'
import { notesByCategorySlug } from 'virtual:notes-metadata'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { SITE_TITLE } from '#app/data'
import { generateSEOMeta } from '#app/utils/seo'
import { slugify } from '#app/utils/slugify'
import { type Route } from './+types/categories._index'

export function meta({ location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: `Categories | ${SITE_TITLE}`,
		description: 'Browse notes organized by subject matter.',
		url,
		type: 'website',
	})
}

export function loader() {
	const categories = Object.entries(notesByCategorySlug)
		.map(([category, notes]) => ({
			name: category,
			count: notes.length,
			notes: notes.slice(0, 3), // Show first 3 notes as preview
		}))
		.sort((a, b) => b.count - a.count) // Sort by post count descending

	return {
		categories,
	}
}

export default function CategoriesIndex() {
	const { categories } = useLoaderData<typeof loader>()

	return (
		<PageLayout theme="botany">
			<Header />

			<main className="space-y-8">
				<div className="mb-8">
					<h1 className="mb-4 font-serif text-3xl text-amber-900 dark:text-stone-100">
						Categories
					</h1>
					<p className="text-amber-800 dark:text-stone-200">
						Browse notes organized by subject matter
					</p>
				</div>

				{categories.map((category) => (
					<article
						key={category.name}
						className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600"
					>
						<div className="mb-3">
							<h2 className="mb-2 font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
								<Link to={`/categories/${slugify(category.name)}`}>
									{category.name}
								</Link>
							</h2>
							<p className="text-sm text-amber-700 dark:text-amber-400">
								{category.count} {category.count === 1 ? 'note' : 'notes'}
							</p>
						</div>

						{/* Preview of first few notes */}
						{category.notes.length > 0 && (
							<div className="ml-4 space-y-2">
								{category.notes.map((note) => (
									<div key={note.slug} className="text-sm">
										<Link
											to={`/notes/${note.slug}`}
											className="text-amber-800 transition-colors hover:text-amber-600 dark:text-stone-300 dark:hover:text-stone-100"
										>
											{note.title}
										</Link>
										{note.date && (
											<span className="ml-2 font-mono text-xs text-amber-600 dark:text-amber-500">
												{note.date}
											</span>
										)}
									</div>
								))}
								{category.count > 3 && (
									<div className="text-sm">
										<Link
											to={`/categories/${slugify(category.name)}`}
											className="text-amber-600 transition-colors hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
										>
											View all {category.count} notes →
										</Link>
									</div>
								)}
							</div>
						)}
					</article>
				))}
			</main>

			<Footer />
		</PageLayout>
	)
}
