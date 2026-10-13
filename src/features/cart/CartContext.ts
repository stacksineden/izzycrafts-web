import { createContext } from 'react'
import type { CartLine, CartLineKey } from '../../types/cart'
import type { ResolvedLine } from './resolve'

export interface CartContextValue {
  /** False until the saved cart has been read on the client. */
  ready: boolean
  lines: ResolvedLine[]
  itemCount: number
  /** null means at least one line is price on request. */
  subtotalNGN: number | null
  add: (line: CartLine, options?: { openDrawer?: boolean }) => void
  remove: (key: CartLineKey) => void
  setQty: (key: CartLineKey, qty: number) => void
  setNote: (key: CartLineKey, note: string) => void
  clear: () => void
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
