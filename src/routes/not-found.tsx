import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { seo } from '../lib/seo'
import type { Route } from './+types/not-found'

export const meta: Route.MetaFunction = () =>
  seo({ title: 'Page not found', path: '/404', noindex: true })

export default function NotFound() {
  return (
    <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
      <div className="overflow-hidden rounded-sm lg:order-2">
        <Picture
          src="/images/site/not-found"
          alt="A single wooden shoe last standing alone on an empty workbench"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
        />
      </div>
      <div>
        <p className="eyebrow text-cognac-deep">Page not found</p>
        <h1 className="mt-4 font-display text-4xl font-light text-espresso sm:text-5xl">
          This last is still waiting for its pair.
        </h1>
        <p className="mt-4 max-w-md text-lg text-charcoal/80">
          The page you were looking for has moved or never existed. The collection is just this way.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button to="/shop" size="lg">
            Shop the collection
          </Button>
          <Button to="/" variant="link">
            Back to home
          </Button>
        </div>
      </div>
    </Container>
  )
}
