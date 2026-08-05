import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * Static SVG figures for the /science story. Strokes and fills use
 * currentColor, so each canvas band colors its own figure through the
 * text color. Everything renders complete without JS; the reveal layer
 * is an enhancement on top and never changes the final state.
 *
 * The diagrams are the primary visuals of their scenes (the user chose
 * them over illustration there); mascot art appears only as small
 * accents elsewhere on the page.
 *
 * How the drawing animation works: every animated stroke carries
 * pathLength={1}, which normalizes its geometric length to 1, so one
 * CSS rule (dasharray 1, dashoffset 1 -> 0) draws any of them without
 * measuring. The fig-draw / fig-pop / fig-fade classes and the
 * --reveal-delay variable are consumed by the reveal block in
 * globals.css, and only act inside a [data-armed] wrapper (see
 * reveal.tsx), so these figures stay complete on the no-JS page. The
 * delays are hand-set per figure to choreograph: decay, rescue, decay,
 * each flatter than the last; edges before nodes before the ring.
 *
 * The figures are decorative reinforcement of claims the copy makes in
 * full, so they are hidden from assistive tech rather than described
 * twice.
 */

type FigureProps = {
  className?: string
}

/** Animation start offset, consumed as animation-delay in globals.css. */
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties

/** Scene 2: the Ebbinghaus forgetting curve, steep then leveling out. */
export function ForgettingCurve({ className }: FigureProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 240"
      fill="none"
      className={cn("block w-full", className)}
    >
      {/* Retention floor. */}
      <line
        x1="30"
        y1="222"
        x2="610"
        y2="222"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        className="fig-fade"
      />
      <path
        d="M30 30 C 90 40, 120 140, 200 180 S 420 214, 610 218"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        className="fig-draw"
        style={delay(150)}
      />
    </svg>
  )
}

/**
 * Scene 4: the same decay interrupted by reviews. Each dashed rescue
 * resets the curve higher and each following decay is flatter, which is
 * the entire argument for spacing in one picture. The choreography
 * replays it as a story: fall, rescue, shallower fall, rescue again.
 */
const DECAYS = [
  "M30 40 C 70 60, 100 130, 150 168",
  "M150 60 C 210 78, 260 110, 310 138",
  "M310 74 C 380 88, 450 104, 520 116",
  "M520 84 C 560 90, 590 94, 610 96",
]
const REVIEWS = [
  { x: 150, from: 168, to: 60 },
  { x: 310, from: 138, to: 74 },
  { x: 520, from: 116, to: 84 },
]
/** ms per decay draw; reviews land in the gaps between them. */
const BEAT = 500

export function SpacedCurve({ className }: FigureProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 240"
      fill="none"
      className={cn("block w-full", className)}
    >
      <line
        x1="30"
        y1="222"
        x2="610"
        y2="222"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        className="fig-fade"
      />
      {DECAYS.map((d, index) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          className="fig-draw"
          style={delay(index * BEAT)}
        />
      ))}
      {/* Reviews: the rescue moments. */}
      {REVIEWS.map((review, index) => (
        <g key={review.x}>
          <line
            x1={review.x}
            y1={review.from}
            x2={review.x}
            y2={review.to}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeDasharray="2 6"
            strokeLinecap="round"
            className="fig-fade"
            style={delay((index + 1) * BEAT - 120)}
          />
          <circle
            cx={review.x}
            cy={review.to}
            r="6"
            fill="currentColor"
            className="fig-pop"
            style={delay((index + 1) * BEAT - 60)}
          />
        </g>
      ))}
    </svg>
  )
}

/**
 * Scene 5: the network. One ringed node is the fact; edges are the roads
 * back to it.
 */
const NODES = [
  { x: 140, y: 80 },
  { x: 90, y: 210 },
  { x: 240, y: 250 },
  { x: 430, y: 70 },
  { x: 520, y: 180 },
  { x: 560, y: 260 },
  { x: 210, y: 40 },
  { x: 600, y: 90 },
]
const CENTER = { x: 320, y: 150 }
const EDGES: [number, number][] = [
  // Index -1 means the center node.
  [-1, 0],
  [-1, 2],
  [-1, 3],
  [-1, 4],
  [0, 6],
  [0, 1],
  [3, 7],
  [4, 5],
]

export function Constellation({ className }: FigureProps) {
  const at = (index: number) => (index === -1 ? CENTER : NODES[index])
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 300"
      fill="none"
      className={cn("block w-full", className)}
    >
      {/* The threads lay themselves one road at a time. */}
      {EDGES.map(([a, b], index) => (
        <line
          key={`${a}-${b}`}
          x1={at(a).x}
          y1={at(a).y}
          x2={at(b).x}
          y2={at(b).y}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="2"
          pathLength={1}
          className="fig-draw"
          style={delay(index * 90)}
        />
      ))}
      {NODES.map((node, index) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="currentColor"
          fillOpacity="0.8"
          className="fig-pop"
          style={delay(150 + index * 90)}
        />
      ))}
      {/* The fact's seat in the network, ringed last. */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="13"
        stroke="currentColor"
        strokeWidth="3"
        pathLength={1}
        className="fig-draw"
        style={delay(900)}
      />
    </svg>
  )
}
