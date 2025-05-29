import { Link } from 'react-router'
import { Badge } from '#app/components/ui/badge'
import { type NoteMetadata } from '#app/plugins/vite-notes-metadata'
import { slugify } from '#app/utils/slugify'

interface RelatedNotesProps {
	relatedNotes: NoteMetadata[]
}

export function RelatedNotes({ relatedNotes }: RelatedNotesProps) {
	if (relatedNotes.length === 0) {
		return null
	}

	return (
		<section className="mt-12 border-t border-amber-300 pt-8 dark:border-zinc-700">
			<h2 className="mb-6 font-serif text-2xl text-amber-900 dark:text-stone-100">
				Related Posts
			</h2>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{relatedNotes.map((note) => (
					<article
						key={note.slug}
						className="group overflow-hidden rounded-lg border border-amber-200 bg-amber-50/50 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50"
					>
						<div className="p-6">
							<div className="mb-3 flex items-center gap-4">
								{note.category && (
									<Link
										to={`/categories/${slugify(note.category)}`}
										className="text-xs font-medium tracking-wide text-amber-700 uppercase transition-colors hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-300"
									>
										{note.category}
									</Link>
								)}
								{note.readingTime && (
									<span className="font-mono text-xs text-amber-700 dark:text-amber-400">
										{note.readingTime} min read
									</span>
								)}
							</div>

							<h3 className="mb-3 font-serif text-lg text-amber-900 transition-colors group-hover:text-amber-700 dark:text-stone-100 dark:group-hover:text-stone-200">
								<Link to={`/notes/${note.slug}`} className="block">
									{note.title}
								</Link>
							</h3>

							{note.excerpt && (
								<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-amber-800 dark:text-stone-300">
									{note.excerpt}
								</p>
							)}

							{note.date && (
								<time
									dateTime={note.date}
									className="mb-3 block font-mono text-xs font-bold text-amber-700 dark:text-amber-400"
								>
									{note.date}
								</time>
							)}

							{note.tags && note.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 text-xs">
									{note.tags.map((tag) => (
										<Link key={tag} to={`/tags/${slugify(tag)}`}>
											<Badge
												variant="secondary"
												className="transition-colors hover:bg-amber-300 hover:text-amber-900 dark:hover:bg-zinc-600"
											>
												{tag}
											</Badge>
										</Link>
									))}
								</div>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
