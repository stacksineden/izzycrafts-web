import type { CartState } from '../types/cart'

/** Bump the version when CartState changes shape; old carts are then discarded. */
const CART_KEY = 'izzycrafts.cart.v1'

export const emptyCart = (): CartState => ({ lines: [], updatedAt: 0 })

function isCartState(value: unknown): value is CartState {
  return (
    typeof value === 'object' &&
    value !== null &&
    Array.isArray((value as CartState).lines) &&
    typeof (value as CartState).updatedAt === 'number'
  )
}

/** Storage can throw (private mode, blocked site data), so every access is guarded. */
export function loadCart(): CartState | null {
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isCartState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveCart(state: CartState): void {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(state))
  } catch {
    // Cart still works for this visit; it just won't persist.
  }
}

export function clearStoredCart(): void {
  try {
    window.localStorage.removeItem(CART_KEY)
  } catch {
    // ignore
  }
}
