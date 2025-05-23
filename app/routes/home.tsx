import { type Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Field Notes' },
		{
			name: 'description',
			content: 'The observations and experiments of Jon Winsley',
		},
	]
}

export default function Home() {
	const theme = 'botany'

	return (
		<div className="relative min-h-screen bg-amber-50 transition-colors duration-300 dark:bg-zinc-900">
			{/* Light mode background */}
			<div
				className={
					'absolute inset-0 opacity-10 transition-opacity duration-1000 dark:hidden'
				}
				style={{
					backgroundImage: `url('/app/images/${theme}.png')`,
					backgroundSize: '100% auto',
					backgroundPosition: 'top',
				}}
			></div>

			{/* Dark mode background */}
			<div
				className={
					'absolute inset-0 hidden opacity-10 transition-opacity duration-1000 dark:block'
				}
				style={{
					backgroundImage: `url('/app/images/${theme}-dark.png')`,
					backgroundSize: '100% auto',
					backgroundPosition: 'top',
				}}
			></div>

			<div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
				{/* Header */}
				<header className="mb-16 border-b border-amber-300 pb-8 dark:border-zinc-700">
					<div className="flex flex-col items-center md:flex-row md:items-end md:gap-12">
						{/* Photo and Social Links - wraps above on mobile, right side on desktop */}
						<div className="mb-6 flex flex-row items-center gap-4 md:order-2 md:mb-0 md:flex-col">
							{/* Profile Photo */}
							<div className="relative">
								<img
									src="/app/images/profile_300.jpeg"
									alt="Profile"
									className="h-24 w-24 rounded-full object-cover md:h-30 md:w-30"
								/>
							</div>

							{/* Social Links */}
							<div className="flex flex-col items-center gap-3 md:flex-row">
								<a
									href="https://github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-300 dark:hover:text-stone-100"
									title="GitHub"
								>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
									</svg>
								</a>
								<a
									href="https://discord.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-300 dark:hover:text-stone-100"
									title="Discord"
								>
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
									</svg>
								</a>
							</div>
						</div>

						{/* Title, Navigation, and Search - main content */}
						<div className="flex-1 md:order-1">
							{/* Title and Navigation */}
							<div className="mb-6">
								<h1 className="mb-2 font-serif text-4xl text-amber-900 md:text-5xl dark:text-stone-100">
									Field Notes
								</h1>
								<p className="text-lg text-amber-700 italic dark:font-light dark:text-stone-200">
									The observations and experiments of Jon Winsley
								</p>
								<div className="mt-4 flex items-center gap-4 font-mono text-sm text-amber-700 dark:text-amber-300">
									<a
										href="/cv"
										className="font-medium transition-colors hover:text-amber-900 dark:hover:text-amber-100"
									>
										Curriculum Vitae
									</a>
									<span>•</span>
									<a
										href="/portfolio"
										className="font-medium transition-colors hover:text-amber-900 dark:hover:text-amber-100"
									>
										Portfolio
									</a>
								</div>
							</div>

							{/* Search Bar */}
							<div className="relative max-w-md">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<svg
										className="h-4 w-4 text-amber-600 dark:text-amber-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								<input
									type="search"
									placeholder="Search field notes..."
									className="w-full rounded-md border border-amber-300 bg-amber-100/70 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-stone-200 dark:placeholder-stone-400 dark:focus:ring-amber-400"
								/>
							</div>
						</div>
					</div>
				</header>

				{/* Sample Posts */}
				<main className="space-y-12">
					{/* Post 1 */}
					<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
						<div className="mb-3 flex items-baseline gap-4">
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								March 15, 2024
							</time>
							<span className="text-xs font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
								Mathematics
							</span>
						</div>
						<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
							On the Fibonacci Spiral in Code Architecture
						</h2>
						<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
							While examining the recursive patterns in tree-shaking algorithms,
							I noticed a curious parallel to the golden ratio found in nautilus
							shells and galaxy formations. The optimal branching factor seems
							to converge on φ ≈ 1.618...
						</p>
						<div className="flex gap-2 text-xs">
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								recursion
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								algorithms
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								nature
							</span>
						</div>
					</article>

					{/* Post 2 */}
					<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
						<div className="mb-3 flex items-baseline gap-4">
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								March 8, 2024
							</time>
							<span className="text-xs font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
								Astronomy
							</span>
						</div>
						<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
							Observing Database Orbits: When Transactions Behave Like Celestial
							Bodies
						</h2>
						<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
							Tonight I traced the elliptical paths of long-running database
							transactions, noting how deadlocks form when two queries approach
							their perihelion simultaneously. The gravitational pull of table
							locks creates fascinating orbital mechanics...
						</p>
						<div className="flex gap-2 text-xs">
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								databases
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								concurrency
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								performance
							</span>
						</div>
					</article>

					{/* Post 3 */}
					<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
						<div className="mb-3 flex items-baseline gap-4">
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								February 28, 2024
							</time>
							<span className="text-xs font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
								Botany
							</span>
						</div>
						<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
							The Taxonomy of React Components: A Field Guide
						</h2>
						<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
							After months of observation, I've classified component hierarchies
							into distinct species. The Provider component exhibits
							characteristics similar to the mycorrhizal networks in forest
							ecosystems, facilitating nutrient (data) exchange between distant
							organisms (components)...
						</p>
						<div className="flex gap-2 text-xs">
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								react
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								architecture
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								patterns
							</span>
						</div>
					</article>

					{/* Post 4 */}
					<article className="border-l-2 border-amber-300 pl-6 dark:border-zinc-600">
						<div className="mb-3 flex items-baseline gap-4">
							<time className="font-mono text-sm font-bold text-amber-700 dark:text-amber-400">
								February 14, 2024
							</time>
							<span className="text-xs font-medium tracking-wide text-amber-700 uppercase dark:text-amber-500">
								Physics
							</span>
						</div>
						<h2 className="mb-4 cursor-pointer font-serif text-2xl text-amber-900 transition-colors hover:text-amber-700 dark:text-stone-100 dark:hover:text-stone-200">
							Entropy and Code: Thermodynamic Laws in Software Systems
						</h2>
						<p className="mb-4 leading-relaxed text-amber-800 dark:text-stone-200">
							The second law of thermodynamics suggests that entropy always
							increases in an isolated system. I propose that legacy codebases
							follow similar principles, with technical debt representing the
							inevitable increase in disorder over time...
						</p>
						<div className="flex gap-2 text-xs">
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								entropy
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								technical-debt
							</span>
							<span className="rounded bg-amber-200 px-2 py-1 text-amber-800 dark:bg-zinc-700 dark:text-stone-300">
								philosophy
							</span>
						</div>
					</article>
				</main>

				{/* Footer */}
				<footer className="mt-20 border-t border-amber-200 pt-8 text-center dark:border-zinc-700">
					<p className="font-mono text-sm font-bold text-amber-700 dark:text-stone-400">
						"In every walk with nature, one receives far more than they seek."
					</p>
					<p className="mt-2 text-xs text-amber-700 dark:text-stone-400">
						— John Muir, adapted for the digital naturalist
					</p>
				</footer>
			</div>
		</div>
	)
}
