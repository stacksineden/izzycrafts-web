import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { emptyCart, loadCart, saveCart } from '../../lib/storage'
import type { CartAction, CartState } from '../../types/cart'
import { CartContext, type CartContextValue } from './CartContext'
import { cartReducer, initialCartState } from './cartReducer'
import { resolveLines, subtotalNGN } from './resolve'

interface ProviderState {
  cart: CartState
  /** False until the saved cart has been read on the client. */
  ready: boolean
}

function providerReducer(state: ProviderState, action: CartAction): ProviderState {
  if (action.type === 'hydrate') return { cart: action.state, ready: true }
  return { ...state, cart: cartReducer(state.cart, action) }
}

/**
 * Cart state lives in React context + useReducer and is persisted to localStorage.
 * It starts empty on the prerendered HTML and hydrates from storage after mount,
 * so server and client markup always match.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [{ cart: state, ready }, dispatch] = useReducer(providerReducer, {
    cart: initialCartState,
    ready: false,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const skipNextSave = useRef(true)

  useEffect(() => {
    const saved = loadCart() ?? emptyCart()
    // Drop lines whose product or size no longer exists in the catalog.
    dispatch({
      type: 'hydrate',
      state: { ...saved, lines: resolveLines(saved.lines).map((l) => l.line) },
    })

    // Keep tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (!e.key?.startsWith('izzycrafts.cart')) return
      const next = loadCart()
      skipNextSave.current = true
      dispatch({ type: 'hydrate', state: next ?? { lines: [], updatedAt: Date.now() } })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }
    saveCart(state)
  }, [state])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(state.lines)
    return {
      ready,
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.line.qty, 0),
      subtotalNGN: subtotalNGN(lines),
      add: (line, options) => {
        dispatch({ type: 'add', line })
        if (options?.openDrawer ?? true) setDrawerOpen(true)
      },
      remove: (key) => dispatch({ type: 'remove', key }),
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      setNote: (key, note) => dispatch({ type: 'setNote', key, note }),
      clear: () => dispatch({ type: 'clear' }),
      drawerOpen,
      openDrawer,
      closeDrawer,
    }
  }, [state, ready, drawerOpen, openDrawer, closeDrawer])

  return <CartContext value={value}>{children}</CartContext>
}
