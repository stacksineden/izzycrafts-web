import type { ReactNode } from 'react'
import { cn } from './cn'

type BadgeTone = 'neutral' | 'brass' | 'dark'

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-ivory/90 text-espresso ring-1 ring-espresso/10',
  brass: 'bg-brass/15 text-espresso ring-1 ring-brass/40',
  dark: 'bg-espresso text-ivory',
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
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
