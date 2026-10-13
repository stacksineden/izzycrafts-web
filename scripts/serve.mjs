/**
 * Serves build/client the way Vercel and Netlify do: /shop/slides → shop/slides/index.html,
 * unknown paths → __spa-fallback.html (404). `vite preview` falls back to the home page instead,
 * which makes prerendered pages fail to hydrate locally.
 *
 *   npm run preview [-- --port 4173]
 */
import { createReadStream, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const ROOT = join(process.cwd(), 'build/client')
const portArg = process.argv.indexOf('--port')
const PORT = Number(portArg > -1 ? process.argv[portArg + 1] : 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.data': 'text/x-script',
}

const isFile = (p) => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, '')
  const candidates = [join(ROOT, safe), join(ROOT, safe, 'index.html')]
  const file = candidates.find(isFile)
  const target = file ?? join(ROOT, '__spa-fallback.html')
  res.writeHead(file ? 200 : 404, {
    'Content-Type': TYPES[extname(target)] ?? 'application/octet-stream',
  })
  createReadStream(target).pipe(res)
}).listen(PORT, () => console.log(`Serving build/client at http://localhost:${PORT}`))
