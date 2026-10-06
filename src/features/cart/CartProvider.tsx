import { useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { loadCart, saveCart } from '../../lib/storage'
import { CartContext, type CartContextValue } from './CartContext'
import { cartReducer, initialCartState, selectItemCount, selectSubtotalNGN } from './cartReducer'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (init) => loadCart() ?? init)

  useEffect(() => {
    saveCart(state)
  }, [state])

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      lines: state.lines,
      itemCount: selectItemCount(state),
      subtotalNGN: selectSubtotalNGN(state),
      add: (line) => dispatch({ type: 'add', line }),
      remove: (key) => dispatch({ type: 'remove', key }),
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      setNotes: (key, customNotes) => dispatch({ type: 'setNotes', key, customNotes }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state],
  )

  return <CartContext value={value}>{children}</CartContext>
}
