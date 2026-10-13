import type { CartLine, CartState } from '../types/cart'

/** Bump the version when CartState changes shape; old carts are then discarded. */
const CART_KEY = 'izzycrafts.cart.v3'
const LAST_ORDER_KEY = 'izzycrafts.last-order.v1'

export const emptyCart = (): CartState => ({ lines: [], updatedAt: 0 })

function isCartLine(value: unknown): value is CartLine {
  const l = value as CartLine
  return (
    typeof l === 'object' &&
    l !== null &&
    typeof l.productId === 'string' &&
    typeof l.size === 'string' &&
    Number.isInteger(l.qty) &&
    l.qty > 0 &&
    (l.note === undefined || typeof l.note === 'string')
  )
}

/** Storage can throw (private mode, blocked site data), so every access is guarded. */
function read(key: string, store: () => Storage): unknown {
  try {
    const raw = store().getItem(key)
    return raw ? (JSON.parse(raw) as unknown) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown, store: () => Storage): void {
  try {
    store().setItem(key, JSON.stringify(value))
  } catch {
    // The cart still works for this visit; it just won't persist.
  }
}

export function loadCart(): CartState | null {
  const parsed = read(CART_KEY, () => window.localStorage) as CartState | null
  if (!parsed || !Array.isArray(parsed.lines)) return null
  return { lines: parsed.lines.filter(isCartLine), updatedAt: Number(parsed.updatedAt) || 0 }
}

export function saveCart(state: CartState): void {
  write(CART_KEY, state, () => window.localStorage)
}

export interface LastOrder {
  ref: string
  link: string
  sentAt: number
}

/** Kept for the session so the confirmation screen can re-open WhatsApp. */
export function saveLastOrder(order: LastOrder): void {
  write(LAST_ORDER_KEY, order, () => window.sessionStorage)
}

export function loadLastOrder(): LastOrder | null {
  const o = read(LAST_ORDER_KEY, () => window.sessionStorage) as LastOrder | null
  return o &&
    typeof o.ref === 'string' &&
    typeof o.link === 'string' &&
    o.link.startsWith('https://wa.me/')
    ? o
    : null
}
