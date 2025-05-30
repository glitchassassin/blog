import { Link } from 'react-router'
import { Badge } from '#app/components/ui/badge'
import { slugify } from '#app/utils/slugify'

interface BlogPostProps {
	date: string
	category: string
	title: string
	excerpt: string
	tags: string[]
	href?: string
}

export function BlogPost({
	date,
	category,
	title,
	excerpt,
	tags,
	href,
}: BlogPostProps) {
	return (
		<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
			<div className="mb-3 flex items-baseline gap-4">
				<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
					{date}
				</time>
				{category && (
					<Link
						to={`/categories/${slugify(category)}`}
						className="rounded text-xs font-medium tracking-wide text-amber-700 uppercase hover:text-amber-900 focus:text-amber-900 focus:outline-2 focus:outline-offset-2 focus:outline-amber-500 dark:text-amber-500 dark:hover:text-amber-300 dark:focus:text-amber-300 dark:focus:outline-amber-400"
					>
						{category}
					</Link>
				)}
			</div>
			{href ? (
				<h2 className="mb-4 font-serif text-2xl">
					<Link
						to={href}
						className="rounded text-amber-900 hover:text-amber-700 focus:text-amber-700 focus:outline-2 focus:outline-offset-2 focus:outline-amber-500 dark:text-stone-100 dark:hover:text-stone-200 dark:focus:text-stone-200 dark:focus:outline-amber-400"
					>
						{title}
					</Link>
				</h2>
			) : (
				<h2 className="mb-4 font-serif text-2xl text-amber-900 dark:text-stone-100">
					{title}
				</h2>
			)}
			<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
				{excerpt}
			</p>
			{tags.length > 0 && (
				<div className="flex gap-2 text-xs" aria-label="Post tags">
					{tags.map((tag) => (
						<Link
							key={tag}
							to={`/tags/${slugify(tag)}`}
							className="rounded focus:outline-2 focus:outline-offset-2 focus:outline-amber-500 dark:focus:outline-amber-400"
							aria-label={`View posts tagged with ${tag}`}
						>
							<Badge
								variant="secondary"
								className="hover:bg-amber-300 hover:text-amber-900 dark:hover:bg-zinc-600"
							>
								{tag}
							</Badge>
						</Link>
					))}
				</div>
			)}
		</article>
	)
}
