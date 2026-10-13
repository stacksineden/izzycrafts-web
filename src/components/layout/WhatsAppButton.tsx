import { useLocation } from 'react-router'
import { site } from '../../config/site'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { cn } from '../ui/cn'

/** Quiet floating help button. Hidden where a WhatsApp action is already the main call to action. */
export function WhatsAppButton() {
  const { pathname } = useLocation()
  if (
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/custom') ||
    pathname.startsWith('/product/')
  )
    return null
  return (
    <a
      href={buildWhatsAppLink(site.messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 grid size-13 place-items-center rounded-full bg-espresso text-ivory shadow-lg shadow-espresso/25',
        'transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso',
      )}
      aria-label="Chat with Izzy Crafts on WhatsApp (opens in a new tab)"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  )
}
