import { test, expect } from '@playwright/test'

test.describe('Index Page', () => {
	test('should load the homepage successfully', async ({ page }) => {
		// Navigate to the index page
		await page.goto('/')

		// Check that the page title is correct
		await expect(page).toHaveTitle('Field Journal')

		// Check that the main heading/title is visible
		await expect(page.getByText('Field Journal')).toBeVisible()

		// Check that the description meta content is rendered (visible in header)
		await expect(
			page.getByText('The observations and experiments of Jon Winsley'),
		).toBeVisible()

		// Check that we have blog posts rendered (main content area)
		await expect(page.locator('main')).toBeVisible()

		// Check for footer
		await expect(page.locator('footer')).toBeVisible()
	})
})

test.describe('Categories', () => {
	test('should navigate from categories index to specific category page', async ({
		page,
	}) => {
		// Navigate to categories index page
		await page.goto('/categories')

		// Check that the categories page loads correctly
		await expect(page).toHaveTitle(/Categories.*Field Journal/)
		await expect(
			page.getByRole('heading', { name: 'Categories' }),
		).toBeVisible()
		await expect(
			page.getByText('Browse notes organized by subject matter'),
		).toBeVisible()

		// Check that we have categories listed
		const categoryCount = await page.locator('main article').count()
		expect(categoryCount).toBeGreaterThan(0)

		// Look for the "screeps" category link and click it
		const screepsLink = page.getByRole('link', { name: /screeps/i }).first()
		await expect(screepsLink).toBeVisible()
		await screepsLink.click()

		// Verify we're on the screeps category page
		await expect(page).toHaveURL(/\/categories\/screeps/)
		await expect(
			page.getByRole('heading', { name: 'screeps', level: 1 }),
		).toBeVisible()

		// Check that there are posts in this category
		const postsCount = await page.locator('main').getByRole('article').count()
		expect(postsCount).toBeGreaterThan(0)

		// Check for the back link to categories
		await expect(page.getByRole('link', { name: '← Categories' })).toBeVisible()
	})
})

test.describe('Search', () => {
	test('should search for "labs" and return results', async ({ page }) => {
		// Navigate to the index page
		await page.goto('/')

		// Find the search input and enter "labs"
		const searchInput = page.getByPlaceholder('Search...')
		await expect(searchInput).toBeVisible()
		await searchInput.fill('labs')
		await searchInput.press('Enter')

		// Verify we're on the search results page
		await expect(page).toHaveURL(/\/search\?q=labs/)
		await expect(
			page.getByRole('heading', { name: 'Search Results' }),
		).toBeVisible()

		// Check that we have search results
		const resultsText = page.getByText(/Found \d+ result/)
		await expect(resultsText).toBeVisible()

		// Verify there are actual blog post results displayed
		const searchResultsCount = await page
			.locator('main')
			.getByRole('article')
			.count()
		expect(searchResultsCount).toBeGreaterThan(0)
	})
})

test.describe('Portfolio', () => {
	test('should load portfolio page with projects', async ({ page }) => {
		// Navigate to portfolio page
		await page.goto('/portfolio')

		// Check that the portfolio page loads correctly
		await expect(page).toHaveTitle(/Portfolio.*Field Journal/)
		await expect(page.getByRole('heading', { name: 'Portfolio' })).toBeVisible()
		await expect(
			page.getByText(
				'A showcase of projects, experiments, and professional work.',
			),
		).toBeVisible()

		// Check that we have portfolio projects displayed
		// The portfolio might be empty, so we check for either projects or the "no projects" message
		const hasProjects =
			(await page.locator('main').getByRole('article').count()) > 0
		const noProjectsMessage = page.getByText(
			'No portfolio projects found. Check back soon!',
		)

		if (hasProjects) {
			// If there are projects, verify they're displayed
			const projectsCount = await page
				.locator('main')
				.getByRole('article')
				.count()
			expect(projectsCount).toBeGreaterThan(0)
		} else {
			// If no projects, verify the empty state message is shown
			await expect(noProjectsMessage).toBeVisible()
		}
	})
})

test.describe('RSS Feed', () => {
	test('should serve RSS feed with valid XML and content', async ({
		page,
		request,
	}) => {
		// Use request context instead of page.goto to avoid download issues
		const response = await request.get('/rss.xml')

		// Check that the response is successful
		expect(response.status()).toBe(200)

		// Check that the content type is correct
		const contentType = response.headers()['content-type']
		expect(contentType).toContain('application/rss+xml')

		// Get the RSS content
		const rssContent = await response.text()
		expect(rssContent).toBeDefined()

		// Verify basic RSS structure
		expect(rssContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
		expect(rssContent).toContain('<rss version="2.0"')
		expect(rssContent).toContain('<channel>')
		expect(rssContent).toContain('<title>Field Journal</title>')
		expect(rssContent).toContain('<description>')

		// Check that there are RSS items (blog posts)
		expect(rssContent).toContain('<item>')
		expect(rssContent).toContain('</item>')
		expect(rssContent).toContain('<link>')
		expect(rssContent).toContain('<guid')
	})
})
