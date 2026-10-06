import type { SizeId } from './product'

export interface CartLine {
  productId: string
  slug: string
  name: string
  colourId: string
  size: SizeId
  qty: number
  /** null means price on request. */
  unitPriceNGN: number | null
  /** Custom pair selections or fit notes. */
  customNotes?: string
}

/** Stable identity for a line: same product, colour and size merge into one line. */
export type CartLineKey = string

export interface CartState {
  lines: CartLine[]
  updatedAt: number
}

export type CartAction =
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; key: CartLineKey }
  | { type: 'setQty'; key: CartLineKey; qty: number }
  | { type: 'setNotes'; key: CartLineKey; customNotes: string }
  | { type: 'clear' }
  | { type: 'hydrate'; state: CartState }
