import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('shop', 'routes/shop.tsx', { id: 'shop' }),
  route('shop/:category', 'routes/shop.tsx', { id: 'category' }),
  route('product/:slug', 'routes/product.tsx'),
  route('custom', 'routes/custom.tsx'),
  route('our-craft', 'routes/our-craft.tsx'),
  route('care-guide', 'routes/care-guide.tsx'),
  route('cart', 'routes/cart.tsx'),
  route('checkout', 'routes/checkout.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
