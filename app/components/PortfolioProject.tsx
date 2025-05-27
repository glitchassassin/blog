import { Link } from 'react-router'

interface PortfolioProjectProps {
	date: string
	title: string
	excerpt: string
	featureImage?: string
	href?: string
}

export function PortfolioProject({
	date,
	title,
	excerpt,
	featureImage,
	href,
}: PortfolioProjectProps) {
	const content = (
		<article className="group overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
			{/* Feature Image */}
			{featureImage && (
				<div className="aspect-video w-full overflow-hidden">
					<img
						src={featureImage}
						alt={title}
						className="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
				</div>
			)}

			{/* Content */}
			<div className="p-6">
				<time className="mb-2 block font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
					{date}
				</time>
				<h3 className="mb-3 font-serif text-xl text-amber-900 transition-colors group-hover:text-amber-700 dark:text-stone-100 dark:group-hover:text-stone-200">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-amber-800 dark:text-stone-300">
					{excerpt}
				</p>
			</div>
		</article>
	)

	if (href) {
		return (
			<Link to={href} className="block">
				{content}
			</Link>
		)
	}

	return content
}
