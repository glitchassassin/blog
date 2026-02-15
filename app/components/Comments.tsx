import Giscus from '@giscus/react'
import { useHints } from '#app/utils/client-hints'

export function Comments() {
	const { theme } = useHints()

	return (
		<section className="mt-12 border-t border-amber-300 pt-8 dark:border-zinc-700">
			<Giscus
				repo="glitchassassin/blog"
				repoId=""
				category="Blog Comments"
				categoryId=""
				mapping="pathname"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme={theme === 'dark' ? 'dark' : 'light'}
				lang="en"
				loading="lazy"
			/>
		</section>
	)
}
