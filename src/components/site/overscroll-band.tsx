"use client"

import { useEffect, useRef } from "react"

/**
 * The elastic overscroll: keep scrolling at the bottom of the page and
 * the palette band grows out of the edge, its bars stretching and
 * bending under the pull; let go and the page springs back with one
 * bounce. Native rubber-banding only exists for trackpads and touch, so
 * the effect is driven here from wheel and touch input directly and
 * works with a plain mouse wheel, which is what the reference feel
 * (a VHS label page) demanded.
 *
 * The bars appear ONLY past the floor, by user decision: an earlier
 * version also ended the footer with a static strip of the same bars,
 * which read as the effect duplicated. The palette lives here and on
 * the share card; the page itself ends quietly.
 *
 * Mechanics, all outside React state so nothing re-renders per frame:
 *
 * - Wheel-down (or touch-drag) while the document is at its end
 *   accumulates `pull`, with resistance that grows toward MAX_GAP so
 *   the band feels like rubber, not a scrollbar.
 * - The page wrapper (tagged data-overscroll-page in layout.tsx) is
 *   translated up by `pull`, opening a gap the fixed band fills
 *   exactly. The band is an SVG redrawn each frame: five strips whose
 *   shared boundaries bow upward in the middle, upper boundaries most,
 *   so the stack reads as stretching under tension. The band's own top
 *   edge stays straight and flush with the page edge.
 * - RELEASE_DELAY after the last input, an underdamped spring drives
 *   `pull` back through zero; the small negative overshoot nudges the
 *   page down past rest for the bounce, while the band clamps at zero
 *   height.
 *
 * At rest the SVG holds a flat 120px band, which is what platforms with
 * native elastic scrolling reveal before hydration, without JS, and
 * under prefers-reduced-motion, where none of the listeners attach and
 * the static strip under the footer remains the whole story.
 */

/** Every canvas color, share-card order: meadow, cobalt, butter, blush, coral. */
const PALETTE_FILLS = [
  "var(--meadow)",
  "var(--cobalt)",
  "var(--butter)",
  "var(--blush)",
  "var(--primary)",
] as const

const BAR_COUNT = PALETTE_FILLS.length
/** Flat fallback band: native elastic reveal, no-JS, reduced motion. */
const REST_HEIGHT = 120
/** The hardest pull, as the gap it opens in px. */
const MAX_GAP = 150
/** How far the strip boundaries bow at the hardest pull. */
const MAX_BEND = 34
const PULL_RESIST = 0.35
/** Underdamped on purpose: one visible bounce, then settle. */
const SPRING_STIFFNESS = 220
const SPRING_DAMPING = 15
/** ms without input before the spring takes over. */
const RELEASE_DELAY = 90
/**
 * Wheel deltas smaller than this do not count as the user still holding
 * the pull. Trackpads and free-spinning wheels emit a long decaying tail
 * of momentum events after the fingers let go; without the floor, that
 * tail kept resetting the release timer and the band hung stretched for
 * a second before snapping back.
 */
const HOLD_THRESHOLD = 8

/** Path for strip `index` of a band `height` tall bowed by `bend`. */
function stripPath(index: number, height: number, bend: number, width: number) {
  const yTop = (index / BAR_COUNT) * height
  const yBottom = ((index + 1) / BAR_COUNT) * height
  const liftTop = bend * (1 - index / BAR_COUNT)
  const liftBottom = bend * (1 - (index + 1) / BAR_COUNT)
  const mid = width / 2
  return (
    `M0 ${yTop} Q ${mid} ${yTop - liftTop} ${width} ${yTop} ` +
    `L ${width} ${yBottom} Q ${mid} ${yBottom - liftBottom} 0 ${yBottom} Z`
  )
}

export function OverscrollBand() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const page = document.querySelector<HTMLElement>("[data-overscroll-page]")
    if (!svg || !page) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const paths = Array.from(svg.querySelectorAll("path"))
    let pull = 0
    let velocity = 0
    let lastInput = 0
    let lastFrame = 0
    let frame = 0
    let touchY: number | null = null

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1

    /** Flat rest state: the static fallback the effect started from. */
    const settle = () => {
      page.style.transform = ""
      page.style.willChange = ""
      svg.setAttribute("height", String(REST_HEIGHT))
      svg.setAttribute("viewBox", `0 0 100 ${REST_HEIGHT}`)
      paths.forEach((path, i) =>
        path.setAttribute("d", stripPath(i, REST_HEIGHT, 0, 100))
      )
      frame = 0
    }

    const draw = () => {
      const gap = Math.max(0, pull)
      const width = svg.clientWidth || window.innerWidth
      page.style.transform = `translateY(${-pull}px)`
      svg.setAttribute("height", String(Math.max(gap, 1)))
      svg.setAttribute("viewBox", `0 0 ${width} ${Math.max(gap, 1)}`)
      const bend = (gap / MAX_GAP) * MAX_BEND
      paths.forEach((path, i) =>
        path.setAttribute("d", stripPath(i, gap, bend, width))
      )
    }

    const tick = (now: number) => {
      /* Integrate by wall-clock time in small substeps, so the spring
         settles at the same real-world speed whether frames arrive at
         120Hz or a throttled trickle. The cap bounds the jump a
         throttled tab can make in one frame to well under a half
         oscillation, so sparse frames show a decaying bounce rather
         than teleporting across it. */
      let elapsed = Math.min((now - lastFrame) / 1000, 0.1)
      lastFrame = now
      if (now - lastInput > RELEASE_DELAY) {
        while (elapsed > 0) {
          const dt = Math.min(elapsed, 1 / 120)
          velocity +=
            (-SPRING_STIFFNESS * pull - SPRING_DAMPING * velocity) * dt
          pull += velocity * dt
          elapsed -= dt
        }
        if (Math.abs(pull) < 0.5 && Math.abs(velocity) < 8) {
          settle()
          return
        }
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (frame) return
      lastFrame = performance.now()
      page.style.willChange = "transform"
      frame = requestAnimationFrame(tick)
    }

    const feed = (delta: number) => {
      if (!atBottom()) return
      if (delta <= 0 && pull <= 0) return
      /* Resistance rises with the pull; a floor keeps releases (negative
         delta) responsive even at full stretch. */
      const resist = Math.max(1 - pull / MAX_GAP, 0.15)
      const next = Math.min(
        Math.max(pull + delta * PULL_RESIST * resist, 0),
        MAX_GAP
      )
      /* Only input that is strong enough AND still moving the band keeps
         the hold alive. Momentum tails fall under the threshold, and
         cranking against the limit changes nothing, so both let the
         spring take over instead of pinning the stretch. */
      if (Math.abs(delta) >= HOLD_THRESHOLD && next !== pull) {
        lastInput = performance.now()
        velocity = 0
      }
      pull = next
      startLoop()
    }

    const onWheel = (event: WheelEvent) => feed(event.deltaY)
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY
    }
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null) return
      feed(touchY - event.touches[0].clientY)
      touchY = event.touches[0].clientY
    }
    /* Fingers off means release, immediately: touchcancel included, or a
       cancelled gesture would leave the band hanging with no way back. */
    const onTouchEnd = () => {
      touchY = null
      lastInput = 0
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
      page.style.transform = ""
      page.style.willChange = ""
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10"
    >
      {/* Server-rendered flat: viewBox width 100 with no aspect lock
          stretches to any viewport before JS measures the real width. */}
      <svg
        ref={svgRef}
        className="block w-full"
        height={REST_HEIGHT}
        viewBox={`0 0 100 ${REST_HEIGHT}`}
        preserveAspectRatio="none"
      >
        {PALETTE_FILLS.map((fill, index) => (
          <path
            key={fill}
            fill={fill}
            d={stripPath(index, REST_HEIGHT, 0, 100)}
          />
        ))}
      </svg>
    </div>
  )
}
