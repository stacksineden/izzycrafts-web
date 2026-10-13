import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../config/site'
import { breadcrumbJsonLd, seo } from '../lib/seo'
import { buildWhatsAppLink } from '../lib/whatsapp'
import type { Route } from './+types/care-guide'

export const meta: Route.MetaFunction = () =>
  seo({
    title: 'Leather & Velvet Shoe Care Guide',
    description:
      'How to care for handmade leather, velvet and woven footwear: brushing, conditioning, resting and storing your pairs so they last for years.',
    path: '/care-guide',
    type: 'article',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Care Guide', path: '/care-guide' },
    ]),
  })

const sections = [
  {
    title: 'Leather',
    applies: 'Loafers, slides, sandals and clogs in smooth, pebble-grain or croc-embossed leather.',
    tips: [
      'Brush off dust after wearing with a soft horsehair brush.',
      'Condition every few weeks with a neutral leather cream, working it in with a soft cloth.',
      'If your pair gets wet, let it dry slowly at room temperature, away from direct sun or heat, with paper inside.',
      'Rest a pair for a day between wears so the leather can breathe and keep its shape.',
    ],
  },
  {
    title: 'Velvet and embellished pairs',
    applies: 'The Imperial and Royal Heirloom loafers.',
    tips: [
      'Brush gently in the direction of the pile with a soft, clean brush.',
      'Keep velvet away from rain and spills. Blot (do not rub) any marks with a dry cloth.',
      'Avoid snagging beadwork and embroidery; store each shoe so the decorated vamps do not touch.',
    ],
  },
  {
    title: 'Woven uppers',
    applies: 'The Mesh Signature Mule.',
    tips: [
      'Use a soft brush to lift dust out of the weave.',
      'Spot clean with a barely damp cloth and let it air dry.',
      'Wipe the leather footbed with a dry cloth after wear.',
    ],
  },
  {
    title: 'Storing your pairs',
    applies: 'Every pair.',
    tips: [
      'Store in a cool, dry place in a breathable cotton bag, not plastic.',
      'Use cedar shoe trees or rolled paper in closed pairs to hold their shape and absorb moisture.',
      'Keep pairs out of direct sunlight, which fades and dries leather.',
    ],
  },
]

export default function CareGuide() {
  return (
    <>
      <PageHero
        eyebrow="Care guide"
        title="Made to last, with a little care."
        intro="Handmade footwear ages well when it is looked after. A few minutes now and then keeps your pairs right for years."
        image="/images/site/care"
        alt="A horsehair brush, a tin of leather conditioner and a soft cloth beside a cognac loafer"
      />
      <section className="py-20 sm:py-28">
        <Container className="max-w-4xl">
          <ul className="space-y-16">
            {sections.map((s) => (
              <li key={s.title}>
                <SectionHeading title={s.title} intro={s.applies} />
                <ul className="mt-6 space-y-3">
                  {s.tips.map((t) => (
                    <li key={t} className="flex gap-4 text-base text-charcoal/85 sm:text-lg">
                      <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-cognac" />
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-20 rounded-sm bg-stone/50 p-8 text-center">
            <h2 className="font-display text-2xl text-espresso">
              Not sure how to care for your pair?
            </h2>
            <p className="mt-2 text-charcoal/80">
              Send us a picture and we will tell you exactly what it needs.
            </p>
            <Button
              href={buildWhatsAppLink(
                "Hello Izzy Crafts, I'd like some advice on caring for my pair.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-6"
            >
              Ask us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </Button>
            <p className="mt-3 text-sm text-charcoal/60">{site.whatsappDisplay}</p>
          </div>
        </Container>
      </section>
    </>
  )
}
