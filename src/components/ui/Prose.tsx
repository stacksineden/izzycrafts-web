import type { ReactNode } from 'react'
import { cn } from './cn'

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('space-y-5 text-base leading-relaxed text-charcoal/85 sm:text-lg', className)}
    >
      {children}
    </div>
  )
}
