import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

/** Fills absolute URLs in index.html meta tags from VITE_SITE_URL (blank leaves them root-relative). */
function siteUrlInHtml(siteUrl: string): Plugin {
  return {
    name: 'izzy:site-url-in-html',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss(), siteUrlInHtml(siteUrl)],
    define: {
      // Checked at build/dev-server start: drop public/brand/logo.svg in and restart to use it.
      __HAS_LOGO__: JSON.stringify(existsSync(`${root}public/brand/logo.svg`)),
    },
  }
})
