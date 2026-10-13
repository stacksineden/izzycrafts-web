import { CategoryRail } from '../components/home/CategoryRail'
import { CustomBand } from '../components/home/CustomBand'
import { Hero } from '../components/home/Hero'
import { HowOrderingWorks } from '../components/home/HowOrderingWorks'
import { ProcessSteps } from '../components/home/ProcessSteps'
import { StoryBand } from '../components/home/StoryBand'
import { ProductGrid } from '../components/product/ProductCard'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StitchDivider } from '../components/ui/StitchDivider'
import { site } from '../config/site'
import { getFeaturedProducts } from '../lib/catalog'
import { organizationJsonLd, seo } from '../lib/seo'
import type { Route } from './+types/home'

export const meta: Route.MetaFunction = () =>
  seo({
    path: '/',
    description:
      'Handmade leather loafers, slides, sandals and custom footwear from Nigeria. Every pair is made to order by skilled artisans and confirmed with you on WhatsApp.',
    jsonLd: [
      organizationJsonLd,
      { '@type': 'WebSite', name: site.name, ...(site.url ? { url: site.url } : {}) },
    ],
  })

export default function Home() {
  const featured = getFeaturedProducts()
  return (
    <>
      <Hero />

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="flex flex-col items-center text-center">
          <StitchDivider className="text-cognac/60" width={72} />
          <p className="mt-8 max-w-3xl font-display text-2xl leading-snug font-light text-espresso sm:text-3xl lg:text-4xl">
            Things made slowly, by hand, by people who care, last longer and feel better.{' '}
            <span className="text-cognac-deep italic">That is the whole idea.</span>
          </p>
        </Container>
      </section>

      <CategoryRail />

      <section className="pb-20 sm:pb-28" aria-labelledby="featured-title">
        <Container wide>
          <SectionHeading
            eyebrow="The collection"
            title={<span id="featured-title">Pairs from the workshop</span>}
            action={
              <Button to="/shop" variant="secondary" className="self-start md:self-auto">
                View all footwear
              </Button>
            }
          />
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </Container>
      </section>

      <StoryBand />
      <ProcessSteps />
      <CustomBand />
      <HowOrderingWorks />
    </>
  )
}
