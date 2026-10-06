import { site } from '../config/site'
import type { CartState } from '../types/cart'
import type { CustomerDetails, OrderRef } from '../types/order'

/**
 * wa.me deep link with prefilled text. Opens a chat with the brand's number from config.
 * If VITE_WHATSAPP_NUMBER is unset, falls back to wa.me/?text=, which lets the
 * customer pick the recipient rather than producing a dead link.
 */
export function buildWhatsAppLink(text: string): string {
  const recipient = site.whatsappNumber ?? ''
  return `https://wa.me/${recipient}?text=${encodeURIComponent(text)}`
}

/**
 * TODO: build the checkout message from the cart.
 *
 * Intended format (one numbered line per cart line):
 *
 * ```
 * Hello Izzy Crafts, I'd like to place an order.
 * Order ref: IC-XXXXXX
 * 1. <name> — <colour>, size <size> × <qty> — <price or "price on request">
 * Subtotal: <NGN or "to be confirmed">
 * Name: <name>
 * Delivery city: <city>
 * Notes: <notes>
 * ```
 *
 * - Colour and size use display names (look them up via lib/catalog), not ids.
 * - Prices use formatNGN. Subtotal is "to be confirmed" if any line is price on request.
 * - A line's customNotes goes on an indented line beneath it.
 * - Omit the Notes line when there are no notes.
 */
export function buildOrderMessage(_cart: CartState, _customer: CustomerDetails): string {
  throw new Error('buildOrderMessage is not implemented yet')
}

/**
 * TODO: short client-side order reference, "IC-" + 6 characters.
 * Use an unambiguous alphabet (no 0/O, 1/I/L) and crypto.getRandomValues.
 * It is for conversation reference only, not a unique key.
 */
export function generateOrderRef(): OrderRef {
  throw new Error('generateOrderRef is not implemented yet')
}
