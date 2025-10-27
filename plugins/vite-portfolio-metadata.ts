import { readFileSync } from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
import { z } from 'zod'

// Zod schema for frontmatter validation (no categories or tags)
const FrontmatterSchema = z
	.object({
		title: z.string().optional(),
		date: z.string().optional(),
		excerpt: z.string().optional(),
		featureImage: z.string().optional(),
	})
	.passthrough() // Allow additional properties

// Zod schema for the complete portfolio metadata (including computed fields)
const PortfolioMetadataSchema = FrontmatterSchema.extend({
	slug: z.string(),
	filePath: z.string(),
})

// Generate TypeScript types from Zod schemas
export type PortfolioMetadata = z.infer<typeof PortfolioMetadataSchema>

export function portfolioMetadataPlugin() {
	const virtualModuleId = 'virtual:portfolio-metadata'
	const resolvedVirtualModuleId = '\0' + virtualModuleId

	let portfolioData: PortfolioMetadata[] = []

	const generatePortfolioMetadata = () => {
		// Find all portfolio.*.mdx files in the routes directory
		const portfolioFiles = glob.sync('app/routes/portfolio.*.mdx')
		const validationErrors: string[] = []
		portfolioData = []

		for (const filePath of portfolioFiles) {
			try {
				const content = readFileSync(filePath, 'utf-8')
				const { data: frontmatter } = matter(content)

				// Extract the slug from filename (e.g., portfolio.project-name.mdx -> project-name)
				const filename = path.basename(filePath, '.mdx')
				const slug = filename
					.replace(/\._[^.]+\./, '.') // remove layout segments
					.replace('portfolio.', '') // remove portfolio prefix

				// Validate frontmatter with Zod
				const frontmatterResult = FrontmatterSchema.safeParse(frontmatter)
				if (!frontmatterResult.success) {
					const errorMessages = frontmatterResult.error.errors
						.map((err) => `${err.path.join('.')}: ${err.message}`)
						.join(', ')
					validationErrors.push(`${filePath}: ${errorMessages}`)
					continue // Skip this file if validation fails
				}

				// Create the complete portfolio metadata
				const portfolioMetadata = {
					slug,
					...frontmatterResult.data,
					filePath: filePath.replace('app/', '/'),
				}

				// Validate the complete metadata
				const metadataResult =
					PortfolioMetadataSchema.safeParse(portfolioMetadata)
				if (!metadataResult.success) {
					const errorMessages = metadataResult.error.errors
						.map((err) => `${err.path.join('.')}: ${err.message}`)
						.join(', ')
					validationErrors.push(`${filePath}: ${errorMessages}`)
					continue // Skip this file if validation fails
				}

				portfolioData.push(metadataResult.data)
			} catch (error) {
				validationErrors.push(
					`${filePath}: Failed to read or parse file - ${error}`,
				)
			}
		}

		// Report validation errors
		if (validationErrors.length > 0) {
			console.error('\n❌ Portfolio frontmatter validation errors:')
			validationErrors.forEach((error) => console.error(`  ${error}`))
			console.error(
				`\n${validationErrors.length} file(s) had validation errors and were skipped.\n`,
			)
		}

		// Sort by date (most recent first) - safely handle dates
		portfolioData.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0
			const dateB = b.date ? new Date(b.date).getTime() : 0
			return dateB - dateA
		})

		if (validationErrors.length > 0) {
			console.log(
				`✅ Generated portfolio metadata for ${portfolioData.length} valid projects (${validationErrors.length} files skipped due to validation errors)`,
			)
		} else {
			console.log(
				`✅ Generated portfolio metadata for ${portfolioData.length} projects (all passed validation)`,
			)
		}
	}

	const generateVirtualModuleContent = () => {
		return `// This file is auto-generated from portfolio.*.mdx files in app/routes/
// Virtual module: ${virtualModuleId}

export const portfolio = ${JSON.stringify(portfolioData, null, 2)}

export const portfolioBySlug = portfolio.reduce((acc, project) => {
	acc[project.slug] = project
	return acc
}, {})
`
	}

	return {
		name: 'portfolio-metadata',
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId
			}
		},
		load(id: string) {
			if (id === resolvedVirtualModuleId) {
				return generateVirtualModuleContent()
			}
		},
		buildStart() {
			generatePortfolioMetadata()
		},
		handleHotUpdate({ file, server }: { file: string; server: any }) {
			// Check if the changed file is a portfolio MDX file
			if (file.includes('portfolio.') && file.endsWith('.mdx')) {
				console.log(`Portfolio file changed: ${file}`)
				generatePortfolioMetadata()

				// Invalidate the virtual module so it gets reloaded
				const virtualModule = server.moduleGraph.getModuleById(
					resolvedVirtualModuleId,
				)
				if (virtualModule) {
					server.reloadModule(virtualModule)
				}
			}
		},
	}
}
