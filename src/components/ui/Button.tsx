import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
/** The surface the button sits on. Sets focus ring and secondary/link colours. */
type Tone = 'onLight' | 'onDark'
type Size = 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  tone?: Tone
  size?: Size
  block?: boolean
  className?: string
  children: ReactNode
}

type AsButton = CommonProps &
  ComponentPropsWithoutRef<'button'> & { href?: undefined; to?: undefined }
type AsAnchor = CommonProps & ComponentPropsWithoutRef<'a'> & { href: string; to?: undefined }
type AsLink = CommonProps &
  Omit<LinkProps, 'className' | 'children'> & { to: LinkProps['to']; href?: undefined }

const base =
  'inline-flex items-center justify-center gap-2.5 text-center transition-[background-color,color,border-color,filter,text-decoration-color] duration-200 ' +
  'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-4'

const focusRing: Record<Tone, string> = {
  onLight: 'focus-visible:outline-espresso',
  onDark: 'focus-visible:outline-ivory',
}

/*
 * Primary: ivory on cognac is ~4.2:1, below AA for body-size text.
 * Labels are set at 19px semibold so they qualify as large text (3:1); hover deepens to 5.8:1.
 */
const sizes: Record<Size, string> = {
  md: 'min-h-12 px-6 text-[1.1875rem] font-semibold',
  lg: 'min-h-14 px-8 text-[1.1875rem] font-semibold',
}

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    onLight: 'rounded-sm bg-cognac text-ivory hover:bg-cognac-deep',
    onDark: 'rounded-sm bg-cognac text-ivory hover:bg-cognac-deep',
  },
  secondary: {
    onLight:
      'rounded-sm border border-espresso/30 text-espresso hover:border-espresso hover:bg-espresso/[0.04]',
    onDark: 'rounded-sm border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10',
  },
  ghost: {
    onLight: 'rounded-sm text-espresso hover:bg-espresso/[0.06]',
    onDark: 'rounded-sm text-ivory hover:bg-ivory/10',
  },
  link: {
    onLight:
      'rounded-xs font-medium text-espresso underline decoration-espresso/30 underline-offset-[6px] hover:decoration-espresso',
    onDark:
      'rounded-xs font-medium text-ivory underline decoration-ivory/40 underline-offset-[6px] hover:decoration-ivory',
  },
}

export function buttonClasses({
  variant = 'primary',
  tone = 'onLight',
  size = 'md',
  block,
  className,
}: Omit<CommonProps, 'children'>) {
  return cn(
    base,
    focusRing[tone],
    variant === 'link' ? 'py-1 text-base' : sizes[size],
    variants[variant][tone],
    block && 'w-full',
    className,
  )
}

export function Button(props: AsButton | AsAnchor | AsLink) {
  const { variant, tone, size, block, className, children, ...rest } = props
  const classes = buttonClasses({ variant, tone, size, block, className })

  if (rest.to !== undefined) {
    return (
      <Link {...(rest as LinkProps)} className={classes}>
        {children}
      </Link>
    )
  }
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
