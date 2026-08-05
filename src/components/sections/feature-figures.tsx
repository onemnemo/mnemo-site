import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * Spot figures for the three feature pillars, hand-drawn in the same
 * line language as the /science figures: currentColor strokes, flat
 * fills from the canvas tokens, no perspective, no baked shadows. They
 * replaced a set of generated sticker PNGs whose glossy 3D look and
 * off-palette colors clashed with the site's flat editorial style (and
 * with each other).
 *
 * Each figure quotes a motif the site already owns, so home rhymes with
 * the rest of the site: the flashcards are the fact/quiz card deck over
 * the spaced-review dots of /science's scene 4, and the mindmap is a
 * cousin of the /science constellation with the canvas tools showing.
 *
 * Reveal wiring matches science/figures.tsx: pathLength={1} strokes with
 * fig-draw, fills with fig-pop / fig-fade, delays via --reveal-delay.
 * Everything renders complete without JS; each figure takes a base
 * offset so the three cards can draw as one staggered row under a
 * single Reveal wrapper.
 */

type FigureProps = {
  className?: string
  /** Added to every internal delay, for cross-card staggering. */
  base?: number
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties

/** Standard pointer-cursor glyph, positioned by its arrow tip. */
function Cursor({ x, y, delayMs }: { x: number; y: number; delayMs: number }) {
  return (
    <path
      d={`M${x} ${y} l4.2 11.6 2.4-4.6 5 2.6-2.6-5 4.8-1.8 Z`}
      fill="currentColor"
      stroke="var(--background)"
      strokeWidth="1.5"
      className="fig-pop"
      style={delay(delayMs)}
    />
  )
}

/** Pillar 1: a block-editor page with an image block lifted mid-drag. */
export function NotesFigure({ className, base = 0 }: FigureProps) {
  const d = (ms: number) => delay(base + ms)
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 150"
      fill="none"
      className={cn("block", className)}
    >
      {/* The page. */}
      <rect
        x="34"
        y="6"
        width="126"
        height="138"
        rx="12"
        stroke="currentColor"
        strokeWidth="2.5"
        pathLength={1}
        className="fig-draw"
        style={d(0)}
      />
      {/* Heading and text lines. */}
      <line
        x1="52"
        y1="30"
        x2="116"
        y2="30"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="fig-fade"
        style={d(200)}
      />
      <line
        x1="52"
        y1="48"
        x2="140"
        y2="48"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="fig-fade"
        style={d(260)}
      />
      <line
        x1="52"
        y1="58"
        x2="112"
        y2="58"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="fig-fade"
        style={d(300)}
      />
      {/* The slot the block was dragged out of. */}
      <rect
        x="52"
        y="70"
        width="88"
        height="32"
        rx="7"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="fig-fade"
        style={d(360)}
      />
      <line
        x1="52"
        y1="118"
        x2="132"
        y2="118"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="fig-fade"
        style={d(300)}
      />
      <line
        x1="52"
        y1="128"
        x2="100"
        y2="128"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="fig-fade"
        style={d(320)}
      />
      {/* The image block, lifted and tilted mid-drag. */}
      <g
        className="fig-pop"
        style={{ ...d(480), transformOrigin: "158px 102px" }}
      >
        <g transform="rotate(7 158 102)">
          <rect
            x="122"
            y="85"
            width="76"
            height="36"
            rx="8"
            fill="var(--butter)"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          {/* Drag handle. */}
          {[96, 103, 110].map((y) => (
            <g key={y} fill="currentColor" fillOpacity="0.5">
              <circle cx="131" cy={y} r="1.6" />
              <circle cx="137" cy={y} r="1.6" />
            </g>
          ))}
          {/* The picture: a sun over hills. */}
          <circle
            cx="156"
            cy="96"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M146 114 l12 -11 8 7 8 -8 12 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <Cursor x={196} y={118} delayMs={base + 620} />
    </svg>
  )
}

/**
 * Pillar 2: the card deck over a timeline of reviews whose gaps grow,
 * which is /science's spacing figure compressed to a footnote. The dots
 * even pop with widening delays, so the choreography spaces itself.
 */
const REVIEW_DOTS = [
  { x: 56, delayMs: 640 },
  { x: 74, delayMs: 730 },
  { x: 102, delayMs: 850 },
  { x: 140, delayMs: 1010 },
  { x: 186, delayMs: 1210 },
]

export function FlashcardsFigure({ className, base = 0 }: FigureProps) {
  const d = (ms: number) => delay(base + ms)
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 150"
      fill="none"
      className={cn("block", className)}
    >
      {/* The rest of the deck. */}
      <rect
        x="60"
        y="22"
        width="106"
        height="68"
        rx="10"
        transform="rotate(2.4 113 56)"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2"
        pathLength={1}
        className="fig-draw"
        style={d(0)}
      />
      {/* The top card. */}
      <g transform="rotate(-1.6 106 50)">
        <rect
          x="52"
          y="16"
          width="106"
          height="68"
          rx="10"
          fill="var(--background)"
          stroke="currentColor"
          strokeWidth="2.5"
          pathLength={1}
          className="fig-draw"
          style={d(120)}
        />
        {/* Progress dashes, third lit: stage 3 is Retrieved. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={66 + i * 13}
            y1="32"
            x2={73 + i * 13}
            y2="32"
            stroke={i === 2 ? "var(--primary)" : "currentColor"}
            strokeOpacity={i === 2 ? 1 : 0.25}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="fig-fade"
            style={d(320)}
          />
        ))}
        {/* The question. */}
        <line
          x1="66"
          y1="48"
          x2="140"
          y2="48"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="fig-fade"
          style={d(380)}
        />
        {/* Two answers, the right one picked. */}
        <rect
          x="66"
          y="58"
          width="32"
          height="15"
          rx="7.5"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="2"
          className="fig-fade"
          style={d(440)}
        />
        <rect
          x="104"
          y="58"
          width="32"
          height="15"
          rx="7.5"
          fill="var(--meadow)"
          stroke="currentColor"
          strokeWidth="2"
          className="fig-fade"
          style={d(480)}
        />
      </g>
      {/* Reviews spacing themselves out along time. */}
      <line
        x1="44"
        y1="122"
        x2="196"
        y2="122"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        className="fig-fade"
        style={d(560)}
      />
      {REVIEW_DOTS.map((dot) => (
        <circle
          key={dot.x}
          cx={dot.x}
          cy="122"
          r="5"
          fill="var(--primary)"
          className="fig-pop"
          style={d(dot.delayMs)}
        />
      ))}
    </svg>
  )
}

/**
 * Pillar 3: the open canvas. Shaped, colored, connected nodes (the copy's
 * exact claim), one mid-connection, one selected with its handles showing.
 * A cousin of /science's constellation, wearing its editor tools.
 */
export function MindmapFigure({ className, base = 0 }: FigureProps) {
  const d = (ms: number) => delay(base + ms)
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 150"
      fill="none"
      className={cn("block", className)}
    >
      {/* Settled connections, then one still being dragged out. */}
      <line
        x1="78"
        y1="42"
        x2="130"
        y2="38"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        pathLength={1}
        className="fig-draw"
        style={d(0)}
      />
      <line
        x1="68"
        y1="56"
        x2="100"
        y2="96"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        pathLength={1}
        className="fig-draw"
        style={d(120)}
      />
      <line
        x1="152"
        y1="52"
        x2="120"
        y2="99"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
        pathLength={1}
        className="fig-draw"
        style={d(240)}
      />
      {/* The nodes: a circle, a card, a diamond. */}
      <circle
        cx="62"
        cy="42"
        r="16"
        fill="var(--blush)"
        stroke="currentColor"
        strokeWidth="2.5"
        className="fig-pop"
        style={d(320)}
      />
      <rect
        x="132"
        y="24"
        width="42"
        height="28"
        rx="8"
        fill="var(--butter)"
        stroke="currentColor"
        strokeWidth="2.5"
        className="fig-pop"
        style={{ ...d(410), transformOrigin: "153px 38px" }}
      />
      <path
        d="M110 90 l18 18 -18 18 -18 -18 Z"
        fill="var(--meadow)"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="fig-pop"
        style={{ ...d(500), transformOrigin: "110px 108px" }}
      />
      {/* Selection box and handles around the card node. */}
      <g className="fig-fade" style={d(680)}>
        <rect
          x="124"
          y="16"
          width="58"
          height="44"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {[
          [124, 16],
          [182, 16],
          [124, 60],
          [182, 60],
        ].map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))}
      </g>
      <Cursor x={126} y={122} delayMs={base + 800} />
    </svg>
  )
}
