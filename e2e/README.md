# End-to-End Tests

This directory contains end-to-end tests using
[Playwright](https://playwright.dev/).

## Running Tests

### Development Mode (with UI)

```bash
npm run test:e2e
```

This will start the production server and open the Playwright UI where you can
run individual tests and see them execute in real-time.

### CI Mode (headless)

```bash
npm run test:e2e:ci
```

This runs all tests in headless mode against the production build, similar to
how they run in CI.

## Writing Tests

Tests should:

- Use semantic locators (`getByRole`, `getByText`, `getByLabel`) instead of test
  IDs when possible
- Test user behavior, not implementation details
- Be resilient to UI changes that don't affect functionality

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
	test('should do something specific', async ({ page }) => {
		await page.goto('/route')

		// Interact with the page
		await page.getByRole('button', { name: 'Submit' }).click()

		// Assert the expected outcome
		await expect(page.getByText('Success message')).toBeVisible()
	})
})
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root.
It's set up to:

- Run tests against the production build (port 5173)
- Test in Chromium, Firefox, and WebKit
- Generate traces and screenshots on failure
- Upload test reports in CI

## CI Integration

E2E tests run automatically in GitHub Actions on every push and pull request.
Test reports are uploaded as artifacts and retained for 30 days.

**Note**: Tests run against the production build to ensure they match what users
will experience in the deployed application.
