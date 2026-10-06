const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' })

/** formatNGN(45000) → "₦45,000.00" */
export function formatNGN(amount: number): string {
  return ngn.format(amount)
}

export const PRICE_ON_REQUEST = 'Price on request'

/** Handles the price-on-request case (null) used across products, cart lines and subtotals. */
export function formatPriceNGN(amount: number | null): string {
  return amount === null ? PRICE_ON_REQUEST : formatNGN(amount)
}
