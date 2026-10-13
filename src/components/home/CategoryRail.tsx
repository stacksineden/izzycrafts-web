import { Link } from 'react-router'
import { getCategories } from '../../lib/catalog'
import { Container } from '../ui/Container'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

const tiles = [
  ...getCategories().map((c) => ({
    key: c.id,
    label: c.name,
    to: `/shop/${c.slug}`,
    image: c.image,
    note: 'Shop',
  })),
  {
    key: 'custom',
    label: 'Custom Pair',
    to: '/custom',
    image: '/images/site/category-custom',
    note: 'Made for you',
  },
]

export function CategoryRail() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="categories-title">
      <Container wide>
        <SectionHeading
          eyebrow="Shop by style"
          title={<span id="categories-title">Find your pair</span>}
          intro="Loafers for the office and the ceremony, slides and sandals for warm days, and pairs made entirely to your design."
        />
      </Container>
      <ul className="mt-10 no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-[1440px] lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-10">
        {tiles.map((t) => (
          <li
            key={t.key}
            className="w-[68vw] max-w-[300px] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:max-w-none"
          >
            <Link
              to={t.to}
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-espresso focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso"
            >
              <Picture
                src={t.image}
                alt=""
                sizes="(min-width: 1024px) 20vw, 68vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-espresso/90 via-espresso/20 via-50% to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <p className="eyebrow text-ivory/75">{t.note}</p>
                <p className="mt-1.5 font-display text-2xl leading-tight">{t.label}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
