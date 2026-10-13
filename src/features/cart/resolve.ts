import { getProductById, getSize, getSizeLabel } from '../../lib/catalog'
import type { CartLine, CartLineKey } from '../../types/cart'
import type { Product, ProductImage } from '../../types/product'
import { lineKey } from './cartReducer'

/** A cart line joined with live catalog data. */
export interface ResolvedLine {
  key: CartLineKey
  line: CartLine
  product: Product
  sizeLabel: string
  image: ProductImage
  unitPriceNGN: number | null
  lineTotalNGN: number | null
}

export function resolveLine(line: CartLine): ResolvedLine | null {
  const product = getProductById(line.productId)
  if (!product || !getSize(line.size) || !product.sizes.includes(line.size)) return null
  return {
    key: lineKey(line),
    line,
    product,
    sizeLabel: getSizeLabel(line.size),
    image: product.images[0],
    unitPriceNGN: product.priceNGN,
    lineTotalNGN: product.priceNGN === null ? null : product.priceNGN * line.qty,
  }
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.map(resolveLine).filter((l): l is ResolvedLine => l !== null)
}

/** null when any line is price on request, so the subtotal reads "to be confirmed". */
export function subtotalNGN(lines: ResolvedLine[]): number | null {
  let total = 0
  for (const l of lines) {
    if (l.lineTotalNGN === null) return null
    total += l.lineTotalNGN
  }
  return total
}
