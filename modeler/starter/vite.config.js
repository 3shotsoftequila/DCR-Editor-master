import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  assetsInclude: ['**/*.xml'],
  server: {
    hmr: false,
  },
})
