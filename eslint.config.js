import { config as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
	...defaultConfig,
	{
		ignores: ['.react-router/**'],
	},
	{
		files: ['*.d.ts'],
		rules: {
			'@typescript-eslint/consistent-type-imports': 'off',
		},
	},
]
