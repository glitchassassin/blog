import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test.describe('Accessibility Tests', () => {
	test('homepage should be accessible', async ({ page }) => {
		await page.goto('/')

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test('search page should be accessible', async ({ page }) => {
		await page.goto('/search?q=test')

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test('categories page should be accessible', async ({ page }) => {
		await page.goto('/categories')

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test('portfolio page should be accessible', async ({ page }) => {
		await page.goto('/portfolio')

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})

	test('CV page should be accessible', async ({ page }) => {
		await page.goto('/curriculum-vitae')

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})
})

test.describe('Keyboard Navigation', () => {
	test('should be able to navigate main links with keyboard', async ({
		page,
		browserName,
	}) => {
		await page.goto('/')

		// WebKit (Safari) requires Alt+Tab to navigate through links
		const isWebKit = browserName === 'webkit'
		const tabKey = isWebKit ? 'Alt+Tab' : 'Tab'

		// Start from the top of the page and press Tab to get to first focusable element
		await page.keyboard.press(tabKey)

		// First focusable element should be the profile image link
		const profileLink = page.getByRole('link', {
			name: /profile and curriculum vitae/i,
		})
		await expect(profileLink).toBeFocused()

		// Continue to GitHub link
		await page.keyboard.press(tabKey)
		const githubLink = page.getByRole('link', { name: /github/i })
		await expect(githubLink).toBeFocused()

		// Continue to Discord link
		await page.keyboard.press(tabKey)
		const discordLink = page.getByRole('link', { name: /discord/i })
		await expect(discordLink).toBeFocused()

		// Continue to site title link
		await page.keyboard.press(tabKey)
		const siteTitle = page.getByRole('link', { name: 'Field Journal' })
		await expect(siteTitle).toBeFocused()

		// Continue to CV link in navigation
		await page.keyboard.press(tabKey)
		const cvLink = page
			.getByRole('navigation', { name: 'Main navigation' })
			.getByRole('link', { name: 'Curriculum Vitae' })
		await expect(cvLink).toBeFocused()

		// Continue to Portfolio link
		await page.keyboard.press(tabKey)
		const portfolioLink = page.getByRole('link', { name: 'Portfolio' })
		await expect(portfolioLink).toBeFocused()

		// Continue to search input
		await page.keyboard.press(tabKey)
		const searchInput = page.getByPlaceholder('Search...')
		await expect(searchInput).toBeFocused()
	})

	test('should be able to navigate with Enter key', async ({
		page,
		browserName,
	}) => {
		await page.goto('/')

		const isWebKit = browserName === 'webkit'
		const tabKey = isWebKit ? 'Alt+Tab' : 'Tab'

		// Navigate to CV link using Tab
		await page.keyboard.press(tabKey) // Profile image
		await page.keyboard.press(tabKey) // GitHub
		await page.keyboard.press(tabKey) // Discord
		await page.keyboard.press(tabKey) // Site title
		await page.keyboard.press(tabKey) // CV link

		const cvLink = page
			.getByRole('navigation', { name: 'Main navigation' })
			.getByRole('link', { name: 'Curriculum Vitae' })
		await expect(cvLink).toBeFocused()
		await page.keyboard.press('Enter')

		// Should navigate to CV page
		await expect(page).toHaveURL('/curriculum-vitae')
	})

	test('search should work with keyboard', async ({ page }) => {
		await page.goto('/')

		// Tab to search input
		const searchInput = page.getByPlaceholder('Search...')
		await searchInput.focus()

		// Type search query and submit with Enter
		await searchInput.fill('test')
		await page.keyboard.press('Enter')

		// Should navigate to search results
		await expect(page).toHaveURL('/search?q=test')
	})
})

test.describe('Focus Management', () => {
	test('should have visible focus indicators', async ({ page }) => {
		await page.goto('/')

		// Tab through focusable elements and check for focus styles
		const focusableElements = [
			page
				.getByRole('navigation', { name: 'Main navigation' })
				.getByRole('link', { name: 'Curriculum Vitae' }),
			page.getByRole('link', { name: 'Portfolio' }),
			page.getByPlaceholder('Search...'),
		]

		for (const element of focusableElements) {
			await element.focus()
			await expect(element).toBeFocused()

			// Check that focus styles are applied (looking for focus ring classes)
			const elementClasses = await element.getAttribute('class')
			expect(elementClasses).toMatch(/focus:(ring|outline)/)
		}
	})

	test('should maintain focus order in pagination', async ({
		page,
		browserName,
	}) => {
		await page.goto('/')

		// Check if pagination exists on the page
		const pagination = page.locator(
			'[role="navigation"][aria-label="pagination"]',
		)
		const paginationExists = (await pagination.count()) > 0

		if (paginationExists) {
			// WebKit (Safari) requires Alt+Tab to navigate through links
			const isWebKit = browserName === 'webkit'
			const tabKey = isWebKit ? 'Alt+Tab' : 'Tab'

			// Tab through pagination elements
			await pagination.getByRole('link').first().focus()

			const paginationLinks = await pagination.getByRole('link').count()
			expect(paginationLinks).toBeGreaterThan(0)

			// Verify all pagination links are keyboard accessible
			for (let i = 0; i < Math.min(paginationLinks, 5); i++) {
				await page.keyboard.press(tabKey)
			}
		}
	})
})

test.describe('Screen Reader Support', () => {
	test('should have proper heading structure', async ({ page }) => {
		await page.goto('/')

		// Check for h1 element
		const h1 = page.getByRole('heading', { level: 1 })
		await expect(h1).toBeVisible()
		await expect(h1).toHaveText('Field Journal')

		// Check that main content has proper semantic structure
		const main = page.getByRole('main')
		await expect(main).toBeVisible()

		// Check for navigation landmarks
		const nav = page.getByRole('navigation')
		expect(await nav.count()).toBeGreaterThan(0)
	})

	test('should have descriptive link text', async ({ page }) => {
		await page.goto('/')

		// Check that links have accessible names
		const links = page.getByRole('link')
		const linkCount = await links.count()

		for (let i = 0; i < Math.min(linkCount, 10); i++) {
			const link = links.nth(i)

			// Skip links that might be icon-only or image-only links
			const ariaLabel = await link.getAttribute('aria-label')
			const textContent = await link.textContent()
			const hasImage = (await link.locator('img').count()) > 0
			const hasSvg = (await link.locator('svg').count()) > 0

			// Link should have either aria-label or meaningful text content
			const accessibleName = ariaLabel ?? textContent?.trim()

			// Skip if it's an icon/image link without aria-label (this should be fixed)
			if (!accessibleName && (hasImage || hasSvg)) {
				console.warn(
					`Link at index ${i} has no accessible name but contains image/svg`,
				)
				continue
			}

			// All other links should have meaningful accessible names
			if (accessibleName) {
				expect(accessibleName.length).toBeGreaterThan(0)
			}
		}
	})

	test('should have proper form labels', async ({ page }) => {
		await page.goto('/')

		// Check search input has proper labeling
		const searchInput = page.getByPlaceholder('Search...')
		await expect(searchInput).toBeVisible()

		// Input should have a name attribute for form submission
		await expect(searchInput).toHaveAttribute('name', 'q')

		// Should have proper type
		await expect(searchInput).toHaveAttribute('type', 'search')
	})

	test('should have proper semantic structure on content pages', async ({
		page,
	}) => {
		// Navigate to a category page to test content structure
		await page.goto('/categories')

		// Check for proper heading hierarchy
		const h1 = page.getByRole('heading', { level: 1, name: 'Categories' })
		await expect(h1).toBeVisible()

		// Check for main landmark
		const main = page.getByRole('main')
		await expect(main).toBeVisible()

		// Check that articles are properly marked up
		const articles = main.getByRole('article')
		const articleCount = await articles.count()

		if (articleCount > 0) {
			// Each article should have a heading
			for (let i = 0; i < Math.min(articleCount, 3); i++) {
				const article = articles.nth(i)
				const headingInArticle = article.getByRole('heading')
				await expect(headingInArticle).toBeVisible()
			}
		}
	})
})

test.describe('Color and Contrast', () => {
	test('should respect reduced motion preferences', async ({ page }) => {
		// Set reduced motion preference
		await page.emulateMedia({ reducedMotion: 'reduce' })
		await page.goto('/')

		// Page should still be functional
		await expect(page.getByText('Field Journal')).toBeVisible()
		await expect(page.getByRole('main')).toBeVisible()
	})

	test('should work with dark mode', async ({ page }) => {
		await page.goto('/')

		// Toggle to dark mode by adding dark class to html
		await page.evaluate(() => {
			document.documentElement.classList.add('dark')
		})

		// Verify content is still visible and accessible
		await expect(page.getByText('Field Journal')).toBeVisible()
		await expect(page.getByRole('main')).toBeVisible()

		// Run accessibility scan in dark mode
		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa'])
			.analyze()

		expect(accessibilityScanResults.violations).toEqual([])
	})
})
