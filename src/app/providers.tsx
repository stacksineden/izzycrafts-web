import type { ReactNode } from 'react'
import { CartProvider } from '../features/cart'

export function AppProviders({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
