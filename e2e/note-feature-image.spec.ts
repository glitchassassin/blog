import { test, expect } from '@playwright/test'

const noteUrl = '/notes/handy-dandy-evals'
const imageAlt =
	'A hand grading a paper marked B, framed by poppies and wildflowers.'

test.describe('Note feature image', () => {
	test('uses the light image in light mode and for social metadata', async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme: 'light' })
		await page.goto(noteUrl)

		const featureImage = page.getByRole('img', { name: imageAlt })
		await expect(featureImage).toBeVisible()
		expect(
			await featureImage.evaluate(
				(image) => (image as HTMLImageElement).currentSrc,
			),
		).toContain('/assets/images/handy-dandy-evals.png')

		await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
			'content',
			/\/assets\/images\/handy-dandy-evals\.png$/,
		)
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
			'content',
			/\/assets\/images\/handy-dandy-evals\.png$/,
		)
	})

	test('uses the dark image in dark mode', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' })
		await page.goto(noteUrl)

		const featureImage = page.getByRole('img', { name: imageAlt })
		await expect(featureImage).toBeVisible()
		expect(
			await featureImage.evaluate(
				(image) => (image as HTMLImageElement).currentSrc,
			),
		).toContain('/assets/images/handy-dandy-evals-dark.png')
	})
})
