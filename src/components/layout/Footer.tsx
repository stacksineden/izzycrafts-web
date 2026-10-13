import { Link } from 'react-router'
import { site } from '../../config/site'
import { getCategories } from '../../lib/catalog'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'
import { StitchDivider } from '../ui/StitchDivider'

const linkClass = 'text-ivory/80 transition-colors hover:text-ivory'

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <Container wide className="pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo size="md" />
            <StitchDivider className="mt-6 text-brass" width={96} />
            <p className="mt-6 font-display text-xl text-ivory italic">{site.promise}</p>
            <p className="mt-4 text-sm text-ivory/70">
              Handmade footwear from our workshop in Nigeria. Every pair is made to order and
              confirmed with you personally on WhatsApp.
            </p>
          </div>

          <nav aria-label="Shop">
            <h2 className="eyebrow text-ivory/60">Shop</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <Link to="/shop" className={linkClass}>
                  All footwear
                </Link>
              </li>
              {getCategories().map((c) => (
                <li key={c.id}>
                  <Link to={`/shop/${c.slug}`} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="The house">
            <h2 className="eyebrow text-ivory/60">The house</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <Link to="/custom" className={linkClass}>
                  Start a custom pair
                </Link>
              </li>
              <li>
                <Link to="/our-craft" className={linkClass}>
                  Our craft
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className={linkClass}>
                  Care guide
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-ivory/60">Talk to us</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={buildWhatsAppLink(site.messages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <Icon name="whatsapp" size={18} />
                  {site.whatsappDisplay}
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </a>
              </li>
              {site.instagramUrl && (
                <li>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-2.5`}
                  >
                    <Icon name="instagram" size={18} />
                    Instagram
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-xs text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>{site.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}
