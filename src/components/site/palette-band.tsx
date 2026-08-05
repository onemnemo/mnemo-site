import { cn } from "@/lib/utils"

/**
 * The palette band: every canvas color as stacked horizontal bars, VHS
 * label style (the direction came from a Sony cassette reference). The
 * same signature already closes the share card, and the 404 television
 * broadcasts its cousin as a test pattern.
 *
 * It appears in two places:
 *
 * 1. The site's bottom edge: this thin strip under the footer, always
 *    visible, so every page ends on the brand's spectrum. Mouse-wheel
 *    scrolling never rubber-bands natively, so this strip is what
 *    guarantees the bars are part of the design for everyone.
 * 2. The elastic overscroll (overscroll-band.tsx, a client component
 *    kept separate so this one stays importable from server
 *    components): keep scrolling at the bottom and a stretching,
 *    bending copy of the same bars grows out of the page edge, then
 *    springs back.
 *
 * The overscroll copy hides behind the opaque z-0 wrapper in
 * layout.tsx and only shows in the gap the pull opens beyond the
 * document. If the wrapper ever loses its background or its stacking
 * context, the bars will bleed through any section that leans on the
 * body canvas.
 *
 * Order matches the share card: meadow, cobalt, butter, blush, coral.
 */

/** SVG fill values for the overscroll copy, same order as the bars. */
export const PALETTE_FILLS = [
  "var(--meadow)",
  "var(--cobalt)",
  "var(--butter)",
  "var(--blush)",
  "var(--primary)",
] as const

const PALETTE_BARS = [
  "bg-meadow",
  "bg-cobalt",
  "bg-butter",
  "bg-blush",
  "bg-primary",
] as const

export function PaletteBars({ barClassName }: { barClassName: string }) {
  return (
    <div aria-hidden className="flex w-full flex-col">
      {PALETTE_BARS.map((bar) => (
        <div key={bar} className={cn(bar, barClassName)} />
      ))}
    </div>
  )
}
