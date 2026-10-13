import { emptyCart } from '../../lib/storage'
import type { CartAction, CartLine, CartLineKey, CartState } from '../../types/cart'

export const MAX_QTY = 10
export const MAX_NOTE_LENGTH = 300

/** Same product and size merge into one line. */
export function lineKey(line: Pick<CartLine, 'productId' | 'size'>): CartLineKey {
  return `${line.productId}::${line.size}`
}

const clampQty = (qty: number) => Math.min(Math.max(Math.round(qty), 1), MAX_QTY)
const cleanNote = (note: string | undefined) => note?.trim().slice(0, MAX_NOTE_LENGTH) || undefined

export const initialCartState: CartState = emptyCart()

export function cartReducer(state: CartState, action: CartAction): CartState {
  const now = Date.now()
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.line)
      const existing = state.lines.find((l) => lineKey(l) === key)
      const note = cleanNote(action.line.note)
      const lines = existing
        ? state.lines.map((l) =>
            l === existing
              ? { ...l, qty: clampQty(l.qty + action.line.qty), note: note ?? l.note }
              : l,
          )
        : [...state.lines, { ...action.line, qty: clampQty(action.line.qty), note }]
      return { lines, updatedAt: now }
    }
    case 'remove':
      return { lines: state.lines.filter((l) => lineKey(l) !== action.key), updatedAt: now }
    case 'setQty':
      if (action.qty <= 0) return cartReducer(state, { type: 'remove', key: action.key })
      return {
        lines: state.lines.map((l) =>
          lineKey(l) === action.key ? { ...l, qty: clampQty(action.qty) } : l,
        ),
        updatedAt: now,
      }
    case 'setNote':
      return {
        lines: state.lines.map((l) =>
          lineKey(l) === action.key ? { ...l, note: cleanNote(action.note) } : l,
        ),
        updatedAt: now,
      }
    case 'clear':
      return { lines: [], updatedAt: now }
    case 'hydrate':
      return action.state
  }
}
