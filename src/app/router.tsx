import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { SITE_MODE } from '../config/site'
import ComingSoon from '../pages/ComingSoon'

/** Lazy route: store code is split out, so Coming Soon visitors never download it. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
})

/** Every path renders Coming Soon. */
const comingSoonRoutes: RouteObject[] = [{ path: '*', element: <ComingSoon /> }]

const liveRoutes: RouteObject[] = [
  {
    lazy: page(() => import('../components/layout/StoreLayout')),
    // Shown for the moment the lazy layout chunk is loading on first visit.
    hydrateFallbackElement: <div className="min-h-dvh bg-ivory" />,
    children: [
      { index: true, lazy: page(() => import('../pages/Home')) },
      { path: 'shop', lazy: page(() => import('../pages/Shop')) },
      { path: 'shop/:category', lazy: page(() => import('../pages/Category')) },
      { path: 'product/:slug', lazy: page(() => import('../pages/ProductDetail')) },
      { path: 'custom', lazy: page(() => import('../pages/CustomOrder')) },
      { path: 'cart', lazy: page(() => import('../pages/Cart')) },
      { path: 'checkout', lazy: page(() => import('../pages/Checkout')) },
      { path: '*', lazy: page(() => import('../pages/NotFound')) },
    ],
  },
]

export const router = createBrowserRouter(SITE_MODE === 'live' ? liveRoutes : comingSoonRoutes)
