import type { ReactNode } from 'react'
import { cn } from './cn'

type BadgeTone = 'neutral' | 'brass'

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-espresso/8 text-espresso',
  brass: 'bg-brass/15 text-espresso',
}

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
