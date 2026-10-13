import { getSizeLabel } from '../../lib/catalog'
import type { SizeId } from '../../types/product'
import { Icon } from '../ui/Icon'
import { cn } from '../ui/cn'

interface Props {
  name: string
  sizes: SizeId[]
  value: SizeId | null
  onChange: (size: SizeId) => void
  onOpenGuide: () => void
  error?: string
}

export function SizePicker({ name, sizes, value, onChange, onOpenGuide, error }: Props) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <div className="flex items-center justify-between gap-4">
        <legend className="text-sm font-medium text-espresso">
          Size
          {value && <span className="font-normal text-charcoal/80">: {getSizeLabel(value)}</span>}
        </legend>
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-1.5 text-sm text-espresso underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso"
        >
          <Icon name="ruler" size={16} />
          Size guide
        </button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7">
        {sizes.map((s) => (
          <label key={s} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={s}
              checked={s === value}
              onChange={() => onChange(s)}
              className="peer sr-only"
            />
            <span
              className={cn(
                'grid h-12 place-items-center rounded-sm border text-[0.9375rem] tabular-nums transition-colors',
                'border-line bg-white/50 text-espresso hover:border-espresso/50',
                'peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory',
                'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-espresso',
                error && 'border-[#9b2c2c]/50',
              )}
            >
              {getSizeLabel(s).replace(/^EU /, '')}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-xs text-charcoal/60">
        EU sizing. Half sizes and wider fits can be made to order.
      </p>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm font-medium text-[#9b2c2c]">
          {error}
        </p>
      )}
    </fieldset>
  )
}
