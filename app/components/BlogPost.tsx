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
						className="text-xs font-medium tracking-wide text-amber-700 uppercase transition-colors hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-300"
					>
						{category}
					</Link>
				)}
			</div>
			{href ? (
				<Link to={href}>
					<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
						{title}
					</h2>
				</Link>
			) : (
				<h2 className="mb-4 font-serif text-2xl text-amber-900 dark:text-stone-100">
					{title}
				</h2>
			)}
			<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
				{excerpt}
			</p>
			<div className="flex gap-2 text-xs">
				{tags.map((tag) => (
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
		</article>
	)
}
