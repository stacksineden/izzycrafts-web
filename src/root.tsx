import frauncesFont from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url'
import interFont from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import { CartDrawer } from './components/cart/CartDrawer'
import { ComingSoon } from './components/ComingSoon'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { Button } from './components/ui/Button'
import { Container } from './components/ui/Container'
import { IS_LIVE } from './config/site'
import { CartProvider } from './features/cart'
import './styles/index.css'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' },
  { rel: 'preload', href: frauncesFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: interFont, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3B2417" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-espresso px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </CartProvider>
  )
}

export default function App() {
  if (!IS_LIVE) return <ComingSoon />
  return (
    <StoreShell>
      <Outlet />
    </StoreShell>
  )
}

/**
 * Rendered into __spa-fallback.html (unknown URLs, and every URL except "/" in coming-soon mode)
 * and shown until the matching route has loaded on the client.
 */
export function HydrateFallback() {
  if (!IS_LIVE) return <ComingSoon />
  return <div className="min-h-dvh bg-ivory" aria-busy="true" />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404
  if (import.meta.env.DEV) console.error(error)
  const content = (
    <Container className="py-28 text-center">
      <p className="eyebrow text-cognac-deep">{notFound ? 'Not found' : 'Something went wrong'}</p>
      <h1 className="mt-4 font-display text-4xl font-light text-espresso sm:text-5xl">
        {notFound ? 'We could not find that page.' : 'This page did not load properly.'}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-charcoal/80">
        Please try again, or head back to the collection. If it keeps happening, message us on
        WhatsApp.
      </p>
      <Button to="/shop" className="mt-8">
        Back to the collection
      </Button>
    </Container>
  )
  return IS_LIVE ? <StoreShell>{content}</StoreShell> : <ComingSoon />
}
