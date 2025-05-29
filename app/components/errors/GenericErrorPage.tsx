import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'

export function GenericErrorPage() {
	return (
		<PageLayout theme="botany">
			<Header />
			<main className="mx-auto max-w-4xl px-4">
				<div className="text-center">
					<h1 className="mb-4 font-serif text-4xl text-amber-900 dark:text-stone-100">
						Oops! Something went wrong.
					</h1>
					<p className="text-lg text-amber-700 dark:text-stone-300">
						An unexpected error occurred. Please try again later.
					</p>
				</div>
			</main>
			<Footer />
		</PageLayout>
	)
}
