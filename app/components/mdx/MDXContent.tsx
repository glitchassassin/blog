import { MDXProvider } from '@mdx-js/react'
import { FileText } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { MDXLink } from './MDXLink'

interface MDXContentProps {
	children: ReactNode
}

// Export the components object for MDX
const mdxComponents = {
	a: MDXLink,
	ObsidianEmbed,
}

interface ObsidianEmbedProps {
	href: string
	title: string
	targetTitle?: string
}

function ObsidianEmbed({ href, title, targetTitle }: ObsidianEmbedProps) {
	return (
		<Link to={href} className="obsidian-embed">
			<FileText aria-hidden="true" className="obsidian-embed-icon" />
			<span>
				<span className="obsidian-embed-title">{title}</span>
				{targetTitle && targetTitle !== title ? (
					<span className="obsidian-embed-target">{targetTitle}</span>
				) : null}
			</span>
		</Link>
	)
}

/**
 * Reusable wrapper component that provides custom MDX components
 * to transform standard HTML elements (like <a>) into custom React components.
 */
export function MDXContent({ children }: MDXContentProps) {
	return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}
