import { Link } from 'react-router'
import { type NoteMetadata } from '#app/plugins/vite-notes-metadata'

interface NoteHeaderProps {
	note: NoteMetadata
}

export function NoteHeader({ note }: NoteHeaderProps) {
	return (
		<header className="mb-8 border-b border-amber-300 dark:border-zinc-700">
			<div className="flex flex-col">
				{/* Navigation breadcrumb */}
				<div className="mb-4">
					<Link
						to="/"
						className="font-mono text-sm text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
					>
						← Field Notes
					</Link>
				</div>

				{/* Note title and metadata */}
				<div className="mb-4">
					<h1 className="mb-3 font-serif text-3xl text-amber-900 md:text-4xl dark:text-stone-100">
						{note.title || 'Untitled Note'}
					</h1>

					{/* Note metadata */}
					<div className="mb-4 flex flex-wrap items-center gap-4">
						{note.date && (
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								{note.date}
							</time>
						)}
						{note.category && (
							<>
								<span className="text-amber-600 dark:text-amber-500">•</span>
								<span className="text-sm font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
									{note.category}
								</span>
							</>
						)}
					</div>

					{/* Tags */}
					{note.tags && note.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{note.tags.map((tag) => (
								<span
									key={tag}
									className="rounded bg-amber-200 px-2 py-1 text-xs text-amber-800 dark:bg-zinc-700 dark:text-stone-300"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
