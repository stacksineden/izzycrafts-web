import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from './cn'

interface DialogProps {
  open: boolean
  onClose: () => void
  /** Accessible name. */
  label: string
  /** drawer: slides in from the right. sheet: bottom sheet on mobile, centred card on desktop. */
  variant?: 'drawer' | 'sheet' | 'menu'
  className?: string
  children: ReactNode
}

/**
 * Native <dialog> opened with showModal(): focus trapping, Escape to close, inert
 * background and top-layer stacking come from the browser.
 */
export function Dialog({
  open,
  onClose,
  label,
  variant = 'drawer',
  className,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!open && el.open) {
      el.close()
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself, outside the panel) closes it.
        if (e.target === e.currentTarget) onClose()
      }}
      className={cn(
        'fixed inset-0 h-dvh w-full overflow-hidden bg-transparent',
        variant === 'drawer' && 'ml-auto max-w-md',
        variant === 'menu' && 'mr-auto max-w-sm',
        variant === 'sheet' && 'items-end open:flex sm:items-center sm:justify-center',
      )}
    >
      <div
        className={cn(
          'flex flex-col bg-ivory text-charcoal shadow-2xl',
          variant === 'drawer' && 'h-full w-full motion-safe:animate-drawer-in',
          variant === 'menu' && 'h-full w-full motion-safe:animate-menu-in',
          variant === 'sheet' &&
            'max-h-[88dvh] w-full rounded-t-xl motion-safe:animate-sheet-in sm:max-w-xl sm:rounded-lg sm:motion-safe:animate-fade-in',
          className,
        )}
      >
        {children}
      </div>
    </dialog>
  )
}
