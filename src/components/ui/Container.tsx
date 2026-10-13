import type { ComponentPropsWithoutRef } from 'react'
import { cn } from './cn'

export function Container({
  className,
  wide,
  ...rest
}: ComponentPropsWithoutRef<'div'> & { wide?: boolean }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-10',
        wide ? 'max-w-[1440px]' : 'max-w-7xl',
        className,
      )}
      {...rest}
    />
  )
}
