import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from './cn'

const control =
  'block w-full rounded-sm border border-line bg-white/70 px-3.5 py-3 text-base text-charcoal placeholder:text-charcoal/45 ' +
  'transition-colors hover:border-espresso/40 focus:border-espresso focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-espresso ' +
  'aria-[invalid=true]:border-[#9b2c2c]'

interface FieldShellProps {
  label: string
  hint?: ReactNode
  error?: string
  optional?: boolean
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
  className?: string
}

function FieldShell({ label, hint, error, optional, children, className }: FieldShellProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-espresso"
      >
        {label}
        {optional && <span className="text-xs font-normal text-charcoal/60">Optional</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && (
        <p id={hintId} className="mt-1.5 text-sm text-charcoal/65">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-[#9b2c2c]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

type Shared = {
  label: string
  hint?: ReactNode
  error?: string
  optional?: boolean
  wrapperClassName?: string
}

export function TextField({
  label,
  hint,
  error,
  optional,
  wrapperClassName,
  className,
  ...rest
}: Shared & ComponentPropsWithoutRef<'input'>) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={cn(control, className)}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  wrapperClassName,
  className,
  ...rest
}: Shared & ComponentPropsWithoutRef<'textarea'>) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          rows={3}
          className={cn(control, 'resize-y', className)}
          {...rest}
        />
      )}
    </FieldShell>
  )
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  wrapperClassName,
  className,
  children,
  ...rest
}: Shared & ComponentPropsWithoutRef<'select'>) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      className={wrapperClassName}
    >
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={cn(control, 'appearance-none pr-10', className)}
            {...rest}
          >
            {children}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-espresso"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}
    </FieldShell>
  )
}
