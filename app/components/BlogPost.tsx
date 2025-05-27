import { Link } from 'react-router'
import { Badge } from '#app/components/ui/badge'

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
	const PostContent = (
		<>
			<div className="mb-3 flex items-baseline gap-4">
				<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
					{date}
				</time>
				<span className="text-xs font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
					{category}
				</span>
			</div>
			<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
				{title}
			</h2>
			<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
				{excerpt}
			</p>
			<div className="flex gap-2 text-xs">
				{tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						{tag}
					</Badge>
				))}
			</div>
		</>
	)

	return (
		<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
			{href ? (
				<Link to={href} className="block">
					{PostContent}
				</Link>
			) : (
				PostContent
			)}
		</article>
	)
}
