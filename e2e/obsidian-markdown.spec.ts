import { expect, test } from '@playwright/test'

test.describe('Obsidian Markdown', () => {
	test('renders Obsidian-style syntax in MDX notes', async ({ page }) => {
		await page.goto('/notes/obsidian-markdown-fixture')

		await expect(
			page.getByRole('link', { name: 'the Obsidian setup note' }),
		).toHaveAttribute('href', '/notes/obsidian-setup')

		await expect(
			page.getByRole('link', { name: 'Daily Notes', exact: true }),
		).toHaveAttribute('href', '/notes/obsidian-setup#daily-notes')

		await expect(page.getByText('Missing Knowledge Base Note')).toHaveClass(
			/obsidian-unresolved-link/,
		)

		const callout = page
			.locator('blockquote.obsidian-callout-tip')
			.filter({ hasText: 'Obsidian Callout' })
		await expect(callout).toBeVisible()
		await expect(callout).toContainText('Obsidian Callout')
		await expect(callout).toContainText(
			'Callouts render as styled blockquotes.',
		)

		await expect(
			page.getByRole('img', { name: 'Obsidian screenshot' }),
		).toHaveAttribute('src', '/assets/images/obsidian-with-cursor.png')

		await expect(
			page.getByRole('link', { name: /My Obsidian Setup/ }).last(),
		).toHaveAttribute('href', '/notes/obsidian-setup')

		await expect(page.getByText('^fixture-block')).toHaveCount(0)
	})
})
