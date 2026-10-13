import { getSizeChart } from '../../lib/catalog'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'

const steps = [
  'Stand on a sheet of paper in the evening, when your feet are at their largest.',
  'Mark the tip of your longest toe and the back of your heel, then measure between the marks.',
  'Measure both feet. Order for the larger one and tell us the difference in your fit notes.',
]

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const chart = getSizeChart()
  return (
    <Dialog open={open} onClose={onClose} label="Size guide" variant="sheet">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-display text-2xl text-espresso">Size guide</h2>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-full text-espresso hover:bg-espresso/[0.06]"
          aria-label="Close size guide"
        >
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="overflow-y-auto px-5 py-6">
        <h3 className="text-base font-semibold text-espresso">Measuring your feet</h3>
        <ol className="mt-3 space-y-2 text-[0.9375rem] text-charcoal/85">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="font-display text-cognac-deep">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-charcoal/70">{chart.note}</p>

        <table className="mt-6 w-full text-left text-[0.9375rem] tabular-nums">
          <caption className="sr-only">Size conversion between EU, UK and US</caption>
          <thead>
            <tr className="border-b border-line text-sm text-charcoal/70">
              <th scope="col" className="py-2 font-medium">
                EU
              </th>
              <th scope="col" className="py-2 font-medium">
                UK
              </th>
              <th scope="col" className="py-2 font-medium">
                US
              </th>
            </tr>
          </thead>
          <tbody>
            {chart.sizes.map((s) => (
              <tr key={s.id} className="border-b border-line/60">
                <th scope="row" className="py-2.5 font-medium text-espresso">
                  {s.eu}
                </th>
                <td className="py-2.5">{s.uk}</td>
                <td className="py-2.5">{s.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  )
}
