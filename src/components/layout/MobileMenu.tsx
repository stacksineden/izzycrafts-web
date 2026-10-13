import { NavLink } from 'react-router'
import { primaryNav, secondaryNav } from '../../config/navigation'
import { site } from '../../config/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { StitchDivider } from '../ui/StitchDivider'
import { cn } from '../ui/cn'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} label="Menu" variant="menu">
      <div className="flex h-16 items-center justify-between border-b border-line px-4">
        <Logo size="sm" className="text-espresso" />
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full text-espresso hover:bg-espresso/[0.06]"
          aria-label="Close menu"
        >
          <Icon name="close" size={22} />
        </button>
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
        <ul className="space-y-1">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/shop'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'block py-2.5 font-display text-[1.75rem] leading-tight font-light text-espresso',
                    isActive && 'text-cognac-deep italic',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <StitchDivider className="my-8 text-cognac/50" width={72} />
        <ul className="space-y-3">
          {secondaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className="text-base font-medium text-espresso"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-line p-6">
        <a
          href={buildWhatsAppLink(site.messages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-base font-medium text-espresso"
        >
          <Icon name="whatsapp" size={22} className="text-[#1f7a4d]" />
          Chat with us on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </Dialog>
  )
}
