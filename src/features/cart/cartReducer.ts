import { emptyCart } from '../../lib/storage'
import type { CartAction, CartLine, CartLineKey, CartState } from '../../types/cart'

/** Same product, colour and size merge into one line. */
export function lineKey(line: Pick<CartLine, 'productId' | 'colourId' | 'size'>): CartLineKey {
  return `${line.productId}::${line.colourId}::${line.size}`
}

export const initialCartState: CartState = emptyCart()

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add':
      // TODO: merge into an existing line with the same lineKey (sum qty), else append. Stamp updatedAt.
      return state
    case 'remove':
      // TODO: drop the line whose lineKey matches action.key. Stamp updatedAt.
      return state
    case 'setQty':
      // TODO: set qty on the matching line; qty <= 0 removes it. Clamp to a sensible max. Stamp updatedAt.
      return state
    case 'setNotes':
      // TODO: set customNotes on the matching line. Stamp updatedAt.
      return state
    case 'clear':
      return { lines: [], updatedAt: Date.now() }
    case 'hydrate':
      return action.state
  }
}

export function selectItemCount(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + line.qty, 0)
}

/** null when any line is price on request, so the subtotal reads "to be confirmed". */
export function selectSubtotalNGN(state: CartState): number | null {
  let total = 0
  for (const line of state.lines) {
    if (line.unitPriceNGN === null) return null
    total += line.unitPriceNGN * line.qty
  }
  return total
}
