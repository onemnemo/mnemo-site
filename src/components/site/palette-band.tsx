import { cn } from "@/lib/utils"

/**
 * The palette band: every canvas color as stacked horizontal bars, VHS
 * label style (the direction came from a Sony cassette reference). The
 * same signature already closes the share card, and the 404 television
 * broadcasts its cousin as a test pattern.
 *
 * It appears in two places, which is why the stack is its own component:
 *
 * 1. The site's bottom edge: a thin strip under the footer, always
 *    visible, so every page ends on the brand's spectrum.
 * 2. The overscroll reveal: a taller copy fixed behind the page.
 *    Platforms with elastic scrolling (macOS trackpads, iOS, Windows
 *    precision touchpads in newer Chromium) lift the page past its end
 *    and expose it, as if the site were a label stuck on the tape.
 *    Mouse-wheel scrolling never rubber-bands, so the strip in the
 *    footer is what guarantees the bars are part of the design and not
 *    an easter egg only trackpad users meet.
 *
 * The reveal works by painting order: the band is a negative z-index
 * fixed element, above the canvas backdrop but below the z-0 content
 * wrapper in layout.tsx, whose opaque background hides the band under
 * every page. Only the overscroll gap, beyond the document, has no
 * wrapper over it. If the wrapper ever loses its background or its
 * stacking context, the bars will bleed through any section that leans
 * on the body canvas.
 *
 * Order matches the share card: meadow, cobalt, butter, blush, coral.
 */

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

/** The fixed copy behind the page that elastic overscroll exposes. */
export function OverscrollBand() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10"
    >
      <PaletteBars barClassName="h-6" />
    </div>
  )
}
