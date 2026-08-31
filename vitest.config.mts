import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/app/**/page.tsx', 'src/app/layout.tsx', 'src/app/globals.css'],
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
})
