import { processSteps } from '../components/home/ProcessSteps'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PageHero } from '../components/ui/PageHero'
import { Picture } from '../components/ui/Picture'
import { Prose } from '../components/ui/Prose'
import { SectionHeading } from '../components/ui/SectionHeading'
import { cn } from '../components/ui/cn'
import { site } from '../config/site'
import { breadcrumbJsonLd, seo } from '../lib/seo'
import type { Route } from './+types/our-craft'

export const meta: Route.MetaFunction = () =>
  seo({
    title: 'Our Craft: How Every Pair Is Made by Hand',
    description:
      'From hide to your feet: how Izzy Crafts cuts, stitches, lasts and finishes every pair of handmade leather footwear in our Nigerian workshop.',
    path: '/our-craft',
    type: 'article',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Our Craft', path: '/our-craft' },
    ]),
  })

const values = [
  {
    title: 'Craftsmanship',
    text: 'Every pair carries the mark of a human hand. Precision is never traded for speed.',
  },
  {
    title: 'Integrity',
    text: 'Honest materials, honest pricing and honest claims. What we say about a pair is what it delivers.',
  },
  {
    title: 'Individuality',
    text: 'No two customers are the same, so no two pairs need to be. Customisation is a right, not a favour.',
  },
  {
    title: 'Patience',
    text: 'Good things are not rushed. We protect the time it takes to make something properly.',
  },
]

export default function OurCraft() {
  return (
    <>
      <PageHero
        eyebrow="Our craft"
        title="Every pair has a maker."
        intro="Izzy Crafts exists to keep the human hand present in an industry that has largely replaced it with machines."
        image="/images/site/story-hands"
        alt="An artisan's hands pulling waxed thread through a cognac leather upper"
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Why we exist" title="Something was being lost." />
          <Prose>
            <p>
              As footwear moved to machines and factories, the people who shaped leather by hand,
              cutting, stitching and finishing each piece with judgement no machine can copy, were
              pushed to the edges of an industry they built. We exist to put that skill back at the
              centre.
            </p>
            <p>
              Most shoes today are built for the factory, not the foot: standard sizes, generic
              shapes, made quickly and cheaply. The choice has been between pairs that are
              affordable but disposable, or bespoke pairs that are excellent but out of reach. We
              make genuinely handmade, customisable footwear at a price and timeline real people can
              reach.
            </p>
            <p>
              Before a pair reaches you, it passes through each stage of making, from design and
              choosing the leather to cutting, stitching, finishing and inspection, with a different
              craftsperson leaving their mark at each one. That is what we mean when we say every
              pair has a maker.
            </p>
          </Prose>
        </Container>
      </section>

      <section className="bg-stone/40 py-20 sm:py-28" aria-labelledby="steps-title">
        <Container wide>
          <SectionHeading
            eyebrow="From hide to your feet"
            title={<span id="steps-title">How a pair is made</span>}
            intro="Four of the stages every Izzy Crafts pair passes through, all by hand."
          />
          <ol className="mt-14 space-y-16 lg:space-y-24">
            {processSteps.map((s, i) => (
              <li key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={cn('overflow-hidden rounded-sm', i % 2 === 1 && 'lg:order-2')}>
                  <Picture
                    src={s.image}
                    alt={s.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
                <div className="max-w-md">
                  <p className="font-display text-5xl font-light text-cognac/70 italic">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-3xl text-espresso sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-base text-charcoal/85 sm:text-lg">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="values-title">
        <Container wide>
          <SectionHeading
            eyebrow="What we hold to"
            title={<span id="values-title">Our values</span>}
          />
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="border-t border-cognac/40 pt-6">
                <h3 className="font-display text-2xl text-espresso">{v.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-charcoal/80">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-espresso py-20 text-ivory sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-sm">
            <Picture
              src="/images/site/category-custom"
              alt="A pair of handmade cognac leather Oxford shoes on a workshop bench"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-3xl font-light text-ivory italic sm:text-4xl">
              {site.promise}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Button to="/shop" tone="onDark" size="lg">
                Shop the collection
              </Button>
              <Button to="/custom" variant="link" tone="onDark">
                Start a custom pair
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
