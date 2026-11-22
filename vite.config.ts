import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      // Chrome 100 / Safari 15.4 / Firefox 100: nesting is flattened, colour-mix kept.
      targets: { chrome: 100 << 16, safari: (15 << 16) | (4 << 8), firefox: 100 << 16 },
    },
  },
  build: { cssMinify: 'lightningcss' },
  server: { port: 5175, strictPort: true },
})
