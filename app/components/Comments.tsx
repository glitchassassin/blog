import Giscus from '@giscus/react'

export function Comments() {
	return (
		<section className="mt-12 border-t border-amber-300 pt-8 dark:border-zinc-700">
			<Giscus
				repo="glitchassassin/blog"
				repoId="R_kgDOOusdMQ"
				category="Blog Comments"
				categoryId="DIC_kwDOOusdMc4CqxxD"
				mapping="pathname"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="https://jonwinsley.com/giscus-theme.css"
				lang="en"
				loading="lazy"
			/>
		</section>
	)
}
