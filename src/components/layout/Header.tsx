import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../features/cart'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { cn } from '../ui/cn'

const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom pair' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xs py-1 text-sm font-medium underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso',
    isActive && 'underline',
  )

/** TODO: mobile menu, category links. */
export function Header() {
  const { itemCount } = useCart()

  return (
    <header className="border-b border-espresso/10">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link
          to="/"
          className="rounded-xs text-espresso focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
        >
          <Logo size="sm" />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/cart" className={linkClass}>
            Cart ({itemCount})
          </NavLink>
        </nav>
      </Container>
    </header>
  )
}
