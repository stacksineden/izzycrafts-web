import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'link'
/** The surface the button sits on. Sets focus ring and secondary/link colours. */
type Tone = 'onLight' | 'onDark'

interface CommonProps {
  variant?: Variant
  tone?: Tone
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'> & { href?: undefined }
type LinkProps = CommonProps & ComponentPropsWithoutRef<'a'> & { href: string }

const base =
  'inline-flex items-center justify-center gap-2 transition-[background-color,color,filter,text-decoration-color] duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50'

const focusRing: Record<Tone, string> = {
  onLight: 'focus-visible:outline-espresso',
  onDark: 'focus-visible:outline-ivory',
}

/*
 * Primary: ivory on cognac is ~4.2:1, below AA for body-size text.
 * The label is set at 19px semibold so it qualifies as large text (≥18.66px bold, 3:1).
 */
const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    onLight:
      'min-h-14 rounded-sm bg-cognac px-7 py-3 text-[1.1875rem] font-semibold text-ivory hover:brightness-90',
    onDark:
      'min-h-14 rounded-sm bg-cognac px-7 py-3 text-[1.1875rem] font-semibold text-ivory hover:brightness-110',
  },
  secondary: {
    onLight:
      'min-h-12 rounded-sm border border-espresso/40 px-6 py-3 font-medium text-espresso hover:bg-espresso/5',
    onDark:
      'min-h-12 rounded-sm border border-ivory/40 px-6 py-3 font-medium text-ivory hover:bg-ivory/10',
  },
  link: {
    onLight:
      'rounded-xs py-1 font-medium text-cognac underline decoration-cognac/40 underline-offset-[6px] hover:decoration-cognac',
    onDark:
      'rounded-xs py-1 font-medium text-ivory underline decoration-ivory/40 underline-offset-[6px] hover:decoration-ivory',
  },
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', tone = 'onLight', className, children, ...rest } = props
  const classes = cn(base, focusRing[tone], variants[variant][tone], className)

  if (typeof rest.href === 'string') {
    return (
      <a {...(rest as ComponentPropsWithoutRef<'a'>)} className={classes}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>
  return (
    <button type={type} {...buttonRest} className={classes}>
      {children}
    </button>
  )
}
