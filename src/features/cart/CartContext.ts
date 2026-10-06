import { createContext } from 'react'
import type { CartLine, CartLineKey, CartState } from '../../types/cart'

export interface CartContextValue {
  state: CartState
  lines: CartLine[]
  itemCount: number
  /** null means at least one line is price on request. */
  subtotalNGN: number | null
  add: (line: CartLine) => void
  remove: (key: CartLineKey) => void
  setQty: (key: CartLineKey, qty: number) => void
  setNotes: (key: CartLineKey, customNotes: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
