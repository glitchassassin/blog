import { Link } from 'react-router'
import { PageLayout } from '#app/components/PageLayout'
import printStyles from './print.module.css'

export function meta() {
	return [
		{ title: 'Curriculum Vitae | Jon Winsley' },
		{
			name: 'description',
			content:
				'Professional resume and curriculum vitae of Jon Winsley, Senior Software Engineer',
		},
	]
}

export default function CurriculumVitae() {
	return (
		<PageLayout theme="botany" className="print:p-0">
			{/* Back Link */}
			<div className="mb-4 print:hidden">
				<Link
					to="/"
					className="font-mono text-sm text-amber-700 transition-colors hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100"
				>
					← Field Notes
				</Link>
			</div>

			<div
				className={`${printStyles.cvContainer} print:bg-white print:text-black`}
			>
				{/* Header Section */}
				<header className="mb-8 border-b border-amber-300 pb-6 dark:border-zinc-700 print:mb-6 print:border-gray-300 print:pb-4">
					<div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
						{/* Profile Photo */}
						<div className="flex-shrink-0 print:hidden">
							<img
								src="/assets/images/profile_300.jpeg"
								alt="Jon Winsley"
								className="h-32 w-32 rounded-full border-4 border-amber-200 object-cover dark:border-zinc-600"
							/>
						</div>

						{/* Contact Information */}
						<div className="flex-1 text-center md:text-left">
							<h1 className="mb-2 font-serif text-4xl font-bold text-amber-900 dark:text-stone-100 print:text-3xl print:text-black">
								Jon Winsley
							</h1>
							<p className="mb-4 text-xl text-amber-700 dark:text-stone-200 print:text-lg print:text-gray-700">
								Senior Software Engineer
							</p>

							<div className="space-y-2 text-sm text-amber-800 dark:text-stone-300 print:text-gray-800">
								<div className="flex flex-col gap-2 md:flex-row md:gap-6">
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										<a
											href="mailto:jon.winsley@gmail.com"
											className="hover:underline"
										>
											jon.winsley@gmail.com
										</a>
									</div>
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
										<span>+1 (740) 261-6566</span>
									</div>
								</div>
								<div className="flex flex-col gap-2 md:flex-row md:gap-6">
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
											/>
										</svg>
										<a
											href="https://jonwinsley.com"
											className="hover:underline"
										>
											jonwinsley.com
										</a>
									</div>
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
										<a
											href="https://linkedin.com/in/jon-winsley"
											className="hover:underline"
										>
											linkedin.com/in/jon-winsley
										</a>
									</div>
								</div>
								<div className="flex flex-col gap-2 md:flex-row md:gap-6">
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
										</svg>
										<a
											href="https://github.com/glitchassassin"
											className="hover:underline"
										>
											github.com/glitchassassin
										</a>
									</div>
									<div className="flex items-center justify-center gap-2 md:justify-start">
										<svg
											className="h-4 w-4 print:hidden"
											fill="currentColor"
											viewBox="0 0 662.5 654.9"
										>
											<path d="M321.7 550.8a21 21 0 0112.2-3.6 21 21 0 0117.7 10.5 24.1 24.1 0 0117.8-7.2 24 24 0 01 15.7 6.3 26.6 26.6 0 0126.3-19.7 26.5 26.5 0 019.7 2.1v.6c.4-15.7 13-28.2 28.4-28.7a35.5 35.5 0 01-3.3-19.7c1.5-12.3 9.1-22.4 19.4-27.7l.1.1c-5.3-5.5-8.5-13-8.3-21.3a29.6 29.6 0 016.2-17.5 27.3 27.3 0 01-12.1-33.5 24.5 24.5 0 01-22-25 24.7 24.7 0 01.3-3.8 19.8 19.8 0 01-4.2.4 19.8 19.8 0 01-18.7-15.3 17.7 17.7 0 01-10.3 3c-8.2-.3-15-6-16.8-13.7a11.2 11.2 0 01-5.8 1.4 11.2 11.2 0 01-4.8-1.2v-.2a36.4 36.4 0 01-9.7 16 11.2 11.2 0 015.2 5 11.3 11.3 0 01-.2 10.6 17.8 17.8 0 018.8 29.8 19.7 19.7 0 019.6 9c5 9.7 1.1 21.6-8.6 26.6a24.5 24.5 0 015.3 7c6.2 12.1 1.5 27-10.6 33a24.6 24.6 0 01-6 2.2v.1a27.3 27.3 0 01-11.8 36.8 27.1 27.1 0 01-14.7 2.9 29.7 29.7 0 01-17.7 29 17.2 17.2 0 013 5.6.7.7 0 01-.1 0z" />
											<path d="M623.8 10H38.7A28.7 28.7 0 0010 38.7v577.5a28.7 28.7 0 0028.7 28.7h585.1a28.7 28.7 0 0028.7-28.7V38.7A28.7 28.7 0 00623.8 10zm-26.5 388.8c-3.8 6-9.8 10-16.2 11.6a24.2 24.2 0 01-21.5 39.7 21.8 21.8 0 00-.2-1.1 21 21 0 01-28.8 23.4 17.1 17.1 0 01-2.6 7.5c-2.7 4.3-7 7-11.5 7.7a35.6 35.6 0 01.6 12.2 35.7 35.7 0 01-39.6 31.3h1a29.4 29.4 0 011.5 10.2 29.5 29.5 0 01-30.2 28.7 29.4 29.4 0 01-12.6-3.2 26.6 26.6 0 01-45.4 15.6 24.2 24.2 0 01-45.1 2 21 21 0 01-34.1-13.2 17.1 17.1 0 01-7.8 1.7c-8.7-.2-15.8-7-16.6-15.5l.1-.2a35.5 35.5 0 01-16.9 14 35.7 35.7 0 01-46-18.9 29.4 29.4 0 01-8.2 6.2 29.5 29.5 0 01-39.6-12.8 29.3 29.3 0 01-3.3-12.6 26.6 26.6 0 01-35.3-32.4 24.2 24.2 0 01-23.4-38.6 21 21 0 01-4.7-36.3 17.1 17.1 0 01-5.2-6 17.2 17.2 0 01.3-16.3l.5.1a35.5 35.5 0 01-13.3-6.4 35.7 35.7 0 01-7-49.4 29.4 29.4 0 01-9.4-3.9 29.5 29.5 0 01-9-40.7 29.3 29.3 0 019.3-9.1 26.6 26.6 0 0110-47 24.2 24.2 0 0121.6-39.6l.1 1.1a21 21 0 0128.8-23.5 17.1 17.1 0 012.6-7.5c2.7-4.2 7-6.9 11.6-7.7a35.6 35.6 0 01-.7-12.1 35.7 35.7 0 0138.7-31.4 29.4 29.4 0 01-1.6-10.1c.5-16.3 14-29.2 30.2-28.7a29.3 29.3 0 0112.6 3.1 26.6 26.6 0 0145.4-15.5 24.2 24.2 0 0145.1-2.1 21 21 0 0134.1 13.2 17.1 17.1 0 017.8-1.6c8.8.2 15.8 7 16.7 15.4l-.2.3a35.4 35.4 0 0116.9-14.1c18-7.3 38.4 1.2 46 19A29.4 29.4 0 01451 99a29.5 29.5 0 0139.7 12.8 29.3 29.3 0 013.2 12.6 26.6 26.6 0 0135.4 32.5 24.2 24.2 0 0123.4 38.5 21 21 0 014.7 36.3 17.1 17.1 0 015.1 6 17.2 17.2 0 01-.3 16.4 35.5 35.5 0 0112.9 6.3 35.7 35.7 0 016.9 49.3 29.4 29.4 0 019.4 4 29.5 29.5 0 019 40.6 29.3 29.3 0 01-9.2 9.2 26.6 26.6 0 016.1 35.3z" />
											<path d="M316.6 99.8a24.1 24.1 0 01-17.8 7.2 24 24 0 01-15.6-6.2 26.6 26.6 0 01-26.4 19.6 26.5 26.5 0 01-9.7-2 29.4 29.4 0 01-28.4 28 35.5 35.5 0 013.3 19.7 35.7 35.7 0 01-19.4 27.7c5.3 5.5 8.4 13 8.2 21.3a29.6 29.6 0 01-6.2 17.4c8.6 4.8 14.2 14 14 24.5a27.2 27.2 0 01-1.9 9 24.5 24.5 0 0122 25.1 24.7 24.7 0 01-.3 3.7 19.8 19.8 0 014.2-.3c9.2.2 16.8 6.7 18.8 15.3a17.7 17.7 0 0110.2-3c8.3.2 15 6 16.9 13.7a11.2 11.2 0 0110.2-.4 36.2 36.2 0 018.1-16.9 11.2 11.2 0 01-3.2-3.8 11.3 11.3 0 01.1-10.5A17.8 17.8 0 01295 259a19.7 19.7 0 01-9.6-9 19.8 19.8 0 0110.3-27.4 20 20 0 00-1.6.7 24.5 24.5 0 01-5.4-7 24.5 24.5 0 0116.7-35.2v-.1a27.3 27.3 0 0111.7-36.7 27.1 27.1 0 0114.8-3 29.7 29.7 0 0116-28.2 30 30 0 011.6-.7 17.2 17.2 0 01-2.9-5.6 21 21 0 01-12.2 3.5 21 21 0 01-17.7-10.6zm214.7 217a35.7 35.7 0 01-13.7-31c-7.4 1.7-15.5.6-22.4-3.9a29.6 29.6 0 01-11.8-14.3 27.3 27.3 0 01-28.1-.7 27.2 27.2 0 01-6.9-6.3c-7.6 10.2-21.9 13-32.8 6a24.8 24.8 0 01-3-2.2 19.8 19.8 0 01-1.8 3.8 19.8 19.8 0 01-22.8 8.1 17.7 17.7 0 01-2.8 10.3c-4.4 7-12.9 9.8-20.4 7.4a11.2 11.2 0 01-1.7 5.7c-.6.9-1.3 1.7-2 2.3a36.3 36.3 0 018.4 15.1 11.2 11.2 0 015-1.1 11.3 11.3 0 019.2 5.2 17.8 17.8 0 0130.4 6.5 19.7 19.7 0 0112.5-4.1c11 .2 19.5 9.3 19.3 20.2a19.8 19.8 0 01-.2 2l.2-1.9a24.5 24.5 0 018.7-1.4 24.5 24.5 0 0124 25.2 24.6 24.6 0 01-1 6.3c15.1.4 27 12.9 26.6 28a27.1 27.1 0 01-4.5 14.3A29.7 29.7 0 01517 444a29.7 29.7 0 01-2 9.7l.1-.2 2.7.5a21 21 0 013.3-12.3 21 21 0 0118.2-9.7 24.1 24.1 0 013-19 24 24 0 0113.5-10 26.6 26.6 0 01-3.3-32.8 26.5 26.5 0 016.9-7.2 29.4 29.4 0 01-9.4-38.9 35.5 35.5 0 01-18.6-7.3z" />
											<path d="M532.7 236.4a17.2 17.2 0 012.2-2.9 21 21 0 01-8.9-9 21 21 0 01.8-20.6c-6.2-1.8-11.6-6-14.8-12.2a24 24 0 01-2-16.7 26.6 26.6 0 01-29.9-13.7 26.6 26.6 0 01-2.8-9.6 29.4 29.4 0 01-38.2-11.5 35.5 35.5 0 01-15.7 12.3 35.7 35.7 0 01-33.6-3.8v-.3a29.7 29.7 0 01-14.8 17.7 29.6 29.6 0 01-18.3 3 27.3 27.3 0 01-14.8 23.8 27.2 27.2 0 01-8.8 2.8c4.9 11.7 0 25.4-11.5 31.3a24.7 24.7 0 01-3.4 1.5 19.8 19.8 0 012.3 3.5c4.2 8.2 2.1 18-4.5 23.8a17.7 17.7 0 017.5 7.6c3.8 7.3 2 16-4 21.3a11.2 11.2 0 014.1 4.4c.5.9.8 1.8 1 2.7a36.3 36.3 0 0118-.4 11.3 11.3 0 011.5-3.8 11.3 11.3 0 019.1-5.2 17.8 17.8 0 0121.3-22.7 19.7 19.7 0 013-12.8c5.8-9.2 18-11.9 27.2-6a24.5 24.5 0 013.4-8.2 24.5 24.5 0 0134-7.5 24.5 24.5 0 014.8 4.1 27.3 27.3 0 0137.7-8.4 27.1 27.1 0 0110 11.3c9.5-6.4 22.3-7 32.5-.4a29.7 29.7 0 015.6 4.6zm-188 132a11.2 11.2 0 01-1.3-6.4 36.4 36.4 0 01-9 1.1c-3 0-5.9-.3-8.6-1a11.2 11.2 0 01-1.6 7.9 11.3 11.3 0 01-9.2 5.2 17.8 17.8 0 01-21.2 22.6 19.7 19.7 0 01-3 12.8 19.8 19.8 0 01-27.3 6 24.5 24.5 0 01-3.4 8.2 24.5 24.5 0 01-33.9 7.5 24.6 24.6 0 01-4.9-4.1v.1a27.3 27.3 0 01-37.7 8.3 27.1 27.1 0 01-10-11.2c-9.5 6.4-22.2 7-32.5.4a29.8 29.8 0 01-5.6-4.6 17.4 17.4 0 01-2.2 2.8 21 21 0 019 9 21 21 0 01-.9 20.6c6.2 1.8 11.7 6 14.8 12.2a24 24 0 012 16.7 26.6 26.6 0 0130 13.8 26.5 26.5 0 012.7 9.5 29.4 29.4 0 0138.3 11.5 35.5 35.5 0 0115.7-12.3c11.5-4.6 24-2.8 33.6 3.8a29.6 29.6 0 0114.7-17.4 29.6 29.6 0 0118.3-2.9c.1-9.7 5.5-19.1 14.8-23.9a27.3 27.3 0 018.9-2.8c-5-11.7 0-25.4 11.4-31.3a24.6 24.6 0 013.5-1.4 19.7 19.7 0 01-2.4-3.6c-4.2-8.2-2-17.9 4.5-23.7a17.7 17.7 0 01-7.5-7.6c-3.7-7.4-1.9-16.1 4-21.4a11.2 11.2 0 01-4-4.4z" />
											<path d="M300.4 339.5a11.2 11.2 0 01-6.7 2 11.3 11.3 0 01-9.2-5.1 17.8 17.8 0 01-30.3-6.5 19.7 19.7 0 01-12.6 4c-10.9-.2-19.5-9.3-19.2-20.2a24.5 24.5 0 01-8.8 1.3 24.5 24.5 0 01-22.9-31.5h-.1c-15-.3-27-12.8-26.6-27.9a27.1 27.1 0 014.5-14.3 29.7 29.7 0 01-17.1-27.7 29.7 29.7 0 011.8-9.6 17.4 17.4 0 01-2.7-.5 21 21 0 01-3.3 12.3 21 21 0 01-18.2 9.7c1.6 6.3.7 13.1-3 19a24 24 0 01-13.4 10.1c8.3 8.7 10 22.2 3.2 32.8a26.5 26.5 0 01-6.8 7.2 29.4 29.4 0 019.4 38.8 35.5 35.5 0 0118.5 7.4 35.7 35.7 0 0113.7 30.9c7.5-1.7 15.5-.5 22.5 4a29.6 29.6 0 0111.7 14.2 27.3 27.3 0 0128.1.8 27.2 27.2 0 016.9 6.2c7.6-10.2 22-13 32.8-6a24.6 24.6 0 013 2.3 19.8 19.8 0 011.9-3.8c5-7.8 14.4-10.9 22.8-8.2A17.7 17.7 0 01283 371c4.5-7 13-9.7 20.4-7.3a11.2 11.2 0 016.6-10 36.4 36.4 0 01-9.6-14z" />
										</svg>
										<a
											href="https://www.codewars.com/users/glitchassassin"
											className="hover:underline"
										>
											codewars.com/users/glitchassassin
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Career Profile */}
				<section className="mb-8 print:mb-6">
					<h2 className="mb-4 text-2xl font-bold text-amber-900 dark:text-stone-100 print:text-xl print:text-black">
						Career Profile
					</h2>
					<div className="prose prose-lg print:prose-sm max-w-none text-zinc-700 dark:text-zinc-300 print:text-gray-700">
						<p>
							My programming journey began with computer security, sparking a
							curiosity that grew into something broader: seeing problems from
							both technical and human angles. Over the years, I've put this
							approach to work across general IT, healthcare IT, software
							development, and architecture roles. I love learning new systems
							and technologies, but I'm equally interested in understanding the
							people who use them. This combination helps me build solutions
							that work well in the real world.
						</p>
					</div>
				</section>

				{/* Education & Certifications */}
				<section className="mb-8 print:mb-6">
					<h2 className="mb-6 text-2xl font-bold text-amber-900 dark:text-stone-100 print:text-xl print:text-black">
						Education & Certifications
					</h2>

					<div className="grid gap-4 md:grid-cols-2 print:grid-cols-1">
						<div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50 print:border-gray-300 print:bg-white">
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black">
								Azure Solutions Architect Expert
							</h3>
							<p className="text-sm text-amber-700 dark:text-amber-300 print:text-gray-600">
								Microsoft • 2023
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50 print:border-gray-300 print:bg-white">
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black">
								AWS Certified Solutions Architect
							</h3>
							<p className="text-sm text-amber-700 dark:text-amber-300 print:text-gray-600">
								Amazon Web Services • 2023
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50 print:border-gray-300 print:bg-white">
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black">
								B.S. in Computer Science
							</h3>
							<p className="text-sm text-amber-700 dark:text-amber-300 print:text-gray-600">
								Franklin University • 2015
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50 print:border-gray-300 print:bg-white">
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-100 print:text-black">
								A.A.S in Electrical/Electronics Engineering Technology
							</h3>
							<p className="text-sm text-amber-700 dark:text-amber-300 print:text-gray-600">
								Zane State College • 2008
							</p>
						</div>
					</div>
				</section>

				{/* Experience */}
				<section className="mb-8 print:mb-6">
					<h2 className="mb-6 text-2xl font-bold text-amber-900 dark:text-stone-100 print:text-xl print:text-black">
						Professional Experience
					</h2>

					<div className="space-y-6 print:space-y-4">
						{/* Senior Software Architect */}
						<div className="border-l-4 border-amber-500 pl-6 dark:border-amber-400 print:border-gray-400">
							<div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
								<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 print:text-lg print:text-black">
									Senior Software Architect
								</h3>
								<span className="text-sm font-medium text-amber-700 dark:text-amber-300 print:text-gray-600">
									2021 - Present
								</span>
							</div>
							<p className="mb-3 font-medium text-amber-800 dark:text-amber-200 print:text-gray-800">
								JBS Solutions
							</p>
							<div className="prose max-w-none text-sm text-zinc-700 dark:text-zinc-300 print:text-gray-700">
								<p>
									Working with clients in ecommerce, education, and other
									industries to architect and build internal and external apps.
									Using Django, React, React Native, and other technologies with
									AWS and Azure cloud platforms. Giving architecture guidance
									and technical leadership to other teams, researching
									improvements to our preferred tech stacks, and supporting
									sales & recruiting efforts.
								</p>
							</div>
						</div>

						{/* IT Specialist */}
						<div className="border-l-4 border-amber-500 pl-6 dark:border-amber-400 print:border-gray-400">
							<div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
								<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 print:text-lg print:text-black">
									IT Specialist
								</h3>
								<span className="text-sm font-medium text-amber-700 dark:text-amber-300 print:text-gray-600">
									2019 - 2021
								</span>
							</div>
							<p className="mb-3 font-medium text-amber-800 dark:text-amber-200 print:text-gray-800">
								Bureau of the Fiscal Service
							</p>
							<div className="prose max-w-none text-sm text-zinc-700 dark:text-zinc-300 print:text-gray-700">
								<p>
									Worked with customers to design and build business
									applications with Java/Spring, Javascript/Angular, and other
									software architectures. Designed and implemented Azure
									governance strategies and policies. Guided development process
									improvements and architectural decisions.
								</p>
							</div>
						</div>

						{/* Interface Analyst */}
						<div className="border-l-4 border-amber-500 pl-6 dark:border-amber-400 print:border-gray-400">
							<div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
								<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 print:text-lg print:text-black">
									Interface Analyst
								</h3>
								<span className="text-sm font-medium text-amber-700 dark:text-amber-300 print:text-gray-600">
									2017 - 2019
								</span>
							</div>
							<p className="mb-3 font-medium text-amber-800 dark:text-amber-200 print:text-gray-800">
								Marietta Memorial Hospital
							</p>
							<div className="prose max-w-none text-sm text-zinc-700 dark:text-zinc-300 print:text-gray-700">
								<p>
									Successfully coordinated 3 significant EHR updates. Saved
									$260k annually by migrating data from old EHRs. Saved 400+
									man-hours using scripting tools. Increased visibility of
									system health by developing dashboards to monitor critical
									services. Developed and tested custom interface code in
									object-oriented Python and C# to meet application
									requirements.
								</p>
							</div>
						</div>

						{/* Applications Analyst */}
						<div className="border-l-4 border-amber-500 pl-6 dark:border-amber-400 print:border-gray-400">
							<div className="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
								<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 print:text-lg print:text-black">
									Applications Analyst
								</h3>
								<span className="text-sm font-medium text-amber-700 dark:text-amber-300 print:text-gray-600">
									2015 - 2017
								</span>
							</div>
							<p className="mb-3 font-medium text-amber-800 dark:text-amber-200 print:text-gray-800">
								Marietta Memorial Hospital
							</p>
							<div className="prose max-w-none text-sm text-zinc-700 dark:text-zinc-300 print:text-gray-700">
								<p>
									Provided application support for Finance, Materials, & HR
									departments. Doubled usage of underutilized OnBase software by
									demoing it to other departments.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Print-only footer */}
				<footer className="mt-8 hidden border-t border-gray-300 pt-4 text-center text-xs text-gray-600 print:block">
					<p>
						Jon Winsley • jon.winsley@gmail.com • +1 (740) 261-6566 •
						jonwinsley.com
					</p>
				</footer>
			</div>
		</PageLayout>
	)
}
