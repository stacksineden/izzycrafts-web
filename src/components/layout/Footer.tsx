import { site } from '../../config/site'
import { Container } from '../ui/Container'
import { StitchDivider } from '../ui/StitchDivider'

/** TODO: category links, WhatsApp and Instagram, delivery and care info. */
export function Footer() {
  return (
    <footer className="mt-auto bg-espresso py-10 text-ivory">
      <Container>
        <StitchDivider className="text-brass" width={96} />
        <p className="mt-5 font-display text-lg text-brass italic">{site.promise}</p>
        <p className="mt-3 text-xs text-ivory/70">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </Container>
    </footer>
  )
}
