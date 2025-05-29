import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'

export function NotFoundPage() {
	return (
		<PageLayout theme="botany">
			<Header />

			<main className="mx-auto max-w-4xl px-4">
				<div className="text-center">
					<div className="mb-8">
						<h1 className="mb-4 font-serif text-6xl text-amber-900 dark:text-stone-100">
							Page Not Found
						</h1>
						<p className="mx-auto max-w-2xl text-lg text-amber-700 dark:text-stone-300">
							Sorry about that! It seems this link no longer works.
						</p>
					</div>
				</div>
			</main>

			<Footer />
		</PageLayout>
	)
}
