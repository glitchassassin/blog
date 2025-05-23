import { test, expect } from '@playwright/test'

test.describe('Index Page', () => {
	test('should load the homepage successfully', async ({ page }) => {
		// Navigate to the index page
		await page.goto('/')

		// Check that the page title is correct
		await expect(page).toHaveTitle('Field Notes')

		// Check that the main heading/title is visible
		await expect(page.getByText('Field Notes')).toBeVisible()

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
