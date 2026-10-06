import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export default function StoreLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-ivory text-charcoal">
      <Header />
      <main id="main" className="flex-1 py-12">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
