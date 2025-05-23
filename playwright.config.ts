import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e',
	timeout: 30000,
	expect: { timeout: 5000 },
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	webServer: {
		command: 'PORT=5173 npm run start',
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
})
