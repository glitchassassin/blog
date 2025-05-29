import { type ReactNode } from 'react'
import { cn } from '#app/lib/utils'

interface PageLayoutProps {
	children: ReactNode
	theme?: string
	className?: string
}

export function PageLayout({
	children,
	theme = 'botany',
	className,
}: PageLayoutProps) {
	return (
		<div
			className={cn(
				'relative min-h-screen bg-amber-50 px-6 py-12 duration-300 dark:bg-zinc-900',
				className,
			)}
		>
			{/* Light mode background */}
			<div
				className={
					'absolute inset-0 opacity-10 transition-opacity duration-1000 dark:hidden'
				}
				style={{
					backgroundImage: `url('/assets/images/${theme}.png')`,
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
					backgroundImage: `url('/assets/images/${theme}-dark.png')`,
					backgroundSize: '100% auto',
					backgroundPosition: 'top',
				}}
			></div>

			<div className="relative z-10 mx-auto max-w-4xl">{children}</div>
		</div>
	)
}
