import Image from "next/image"

import peekArt from "@public/soma/peek-grip-clean.png"
import { cn } from "@/lib/utils"

type TornEdgeProps = {
  /**
   * Render Soma peeking over the tear. The art is drawn cut off by the tear
   * line, so it belongs to this component rather than to the footer.
   */
  mascot?: boolean
  /**
   * Tailwind classes choosing the two canvases: the background class is the
   * outgoing canvas (the band above), the text class is the incoming canvas
   * (the band below), e.g. "bg-butter text-background".
   */
  className?: string
}

/**
 * Torn-paper edge between two canvas bands: a single irregular line, as if
 * the outgoing band were a sheet torn off above the next one.
 *
 * The tear is the boundary. Pairing it with a rule or border on the band
 * beneath produces a double seam.
 */

const WIDTH = 1440
const HEIGHT = 30
/**
 * Tear profile in viewBox units. Torn paper is not periodic: short bumps sit
 * inside long drifts, dips fall sharply and recover slowly, and segment
 * lengths never repeat. The broad sag from x=1100 onward is where the mascot
 * grips the edge, so its floor must stay in the 23-25 range for the paws to
 * land on the line at any viewport width. Points left of it are free.
 */
const POINTS = [
  { x: 0, y: 11 },
  { x: 115, y: 8 },
  { x: 165, y: 15 },
  { x: 210, y: 12 },
  { x: 395, y: 9 },
  { x: 450, y: 24 },
  { x: 520, y: 11 },
  { x: 700, y: 13 },
  { x: 755, y: 8 },
  { x: 930, y: 10 },
  { x: 975, y: 17 },
  { x: 1030, y: 12 },
  { x: 1100, y: 23 },
  { x: 1180, y: 25 },
  { x: 1290, y: 23 },
  { x: 1380, y: 25 },
  { x: 1440, y: 24 },
]

/** Smooth the tear through segment midpoints so it curls instead of zigzags. */
function tearLine() {
  const last = POINTS.length - 1
  let d = `M${WIDTH} ${POINTS[last].y}`
  for (let i = last - 1; i >= 1; i--) {
    const midX = (POINTS[i].x + POINTS[i - 1].x) / 2
    const midY = (POINTS[i].y + POINTS[i - 1].y) / 2
    d += ` Q ${POINTS[i].x} ${POINTS[i].y} ${midX} ${midY}`
  }
  return d + ` L0 ${POINTS[0].y}`
}

const LINE = tearLine()
/**
 * The strip paints the incoming canvas below the tear and takes the outgoing
 * canvas from its own background, rather than the other way round. Both of
 * the strip's box edges then meet a band of their own color, so sub-pixel
 * rounding at those edges cannot expose a hairline of the wrong color; the
 * two canvases only ever meet along the tear itself, mid-strip. The fill runs
 * past the viewBox bottom so the clip covers the last row.
 */
const SHAPE = `M0 ${HEIGHT + 2} H${WIDTH} ${LINE.replace("M", "L")} Z`

export function TornEdge({ mascot = false, className }: TornEdgeProps) {
  return (
    <div className={cn("relative h-6 w-full sm:h-8", className)}>
      <svg
        aria-hidden
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="block h-full w-full"
        preserveAspectRatio="none"
      >
        <path d={SHAPE} fill="currentColor" />
        {/* Hairline highlight hugging the outgoing side of the tear: the
            torn sheet showing its paper thickness. White over any canvas
            color reads as that canvas's cream, so it stays nearly
            invisible. */}
        <path
          d={LINE}
          fill="none"
          stroke="#fff"
          strokeOpacity={0.4}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          transform="translate(0 -0.75)"
        />
      </svg>

      {/* The art is cut flat along its own bottom edge, so that edge is
          parked on the tear line and the incoming canvas hides everything
          below it. The offsets are the tear's remaining depth: the valley
          sits at 25 of 30 viewBox units, so the line is a sixth of the
          strip's height up from its bottom. */}
      {mascot ? (
        <Image
          src={peekArt}
          alt=""
          aria-hidden
          className="absolute right-6 bottom-[4px] h-11 w-auto sm:right-16 sm:bottom-[6px] sm:h-14"
        />
      ) : null}
    </div>
  )
}
