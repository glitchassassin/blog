import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { notesMetadataPlugin } from './app/plugins/vite-notes-metadata'

export default defineConfig({
	plugins: [
		tailwindcss(),
		notesMetadataPlugin(),
		mdx({
			remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [
				rehypeHighlight,
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'wrap' }],
			],
		}),
		reactRouter(),
		tsconfigPaths(),
	],
})
