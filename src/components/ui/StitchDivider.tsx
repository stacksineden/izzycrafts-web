import { cn } from './cn'

interface StitchDividerProps {
  /** Any CSS colour. Defaults to currentColor, so `className="text-brass"` also works. */
  color?: string
  /** CSS width, e.g. 96, "6rem" or "100%". */
  width?: number | string
  /** Stroke thickness in px. */
  thickness?: number
  /** Length of each stitch, before the rounded caps. */
  stitch?: number
  /** Space between stitches, before the rounded caps. */
  gap?: number
  className?: string
}

/**
 * Saddle-stitch line: short rounded strokes, the brand's signature motif.
 * Decorative only, so hidden from assistive tech.
 */
export function StitchDivider({
  color = 'currentColor',
  width = '100%',
  thickness = 2,
  stitch = 7,
  gap = 6,
  className,
}: StitchDividerProps) {
  const y = thickness
  // Round caps add `thickness` to each dash's visible length, so take it back out of the pattern.
  const dash = Math.max(stitch - thickness, 0.01)
  const space = gap + thickness

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn('block shrink-0 overflow-visible', className)}
      width={width}
      height={thickness * 2}
      style={{ width }}
    >
      <line
        x1={thickness / 2}
        x2="100%"
        y1={y}
        y2={y}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${space}`}
      />
    </svg>
  )
}
