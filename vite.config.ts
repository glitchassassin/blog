import { cloudflare } from '@cloudflare/vite-plugin'
import mdx from '@mdx-js/rollup'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { notesMetadataPlugin } from './plugins/vite-notes-metadata'
import { portfolioMetadataPlugin } from './plugins/vite-portfolio-metadata'

export default defineConfig({
	resolve: {
		alias: {
			'#app': fileURLToPath(new URL('./app', import.meta.url)),
			'#tests': fileURLToPath(new URL('./tests', import.meta.url)),
			plugins: fileURLToPath(new URL('./plugins', import.meta.url)),
		},
	},
	plugins: [
		notesMetadataPlugin(),
		portfolioMetadataPlugin(),
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tailwindcss(),
		mdx({
			remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [
				rehypeHighlight,
				rehypeSlug,
				[rehypeAutolinkHeadings, { behavior: 'wrap' }],
			],
			providerImportSource: '@mdx-js/react',
		}),
		reactRouter(),
	],
})
