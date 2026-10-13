import { Container } from '../ui/Container'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

export const processSteps = [
  {
    title: 'Cutting',
    image: '/images/site/process-cutting',
    alt: 'Hands cutting a shoe pattern from a hide of cognac leather with a round knife',
    text: 'Each piece is cut from the hide by hand, following the grain so the leather moves the way it should.',
  },
  {
    title: 'Stitching',
    image: '/images/site/process-stitching',
    alt: 'Hands hand-stitching a leather upper held in a wooden clam',
    text: 'Uppers are stitched with waxed thread, stitch by stitch, for seams that hold their line for years.',
  },
  {
    title: 'Lasting',
    image: '/images/site/process-lasting',
    alt: 'Hands pulling a leather upper over a wooden shoe last with lasting pliers',
    text: 'The upper is pulled over a wooden last and left to take its shape, which is where the fit is made.',
  },
  {
    title: 'Finishing',
    image: '/images/site/process-finishing',
    alt: 'Hands burnishing the edge of a leather sole with a wooden tool',
    text: 'Edges are burnished, the leather is conditioned and every pair is inspected before it leaves the bench.',
  },
]

export function ProcessSteps() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="process-title">
      <Container wide>
        <SectionHeading
          eyebrow="From hide to your feet"
          title={<span id="process-title">Four steps, all by hand</span>}
          intro="No two hides are the same, so no step is rushed. This is how every Izzy Crafts pair is made."
        />
      </Container>
      <ol className="mt-10 no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-[1440px] lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-10">
        {processSteps.map((s, i) => (
          <li
            key={s.title}
            className="w-[78vw] max-w-[340px] shrink-0 snap-start lg:w-auto lg:max-w-none"
          >
            <div className="overflow-hidden rounded-sm">
              <Picture
                src={s.image}
                alt={s.alt}
                sizes="(min-width: 1024px) 25vw, 78vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-5 font-display text-sm text-cognac-deep italic">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-2xl text-espresso">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-charcoal/80">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
