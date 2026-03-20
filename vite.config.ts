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
import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { notesMetadataPlugin } from './plugins/vite-notes-metadata'
import { portfolioMetadataPlugin } from './plugins/vite-portfolio-metadata'

export default defineConfig(({ command }) => {
	const plugins: PluginOption[] = [
		notesMetadataPlugin(),
		portfolioMetadataPlugin(),
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
		tsconfigPaths(),
	]

	if (command === 'serve') {
		plugins.splice(2, 0, cloudflare({ viteEnvironment: { name: 'ssr' } }))
	}

	return { plugins }
})
