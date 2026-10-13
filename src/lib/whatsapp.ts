import { site } from '../config/site'
import type { ResolvedLine } from '../features/cart/resolve'
import type { CustomerDetails, CustomPairRequest, OrderRef } from '../types/order'
import type { Product } from '../types/product'
import { getCustomOptions, getProductById, getSizeLabel } from './catalog'
import { formatNGN } from './currency'
import { absoluteUrl } from './seo'

/** wa.me deep link with prefilled text. Opens a chat with the brand's number from config. */
export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
}

/** Strips characters WhatsApp would render as formatting, and caps length. */
function clean(value: string | undefined, max = 300): string {
  return (value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/[*_~`]/g, '')
    .trim()
    .slice(0, max)
}

/** Unambiguous characters only: no 0/O, 1/I/L. */
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

/** Short client-side reference for conversation, e.g. IC-7K3Q9P. Not a unique key. */
export function generateOrderRef(): OrderRef {
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  return 'IC-' + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join('')
}

/**
 * The checkout message. Format:
 *
 * ```
 * Hello Izzy Crafts, I'd like to place an order.
 * Order ref: IC-XXXXXX
 *
 * 1. <name> — size <size> × <qty> — <price or "price on request">
 *    Fit notes: <note>
 *
 * Subtotal: <NGN or "to be confirmed">
 *
 * Name: <name>
 * Phone: <phone>
 * Delivery: <city>, <address>
 * Notes: <notes>
 * ```
 */
export function buildOrderMessage(
  lines: ResolvedLine[],
  customer: CustomerDetails,
  ref: OrderRef,
): string {
  const items = lines.map((l, i) => {
    const price = l.lineTotalNGN === null ? 'price on request' : formatNGN(l.lineTotalNGN)
    const row = `${i + 1}. ${l.product.name} — size ${l.sizeLabel} × ${l.line.qty} — ${price}`
    const extra = [
      l.line.note ? `   Fit notes: ${clean(l.line.note)}` : '',
      site.url ? `   ${absoluteUrl(`/product/${l.product.slug}`)}` : '',
    ].filter(Boolean)
    return [row, ...extra].join('\n')
  })

  let subtotal = 0
  let priced = true
  for (const l of lines) {
    if (l.lineTotalNGN === null) priced = false
    else subtotal += l.lineTotalNGN
  }

  const delivery = [clean(customer.city, 80), clean(customer.address, 200)]
    .filter(Boolean)
    .join(', ')
  return [
    "Hello Izzy Crafts, I'd like to place an order.",
    `Order ref: ${ref}`,
    '',
    ...items,
    '',
    `Subtotal: ${priced ? formatNGN(subtotal) : 'to be confirmed'}`,
    '',
    `Name: ${clean(customer.name, 80)}`,
    `Phone: ${clean(customer.phone, 30)}`,
    `Delivery: ${delivery}`,
    ...(customer.notes?.trim() ? [`Notes: ${clean(customer.notes, 500)}`] : []),
  ].join('\n')
}

/** Prefilled question from a product page. */
export function buildProductEnquiry(product: Product, sizeLabel?: string): string {
  const detail = sizeLabel ? `size ${sizeLabel}` : ''
  return [
    `Hello Izzy Crafts, I'd like to ask about ${product.name}${detail ? ` (${detail})` : ''}.`,
    ...(site.url ? [absoluteUrl(`/product/${product.slug}`)] : []),
  ].join('\n')
}

export function buildCustomPairMessage(req: CustomPairRequest, ref: OrderRef): string {
  const o = getCustomOptions()
  const name = (list: { id: string; name: string }[], id: string) =>
    list.find((x) => x.id === id)?.name ?? id
  const base = req.baseProductId ? getProductById(req.baseProductId) : undefined
  return [
    "Hello Izzy Crafts, I'd like to start a custom pair.",
    `Request ref: ${ref}`,
    '',
    `Style: ${name(o.styles, req.styleId)}${base ? ` (based on ${base.name})` : ''}`,
    `Material: ${name(o.materials, req.materialId)}`,
    `Colour: ${name(o.colours, req.colourId)}`,
    `Sole: ${name(o.soles, req.soleId)}`,
    `Size: ${getSizeLabel(req.size)}`,
    `Width / fit: ${name(o.fits, req.fitId)}`,
    ...(req.neededBy ? [`Needed by: ${clean(req.neededBy, 40)}`] : []),
    ...(req.notes?.trim() ? [`Notes: ${clean(req.notes, 600)}`] : []),
    '',
    `Name: ${clean(req.name, 80)}`,
  ].join('\n')
}
