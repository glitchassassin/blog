import { ExternalLink } from 'lucide-react'
import type {ComponentPropsWithoutRef} from 'react';
import { Link } from 'react-router'

// Custom link component that uses React Router Link for all links
export function MDXLink({
	href,
	children,
	...props
}: ComponentPropsWithoutRef<'a'>) {
	// Handle undefined or empty href
	if (!href) {
		return <span {...props}>{children}</span>
	}

	// Check if it's an external link for visual indicator
	const isExternal =
		href.startsWith('http') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:')

	// Use React Router Link for all links (it handles external URLs intelligently)
	if (isExternal) {
		return (
			<Link
				to={href}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
				<ExternalLink className="inline h-3 w-3 opacity-70 ml-0.5" />
			</Link>
		)
	}

	// Internal links don't need special attributes
	return (
		<Link to={href} {...props}>
			{children}
		</Link>
	)
}
