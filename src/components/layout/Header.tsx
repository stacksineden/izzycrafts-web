import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { primaryNav } from '../../config/navigation'
import { useCart } from '../../features/cart'
import { useScrolled } from '../../hooks/useScrolled'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { cn } from '../ui/cn'
import { MobileMenu } from './MobileMenu'

/** Height is mirrored by the hero's negative margin on the home page. */
export const HEADER_HEIGHT = 'h-16 lg:h-[76px]'

export function Header() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(24)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount, ready, openDrawer } = useCart()

  // Over the home hero the header is transparent with ivory text until the page scrolls.
  const overHero = pathname === '/' && !scrolled && !menuOpen
  const iconBtn = cn(
    'relative grid size-11 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-0',
    overHero
      ? 'hover:bg-ivory/10 focus-visible:outline-ivory'
      : 'hover:bg-espresso/[0.06] focus-visible:outline-espresso',
  )

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,color,box-shadow] duration-300',
        overHero
          ? 'bg-transparent text-ivory'
          : 'bg-ivory/92 text-espresso shadow-[0_1px_0_var(--color-line)] backdrop-blur-md supports-[backdrop-filter]:bg-ivory/80',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1440px] items-center gap-3 px-2 sm:px-4 lg:px-10',
          HEADER_HEIGHT,
        )}
      >
        <button
          type="button"
          className={cn(iconBtn, 'lg:hidden')}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Icon name="menu" size={22} />
        </button>

        <Link
          to="/"
          className="mx-auto rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current lg:mx-0"
          aria-label="Izzy Crafts, home"
        >
          <Logo size="sm" />
        </Link>

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/shop'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xs py-2 text-[0.9375rem] font-medium decoration-1 underline-offset-[10px] transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                      isActive && 'underline',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={iconBtn}
          onClick={openDrawer}
          aria-label={`Bag, ${ready ? itemCount : 0} items`}
        >
          <Icon name="bag" size={22} />
          {ready && itemCount > 0 && (
            <span
              className="absolute top-1 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-cognac px-1 text-[0.6875rem] leading-[18px] font-semibold text-ivory tabular-nums"
              aria-hidden="true"
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
