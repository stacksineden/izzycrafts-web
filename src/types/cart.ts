import type { SizeId } from './product'

/**
 * What the cart stores. Names and prices are always looked up from the catalog,
 * so a stale or edited localStorage entry can never change what a customer is quoted.
 */
export interface CartLine {
  productId: string
  size: SizeId
  qty: number
  /** Fit notes: half sizes, width, one foot larger, and so on. */
  note?: string
}

/** Same product and size merge into one line. */
export type CartLineKey = string

export interface CartState {
  lines: CartLine[]
  updatedAt: number
}

export type CartAction =
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; key: CartLineKey }
  | { type: 'setQty'; key: CartLineKey; qty: number }
  | { type: 'setNote'; key: CartLineKey; note: string }
  | { type: 'clear' }
  | { type: 'hydrate'; state: CartState }
