import { useState } from 'react'
import { Link } from 'react-router'
import { MAX_NOTE_LENGTH, MAX_QTY, useCart, type ResolvedLine } from '../../features/cart'
import { Picture } from '../ui/Picture'
import { Price } from '../ui/Price'
import { QuantityStepper } from '../ui/QuantityStepper'
import { cn } from '../ui/cn'

export function CartLineItem({
  item,
  compact,
  onNavigate,
}: {
  item: ResolvedLine
  compact?: boolean
  onNavigate?: () => void
}) {
  const { setQty, remove, setNote } = useCart()
  const [editingNote, setEditingNote] = useState(false)
  const href = `/product/${item.product.slug}`

  return (
    <li className="flex gap-4 py-5">
      <Link
        to={href}
        onClick={onNavigate}
        className={cn(
          'shrink-0 self-start overflow-hidden rounded-sm bg-stone',
          compact ? 'w-22' : 'w-24 sm:w-32',
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Picture
          src={item.image.src}
          alt=""
          sizes="128px"
          className="aspect-[4/5] w-full object-cover"
          blur={false}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div>
          <div className="min-w-0">
            <Link
              to={href}
              onClick={onNavigate}
              className="font-display text-lg leading-snug text-espresso hover:underline"
            >
              {item.product.name}
            </Link>
            <p className="mt-1 text-sm text-charcoal/70">{item.sizeLabel}</p>
            <Price
              amount={item.lineTotalNGN}
              className="mt-1 block text-sm font-medium text-espresso"
            />
          </div>
        </div>

        {item.line.note && !editingNote && (
          <p className="mt-2 line-clamp-2 text-sm text-charcoal/75">
            <span className="font-medium text-espresso">Fit notes:</span> {item.line.note}
          </p>
        )}
        {editingNote && (
          <form
            className="mt-2"
            onSubmit={(e) => {
              e.preventDefault()
              const value = new FormData(e.currentTarget).get('note')
              setNote(item.key, typeof value === 'string' ? value : '')
              setEditingNote(false)
            }}
          >
            <label htmlFor={`note-${item.key}`} className="sr-only">
              Fit notes for {item.product.name}
            </label>
            <textarea
              id={`note-${item.key}`}
              name="note"
              defaultValue={item.line.note}
              maxLength={MAX_NOTE_LENGTH}
              rows={2}
              autoFocus
              placeholder="Half size, wider fit, one foot larger…"
              className="w-full rounded-sm border border-line bg-white/70 px-3 py-2 text-sm focus:border-espresso focus:outline-none"
            />
            <div className="mt-1.5 flex gap-4 text-sm">
              <button
                type="submit"
                className="font-medium text-espresso underline underline-offset-4"
              >
                Save note
              </button>
              <button
                type="button"
                onClick={() => setEditingNote(false)}
                className="text-charcoal/70"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={item.line.qty}
            max={MAX_QTY}
            onChange={(qty) => setQty(item.key, qty)}
            label={`Quantity, ${item.product.name}`}
          />
          <div className="flex gap-4 text-sm">
            {!editingNote && (
              <button
                type="button"
                onClick={() => setEditingNote(true)}
                className="text-charcoal/75 underline-offset-4 hover:text-espresso hover:underline"
              >
                {item.line.note ? 'Edit note' : 'Add fit note'}
              </button>
            )}
            <button
              type="button"
              onClick={() => remove(item.key)}
              className="text-charcoal/75 underline-offset-4 hover:text-espresso hover:underline"
            >
              Remove<span className="sr-only"> {item.product.name}</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
