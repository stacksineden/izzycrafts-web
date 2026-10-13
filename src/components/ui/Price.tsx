import { formatPriceNGN } from '../../lib/currency'
import { cn } from './cn'

export function Price({ amount, className }: { amount: number | null; className?: string }) {
  return (
    <span className={cn('tabular-nums', amount === null && 'text-charcoal/75', className)}>
      {formatPriceNGN(amount)}
    </span>
  )
}
