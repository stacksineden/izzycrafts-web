import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'

export default function NotFound() {
  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Page not found</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: a warm 404 with links to the shop and custom pairs.{' '}
        <Link to="/" className="text-cognac underline underline-offset-4">
          Back to the start
        </Link>
      </p>
    </Container>
  )
}
