import { Icon } from './Icon'
import { cn } from './cn'

interface Props {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
  label: string
  size?: 'sm' | 'md'
}

export function QuantityStepper({ value, min = 1, max, onChange, label, size = 'md' }: Props) {
  const btn = cn(
    'grid place-items-center text-espresso transition-colors hover:bg-espresso/[0.06] disabled:opacity-35 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-espresso',
    size === 'sm' ? 'size-9' : 'size-11',
  )
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-sm border border-line bg-white/60"
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Icon name="minus" size={16} />
      </button>
      <output
        aria-live="polite"
        className={cn('min-w-8 text-center font-medium tabular-nums', size === 'sm' && 'text-sm')}
      >
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}
