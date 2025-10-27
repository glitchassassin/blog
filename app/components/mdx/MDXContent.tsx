import { MDXProvider } from '@mdx-js/react'
import type {ReactNode} from 'react';
import { MDXLink } from './MDXLink'

interface MDXContentProps {
	children: ReactNode
}

// Export the components object for MDX
const mdxComponents = {
	a: MDXLink,
}

/**
 * Reusable wrapper component that provides custom MDX components
 * to transform standard HTML elements (like <a>) into custom React components.
 */
export function MDXContent({ children }: MDXContentProps) {
	return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}
