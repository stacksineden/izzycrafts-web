import { existsSync } from 'node:fs'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: {
    // Checked at build/dev-server start: drop public/brand/logo.svg in and restart to use it.
    __HAS_LOGO__: JSON.stringify(existsSync('public/brand/logo.svg')),
  },
})
