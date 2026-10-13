import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Config } from '@react-router/dev/config'
import { loadEnv } from 'vite'

const env = loadEnv(
  process.env.NODE_ENV === 'production' ? 'production' : 'development',
  process.cwd(),
  'VITE_',
)
const live = (process.env.VITE_SITE_MODE ?? env.VITE_SITE_MODE)?.trim() === 'live'
const siteUrl = (process.env.VITE_SITE_URL ?? env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(join('src/data', file), 'utf8')) as T
const products = readJson<{ slug: string; status: string }[]>('products.json').filter(
  (p) => p.status === 'active',
)
const categories = readJson<{ slug: string }[]>('categories.json')

/** Every page that is built to static HTML. Anything else falls back to the client-side 404. */
const storePaths = [
  '/',
  '/shop',
  ...categories.map((c) => `/shop/${c.slug}`),
  ...products.map((p) => `/product/${p.slug}`),
  '/custom',
  '/our-craft',
  '/care-guide',
  '/cart',
  '/checkout',
]
const privatePaths = new Set(['/cart', '/checkout'])

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: live ? storePaths : ['/'],

  async buildEnd({ viteConfig }) {
    const out = join(viteConfig.build.outDir, '..', 'client')
    const robots = live
      ? ['User-agent: *', 'Allow: /', 'Disallow: /cart', 'Disallow: /checkout']
      : ['User-agent: *', 'Allow: /']
    if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
    writeFileSync(join(out, 'robots.txt'), robots.join('\n') + '\n')

    if (!siteUrl) {
      console.warn('[seo] VITE_SITE_URL is not set: skipped sitemap.xml and absolute URLs.')
      return
    }
    const today = new Date().toISOString().slice(0, 10)
    const urls = (live ? storePaths : ['/'])
      .filter((p) => !privatePaths.has(p))
      .map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`)
    writeFileSync(
      join(out, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    )
  },
} satisfies Config
