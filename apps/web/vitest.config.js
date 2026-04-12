/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  },
  // Mock CSS and other assets
  assetsInclude: [],
  css: {
    modules: {
      classNameStrategy: 'non-scoped'
    }
  }
})