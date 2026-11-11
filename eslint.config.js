import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      betterTailwindcss.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/index.css',
      },
    },
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
  },
])
