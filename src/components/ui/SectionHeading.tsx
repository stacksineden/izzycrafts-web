import type { ReactNode } from 'react'
import { StitchDivider } from './StitchDivider'
import { cn } from './cn'

interface Props {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'onLight' | 'onDark'
  as?: 'h1' | 'h2'
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'onLight',
  as: H = 'h2',
  action,
  className,
}: Props) {
  const dark = tone === 'onDark'
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto flex flex-col items-center')}>
        {eyebrow && (
          <>
            <p className={cn('eyebrow', dark ? 'text-ivory/75' : 'text-cognac-deep')}>{eyebrow}</p>
            <StitchDivider
              className={cn('mt-3', dark ? 'text-brass' : 'text-cognac/60')}
              width={64}
            />
          </>
        )}
        <H
          className={cn(
            'mt-5 font-display font-light tracking-[-0.01em]',
            H === 'h1'
              ? 'text-4xl sm:text-5xl lg:text-6xl'
              : 'text-3xl sm:text-4xl lg:text-[2.75rem]',
            dark ? 'text-ivory' : 'text-espresso',
            !eyebrow && 'mt-0',
          )}
        >
          {title}
        </H>
        {intro && (
          <p
            className={cn('mt-4 text-base sm:text-lg', dark ? 'text-ivory/80' : 'text-charcoal/80')}
          >
            {intro}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
