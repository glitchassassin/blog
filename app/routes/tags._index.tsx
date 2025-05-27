import { useLoaderData, Link } from 'react-router'
import { notesByTagSlug } from 'virtual:notes-metadata'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { slugify } from '#app/utils/slugify'

export function meta() {
	return [
		{ title: 'Tags | Field Notes' },
		{
			name: 'description',
			content: 'Browse notes by tag',
		},
	]
}

export function loader() {
	const tagStats = Object.entries(notesByTagSlug)
		.map(([tag, notes]) => ({
			name: tag,
			count: notes.length,
			notes: notes.slice(0, 3), // Show first 3 notes as preview
		}))
		.sort((a, b) => b.count - a.count) // Sort by post count descending

	return { tags: tagStats }
}

export default function TagsIndex() {
	const { tags } = useLoaderData<typeof loader>()

	return (
		<PageLayout theme="botany">
			<Header />

			<main className="space-y-8">
				<div className="mb-8">
					<h1 className="mb-4 font-serif text-3xl text-amber-900 dark:text-stone-100">
						Tags
					</h1>
					<p className="text-amber-800 dark:text-stone-200">
						Browse notes by topic tags
					</p>
				</div>

				{tags.map((tag) => (
					<article
						key={tag.name}
						className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600"
					>
						<div className="mb-3">
							<h2 className="mb-2 font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
								<Link to={`/tags/${slugify(tag.name)}`}>{tag.name}</Link>
							</h2>
							<p className="text-sm text-amber-700 dark:text-amber-400">
								{tag.count} {tag.count === 1 ? 'note' : 'notes'}
							</p>
						</div>

						{/* Preview of first few notes */}
						{tag.notes.length > 0 && (
							<div className="ml-4 space-y-2">
								{tag.notes.map((note) => (
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
								{tag.count > 3 && (
									<div className="text-sm">
										<Link
											to={`/tags/${slugify(tag.name)}`}
											className="text-amber-600 transition-colors hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
										>
											View all {tag.count} notes →
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
