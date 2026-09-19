"use client"

import { useEffect, useId, useRef } from "react"

import styles from "./circulation-figure.module.css"

/**
 * The octopus circulation as a page illustration, in two states.
 *
 * Circulation: the loop drawn straight onto the peach stage, large, with
 * the three pumps beating and the blood moving round. Mind map: the same
 * information reorganised into Mnemo's mind-map grammar, still on the same
 * stage with the same shapes. The section's CTA switches between them.
 *
 * The change is a morph, not a swap. Every path in the circulation has a
 * counterpart in the map with the same command structure, so the geometry
 * interpolates: the loop's arcs become branches, the gills flatten into
 * the upper branch, the body fades away, the labels move, the pumps
 * travel to their branches, and the centre node appears once everything
 * has settled. A requestAnimationFrame timeline writes to
 * the DOM directly so it runs the same in every browser; with reduced
 * motion it jumps to the end state.
 *
 * The JSX renders the circulation state, so the page is complete without
 * JS. The strokes pass through a light displacement filter for the same
 * slightly imperfect line as the page's other illustrations; labels sit
 * outside it so they stay crisp.
 */

type Nums = number[]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mix = (a: Nums, b: Nums, t: number) => a.map((v, i) => lerp(v, b[i], t))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const f = (v: number) => Math.round(v * 10) / 10

// Path templates: the same shape of command list in both states.
const loop = (n: Nums) => `M${f(n[0])} ${f(n[1])} C ${n.slice(2, 8).map(f).join(" ")} C ${n.slice(8, 14).map(f).join(" ")}`
const curve = (n: Nums) => `M${f(n[0])} ${f(n[1])} C ${n.slice(2, 8).map(f).join(" ")}`
const wave = (n: Nums) => {
  let d = `M${f(n[0])} ${f(n[1])} q${f(n[2])} ${f(n[3])} ${f(n[4])} ${f(n[5])}`
  for (let i = 6; i < n.length; i += 2) d += ` t${f(n[i])} ${f(n[i + 1])}`
  return d
}
const blob = (n: Nums) => {
  let d = `M${f(n[0])} ${f(n[1])}`
  for (let i = 2; i < n.length; i += 6) d += ` C ${n.slice(i, i + 6).map(f).join(" ")}`
  return d + " Z"
}

/* Circulation. Blood leaves the body along two branches, one pump and one
   gill each, then merges for the systemic pump and the run back to the body. */
const A_OUTER = [150, 202, 92, 204, 58, 170, 60, 122, 62, 78, 94, 44, 150, 44]
const A_INNER = [150, 202, 116, 202, 92, 176, 92, 132, 92, 96, 112, 66, 150, 66]
const A_RIGHT = [232, 44, 296, 40, 334, 76, 336, 122, 338, 166, 302, 204, 240, 202]
const A_INNER_AFTER = [230, 66, 236, 66, 236, 46, 242, 44]
const A_GILL_OUTER = [150, 44, 4, -14, 8, 0, ...Array(9).fill([8, 0]).flat()]
const A_GILL_INNER = [150, 66, 4, -14, 8, 0, ...Array(9).fill([8, 0]).flat()]
const A_BODY = [160, 190, 150, 176, 178, 170, 196, 174, 214, 168, 236, 178, 232, 194, 230, 212, 200, 216, 186, 212, 168, 214, 154, 206, 160, 190]
const OUTER_AFTER = "M230 44 L 234 44"

/* Mind map. Two branches leave the centre node and run on under their
   labels, each ending in a leaf. */
const B_UPPER = [152, 129, 184, 129, 176, 72, 208, 72, 244, 72, 280, 72, 316, 72]
const B_UPPER_LEAF = [316, 72, 328, 72, 326, 50, 338, 50, 344, 50, 350, 50, 356, 50]
const B_LOWER = [152, 129, 184, 129, 176, 186, 208, 186, 244, 186, 280, 186, 316, 186]
const B_LOWER_LEAF = [316, 186, 330, 186, 326, 208, 354, 208]
const B_GILL = [208, 72, 4, 0, 8, 0, ...Array(9).fill([8, 0]).flat()]
const B_BODY = A_BODY.map((v, i) => (i % 2 === 0 ? 196 + 0.35 * (v - 196) : 193 + 0.35 * (v - 193)))

type Pose = { x: number; y: number; angle: number; scale: number }
const PUMPS: { a: Pose; b: Pose; delay: number }[] = [
  { a: { x: 60, y: 122, angle: 90, scale: 0.95 }, b: { x: 214, y: 72, angle: 0, scale: 0.56 }, delay: 0 },
  { a: { x: 92, y: 112, angle: 84, scale: 0.95 }, b: { x: 236, y: 72, angle: 0, scale: 0.56 }, delay: 0 },
  { a: { x: 336, y: 122, angle: 90, scale: 1.3 }, b: { x: 220, y: 186, angle: 0, scale: 0.78 }, delay: 0.45 },
]
const pose = (p: Pose) => `translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.angle)}) scale(${f(p.scale)})`

type Spot = { x: number; y: number }
const LABELS: { text: string; cls: "anno" | "label" | "sub"; a: Spot; b: Spot }[] = [
  { text: "gills", cls: "anno", a: { x: 190, y: 27 }, b: { x: 347, y: 45 } },
  { text: "body", cls: "anno", a: { x: 196, y: 234 }, b: { x: 347, y: 222 } },
  { text: "2 branchial hearts", cls: "label", a: { x: 142, y: 116 }, b: { x: 282, y: 67 } },
  { text: "one beside each gill", cls: "sub", a: { x: 142, y: 128 }, b: { x: 282, y: 82 } },
  { text: "1 systemic heart", cls: "label", a: { x: 284, y: 116 }, b: { x: 282, y: 181 } },
  { text: "to the rest of the body", cls: "sub", a: { x: 284, y: 128 }, b: { x: 282, y: 196 } },
]

const DURATION = 1500

/** Progress of one beat of the timeline, eased, given its window in the whole. */
const beat = (p: number, from: number, to: number) => ease(clamp((p - from) / (to - from), 0, 1))

const FLOW_A = {
  right: loop(A_RIGHT),
  outer: `${loop(A_OUTER)} ${wave(A_GILL_OUTER).slice(wave(A_GILL_OUTER).indexOf("q"))} L 240 44`,
  inner: `${loop(A_INNER)} ${wave(A_GILL_INNER).slice(wave(A_GILL_INNER).indexOf("q"))} C 236 66 236 46 242 44`,
}

type Props = {
  /** Show the fact as a mind map; false shows the circulation. */
  mapped: boolean
  /** The CTA is hovered or focused: a small readiness cue in the graphic. */
  armed?: boolean
}

export function CirculationFigure({ mapped, armed = false }: Props) {
  const roughId = useId()
  const takeUpId = useId()

  const root = useRef<SVGSVGElement>(null)
  const progress = useRef(0)

  useEffect(() => {
    const svg = root.current
    if (!svg) return
    const q = <T extends Element>(name: string) => svg.querySelector<T>(`[data-part="${name}"]`)
    const all = <T extends Element>(name: string) => Array.from(svg.querySelectorAll<T>(`[data-part="${name}"]`))

    const outer = q<SVGPathElement>("outer")
    const inner = q<SVGPathElement>("inner")
    const right = q<SVGPathElement>("right")
    const innerAfter = q<SVGPathElement>("innerAfter")
    const outerAfter = q<SVGPathElement>("outerAfter")
    const gills = all<SVGPathElement>("gill")
    const body = q<SVGPathElement>("body")
    const flowA = q<SVGGElement>("flowA")
    const flowB = q<SVGGElement>("flowB")
    const still = q<SVGGElement>("still")
    const pumps = all<SVGGElement>("pump")
    const labels = all<SVGTextElement>("label")
    const node = q<SVGGElement>("node")
    if (!outer || !inner || !right || !innerAfter || !outerAfter || !body || !flowA || !flowB || !still || !node) return

    const apply = (p: number) => {
      // Vessels become branches; the gills flatten into the upper branch; the body fades away.
      const t = beat(p, 0, 0.72)
      outer.setAttribute("d", loop(mix(A_OUTER, B_UPPER, t)))
      inner.setAttribute("d", loop(mix(A_INNER, B_UPPER_LEAF, t)))
      right.setAttribute("d", loop(mix(A_RIGHT, B_LOWER, t)))
      innerAfter.setAttribute("d", curve(mix(A_INNER_AFTER, B_LOWER_LEAF, t)))
      right.style.strokeWidth = `${f(lerp(6, 4.2, t))}`
      inner.style.strokeWidth = `${f(lerp(3.6, 2.6, t))}`
      innerAfter.style.strokeWidth = `${f(lerp(3.6, 2.6, t))}`
      outerAfter.style.opacity = `${1 - beat(p, 0, 0.3)}`
      const g = beat(p, 0, 0.6)
      gills[0]?.setAttribute("d", wave(mix(A_GILL_OUTER, B_GILL, g)))
      gills[1]?.setAttribute("d", wave(mix(A_GILL_INNER, B_GILL, g)))
      for (const gill of gills) gill.style.opacity = `${1 - beat(p, 0.35, 0.65)}`
      body.setAttribute("d", blob(mix(A_BODY, B_BODY, beat(p, 0, 0.55))))
      body.style.opacity = `${1 - beat(p, 0.15, 0.5)}`

      // Labels settle into the new structure first, so the pumps arrive beside them.
      labels.forEach((label, i) => {
        const { a, b } = LABELS[i]
        const k = beat(p, 0.05, 0.55)
        label.setAttribute("x", `${f(lerp(a.x, b.x, k))}`)
        label.setAttribute("y", `${f(lerp(a.y, b.y, k))}`)
      })

      // Pumps travel to their branches, one after another.
      pumps.forEach((pump, i) => {
        const { a, b } = PUMPS[i]
        const k = beat(p, 0.18 + i * 0.05, 0.82 + i * 0.05)
        pump.setAttribute("transform", pose({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), angle: lerp(a.angle, b.angle, k), scale: lerp(a.scale, b.scale, k) }))
      })

      // The moving blood hands over, and the centre node anchors the map last.
      flowA.style.opacity = `${1 - beat(p, 0, 0.2)}`
      still.style.opacity = `${1 - beat(p, 0, 0.3)}`
      flowB.style.opacity = `${0.75 * beat(p, 0.8, 1)}`
      const n = beat(p, 0.78, 1)
      node.style.opacity = `${n}`
      node.setAttribute("transform", `translate(100 129) scale(${f(0.85 + 0.15 * n)}) translate(-100 -129)`)
    }

    const target = mapped ? 1 : 0
    const from = progress.current
    if (from === target) { apply(target); return }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.current = target
      apply(target)
      return
    }

    const duration = DURATION * Math.abs(target - from)
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const k = Math.min(1, (now - started) / duration)
      progress.current = lerp(from, target, k)
      apply(progress.current)
      if (k < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [mapped])

  return (
    <figure className={`${styles.stage} ${mapped ? styles.isMap : styles.isLoop} ${armed ? styles.armed : ""}`}>
      {/* Soft ground along the bottom of the stage */}
      <svg className={styles.ground} viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden>
        <path d="M0 50 Q110 24 215 60 T420 56 T600 34 V120 H0Z" className={styles.groundFar} />
        <path d="M0 78 Q120 100 250 76 T460 72 T600 92 V120 H0Z" className={styles.groundNear} />
      </svg>

      <svg
        ref={root}
        className={styles.art}
        viewBox="40 14 318 228"
        role="img"
        aria-label={mapped
          ? "The same fact as a mind map. Octopus in the centre. One branch: two branchial hearts, one beside each gill. Another branch: one systemic heart, to the rest of the body."
          : "A loop of blood. It leaves the body along two branches, passes a small pump beside each gill, and a larger pump on the far side sends it back to the body."}
      >
        <defs>
          <filter id={roughId} x="-4%" y="-6%" width="108%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <linearGradient id={takeUpId} gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="230" y2="0">
            <stop offset="0" className={styles.stopPoor} />
            <stop offset="1" className={styles.stopRich} />
          </linearGradient>
        </defs>

        <g filter={`url(#${roughId})`}>
          {/* Vessels */}
          <path data-part="outer" d={loop(A_OUTER)} className={`${styles.pen} ${styles.poor}`} />
          <path data-part="inner" d={loop(A_INNER)} className={`${styles.pen} ${styles.poor}`} />
          <path data-part="gill" d={wave(A_GILL_OUTER)} className={`${styles.pen} ${styles.gill}`} stroke={`url(#${takeUpId})`} />
          <path data-part="gill" d={wave(A_GILL_INNER)} className={`${styles.pen} ${styles.gill}`} stroke={`url(#${takeUpId})`} />
          <path data-part="outerAfter" d={OUTER_AFTER} className={`${styles.pen} ${styles.rich}`} />
          <path data-part="innerAfter" d={curve(A_INNER_AFTER)} className={`${styles.pen} ${styles.rich}`} />
          <path data-part="right" d={loop(A_RIGHT)} className={`${styles.pen} ${styles.rich} ${styles.main}`} />

          {/* Direction cues for reduced motion */}
          <g data-part="still" className={styles.still}>
            <path d="M284 37 L293 44 L284 51" className={styles.arrow} />
            <path d="M117 195 L108 202 L117 209" className={styles.arrow} />
          </g>

          {/* Moving blood, round the loop and then out along the branches */}
          <g data-part="flowA">
            <path d={FLOW_A.right} pathLength={240} className={`${styles.flow} ${styles.flowMain}`} />
            <path d={FLOW_A.outer} pathLength={420} className={styles.flow} />
            <path d={FLOW_A.inner} pathLength={360} className={styles.flow} />
          </g>
          <g data-part="flowB" className={styles.flowMap} style={{ opacity: 0 }}>
            <path d={loop(B_UPPER)} pathLength={180} className={styles.flow} />
            <path d={loop(B_LOWER)} pathLength={180} className={styles.flow} style={{ animationDelay: ".45s" }} />
          </g>

          {/* Body */}
          <path data-part="body" d={blob(A_BODY)} className={styles.body} />

          {/* Pumps: the ribbed pump lies along its vessel like a bead; its fill hides the line beneath */}
          {PUMPS.map(({ a, delay }, i) => (
            <g key={i} data-part="pump" transform={pose(a)}>
              <g className={styles.squeeze} style={{ animationDelay: `${delay}s` }}>
                <rect x="-18" y="-11" width="36" height="22" rx="10" className={styles.pump} />
                <path d="M-9.5 -5.2v10.8M-3.8 -6.6v12.6M2.6 -6v13.2M9.2 -5.6v9.6" className={styles.pumpFolds} />
              </g>
            </g>
          ))}

        </g>

        {/* The centre node and labels sit outside the roughening so their type stays crisp */}
        <g data-part="node" className={styles.node} style={{ opacity: 0 }}>
          <rect x="48" y="116" width="104" height="26" rx="13" />
          <text x="100" y="133.5">Octopus</text>
        </g>
        {LABELS.map(({ text, cls, a }) => (
          <text key={text} data-part="label" x={a.x} y={a.y} className={styles[cls]}>{text}</text>
        ))}
      </svg>
    </figure>
  )
}
