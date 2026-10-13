import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/** False in prerendered HTML and during hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
