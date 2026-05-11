import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: [
			'.react-router/**',
			'.wrangler/**',
			'build/**',
			'playwright-report/**',
			'test-results/**',
			'worker-configuration.d.ts',
			'node_modules/**',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'prefer-const': 'off',
		},
	},
	{
		files: ['**/*.d.ts'],
		rules: {
			'@typescript-eslint/consistent-type-imports': 'off',
		},
	},
)
