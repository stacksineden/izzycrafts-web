import { site } from '../../config/site'
import { cn } from './cn'

type LogoSize = 'sm' | 'md' | 'lg'

const wordmarkSizes: Record<LogoSize, { name: string; sub: string; img: string }> = {
  sm: { name: 'text-lg', sub: 'text-[0.5625rem]', img: 'h-8' },
  md: { name: 'text-2xl', sub: 'text-[0.625rem]', img: 'h-12' },
  lg: { name: 'text-3xl sm:text-[2.125rem]', sub: 'text-[0.6875rem]', img: 'h-14 sm:h-16' },
}

/**
 * Renders /brand/logo.svg when it exists at build time, otherwise a text wordmark.
 * The wordmark text is mixed case and uppercased in CSS, so screen readers say the words.
 */
export function Logo({ size = 'md', className }: { size?: LogoSize; className?: string }) {
  const s = wordmarkSizes[size]

  if (site.logo.available) {
    return (
      <img src={site.logo.src} alt={site.legalName} className={cn('w-auto', s.img, className)} />
    )
  }

  return (
    <span className={cn('inline-flex flex-col items-start leading-none', className)}>
      <span className={cn('font-display font-normal tracking-[0.2em] uppercase', s.name)}>
        Izzy Crafts
      </span>
      <span
        className={cn('mt-2 font-sans font-medium tracking-[0.34em] uppercase opacity-80', s.sub)}
      >
        Leather Products Ltd.
      </span>
    </span>
  )
}
