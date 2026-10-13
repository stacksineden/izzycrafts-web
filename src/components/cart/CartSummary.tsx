import { Price } from '../ui/Price'

/** Subtotal row with the price-on-request explanation. */
export function CartSummary({
  subtotalNGN,
  itemCount,
}: {
  subtotalNGN: number | null
  itemCount: number
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-base text-espresso">
          Subtotal{' '}
          <span className="text-sm text-charcoal/65">
            ({itemCount} {itemCount === 1 ? 'pair' : 'pairs'})
          </span>
        </p>
        {subtotalNGN === null ? (
          <p className="text-base font-medium text-espresso">To be confirmed</p>
        ) : (
          <Price amount={subtotalNGN} className="text-lg font-semibold text-espresso" />
        )}
      </div>
      <p className="mt-2 text-sm text-charcoal/70">
        {subtotalNGN === null
          ? 'Your pairs are made to order. We confirm the price, your size and delivery with you on WhatsApp before anything is made.'
          : 'Delivery is confirmed with you on WhatsApp before your order is made.'}
      </p>
    </div>
  )
}
