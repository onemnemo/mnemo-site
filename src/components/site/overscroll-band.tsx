"use client"

import { useEffect, useRef } from "react"

/**
 * Elastic overscroll past the bottom of the page: keep scrolling at the
 * end and the palette band grows out of the edge, its bars stretching
 * and bending under the pull; ease off and it settles back, with a
 * bounce when the release is sharp. Native rubber-banding only exists
 * for trackpads and touch, so the effect is driven from wheel and touch
 * input directly and works with a plain mouse wheel.
 *
 * The pull is modeled as pressure rather than as held position. Input at
 * the bottom feeds an accumulator that time drains exponentially; the
 * band's target height saturates against that pressure, and an
 * underdamped spring chases the target. That shape is what survives
 * momentum scrolling, where events keep arriving long after the user has
 * let go: a decaying tail tops the accumulator up by less than time
 * drains, so the band eases down while the tail is still coming, while a
 * hard stop drains pressure within a few hundred ms and the spring
 * overshoots into the bounce. Sustained cranking holds both.
 *
 * The page wrapper (tagged data-overscroll-page in layout.tsx) is
 * translated up by the pull, opening a gap the fixed band fills exactly.
 * The band is an SVG redrawn each frame: five strips whose shared
 * boundaries bow upward in the middle, upper boundaries most, so the
 * stack reads as stretching under tension. Physics integrates by
 * wall-clock time in fixed substeps, so it behaves the same at 120Hz and
 * on a throttled tab. None of it touches React state, so nothing
 * re-renders per frame.
 *
 * At rest the SVG holds a flat 120px band, which is what platforms with
 * native elastic scrolling reveal before hydration, without JS, and
 * under prefers-reduced-motion, where none of the listeners attach.
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
/** Seconds for pressure to drain to 1/e. Small = eager snap-back. */
const PRESSURE_DECAY = 0.08
/** Pressure at which the stretch reaches ~63% of MAX_GAP. */
const PRESSURE_SCALE = 260
/** Underdamped (damping ratio ~0.53), so a sharp release shows one
    bounce. Raising both together keeps the ratio and only makes the
    spring chase faster. */
const SPRING_STIFFNESS = 320
const SPRING_DAMPING = 19

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
    let pressure = 0
    let pull = 0
    let velocity = 0
    let lastFrame = 0
    let frame = 0
    let touchY: number | null = null

    const atBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1

    /** Return to the flat band the server renders. */
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
      /* Wall-clock substeps; the cap bounds one frame's catch-up on a
         throttled tab to a fraction of an oscillation. */
      let elapsed = Math.min((now - lastFrame) / 1000, 0.1)
      lastFrame = now
      while (elapsed > 0) {
        const dt = Math.min(elapsed, 1 / 120)
        pressure *= Math.exp(-dt / PRESSURE_DECAY)
        const target = MAX_GAP * (1 - Math.exp(-pressure / PRESSURE_SCALE))
        velocity +=
          (SPRING_STIFFNESS * (target - pull) - SPRING_DAMPING * velocity) * dt
        pull += velocity * dt
        elapsed -= dt
      }
      if (pressure < 1 && Math.abs(pull) < 0.5 && Math.abs(velocity) < 8) {
        settle()
        return
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
      if (delta > 0) {
        /* One event can only add so much: a single violent notch reads
           as a tug, not a teleport to full stretch. */
        pressure += Math.min(delta, 400)
      } else if (pressure > 0) {
        /* Scrolling back up vents pressure immediately and then some,
           so reversing direction lets the band go at once. */
        pressure = Math.max(pressure + delta * 3, 0)
      } else {
        return
      }
      startLoop()
    }

    const onWheel = (event: WheelEvent) => {
      /* deltaMode 1 is lines (Firefox with a plain wheel); normalize to
         roughly px so a notch feels the same everywhere. */
      const scale = event.deltaMode === 1 ? 33 : 1
      feed(event.deltaY * scale)
    }
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY
    }
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null) return
      /* Drag speed feeds the same pressure model; lifting the finger
         just stops feeding it. */
      feed((touchY - event.touches[0].clientY) * 4)
      touchY = event.touches[0].clientY
    }
    const onTouchEnd = () => {
      touchY = null
    }
    /* A hidden tab gets throttled frames, so a mid-stretch tab switch
       would crawl through its close in slow motion on return. Nobody
       sees a hidden page, so reset it outright. */
    const onVisibility = () => {
      if (document.visibilityState !== "hidden") return
      cancelAnimationFrame(frame)
      pressure = 0
      pull = 0
      velocity = 0
      settle()
    }

    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("visibilitychange", onVisibility)
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
