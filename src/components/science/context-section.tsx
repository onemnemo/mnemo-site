"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import styles from "./context-section.module.css"

type ContextSectionProps = {
  href?: string
  className?: string
}

// Gill filament path reused by both branches.
const FOLDS = `q3 -18 6 0${" t6 0".repeat(11)}`

// Circulation paths.
const RETURN_TRUNK = "M176 196 L166 196"
const OUTER_BRANCH = "M166 196 L116 196 A76 76 0 0 1 116 44 L150 44"
const INNER_BRANCH = "M166 196 C141 196 141 172 116 172 A52 52 0 0 1 116 68 L150 68"
const OUTER_GILL = `M150 44 ${FOLDS}`
const INNER_GILL = `M150 68 ${FOLDS}`
const OUTER_AFTER = "M222 44 L252 44"
const INNER_AFTER = "M222 68 C238 68 238 44 252 44"
const MAIN_VESSEL = "M250 44 L284 44 A76 76 0 0 1 284 196 L256 196"
const CAPILLARIES =
  "M256 196H176M256 196C236 177 196 177 176 196M256 196C240 187 192 187 176 196M256 196C236 215 196 215 176 196M256 196C240 205 192 205 176 196"

// Flow paths use matched path lengths so the moving dots stay in sync.
const FLOW_SHARED = "M252 44 L284 44 A76 76 0 0 1 284 196 L166 196"
const FLOW_OUTER = `${OUTER_BRANCH} ${FOLDS} L252 44`
const FLOW_INNER = `${INNER_BRANCH} ${FOLDS} C238 68 238 44 252 44`

// Reused pump shape for the two branchial hearts and the systemic heart.
function Heart({ x, y, angle, scale = 1, delay = 0 }: { x: number; y: number; angle: number; scale?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <g className={styles.squeeze} style={{ animationDelay: `${delay}s` }}>
        <rect x="-18" y="-11" width="36" height="22" rx="10" className={styles.heartHalo} />
        <rect x="-18" y="-11" width="36" height="22" rx="10" className={styles.heart} />
        <path d="M-9.5 -5.2v10.8M-3.8 -6.6v12.6M2.6 -6v13.2M9.2 -5.6v9.6" className={styles.heartFolds} />
      </g>
    </g>
  )
}

export function ContextSection({ href = "/#mindmaps", className }: ContextSectionProps) {
  const [showExtra, setShowExtra] = useState(false)
  const titleId = useId()
  const extraId = useId()
  const takeUpGradientId = useId()
  const giveUpGradientId = useId()

  return (
    <section className={`${styles.section} ${className ?? ""}`} aria-labelledby={titleId}>
      <div className={styles.copy}>
        <h2 id={titleId} className={styles.title}>A fact is better<br />with a little context.</h2>
        <p>An octopus has three hearts. Two sit beside the gills and move blood through them. The third takes the oxygenated blood and sends it around the body.</p>
        <p>The number is easier to remember once it has a reason behind it. You are not just memorising “three”. You are remembering the circulation.</p>

        <div className={`${styles.extra} ${showExtra ? styles.isOpen : ""}`}>
          <button
            type="button"
            className={styles.extraToggle}
            aria-expanded={showExtra}
            aria-controls={extraId}
            onClick={() => setShowExtra((open) => !open)}
          >
            <span className={styles.extraLabel}>Did you know?</span>
            <span className={styles.extraIcon} aria-hidden>{showExtra ? "−" : "+"}</span>
          </button>
          <div id={extraId} className={styles.extraPanel} aria-hidden={!showExtra}>
            <div className={styles.extraInner}>
              <p>Your heart actually does almost the same job as all three octopus hearts. The right side pumps blood through the lungs, while the left side pumps it around the body. In a way, two pumping circuits are housed in one organ.</p>
              <p>An octopus splits that work apart, with one heart for each gill and another for the rest of the body. Same circulation problem, completely different anatomy.</p>
            </div>
          </div>
        </div>

        <Link className={styles.link} href={href}>See how mind maps work <ArrowUpRight size={17} aria-hidden /></Link>
      </div>

      <figure className={styles.panel}>
        <div className={styles.plateHeading}>
          <h3>Why three hearts?</h3>
          <div className={styles.legends} aria-hidden>
            <span className={styles.legend}><i className={styles.legendRich} />oxygen-rich</span>
            <span className={styles.legend}><i className={styles.legendPoor} />oxygen-poor</span>
          </div>
        </div>

        <svg
          className={styles.plate}
          viewBox="26 6 360 232"
          role="img"
          aria-label="Blood returning from the body splits into two branches. Each branch has its own heart, which pumps the blood through one gill. The branches then merge, and a third, larger heart sends the oxygen-rich blood around the body."
        >
          <defs>
            <linearGradient id={takeUpGradientId} gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="222" y2="0">
              <stop offset="0" className={styles.stopPoor} />
              <stop offset="1" className={styles.stopRich} />
            </linearGradient>
            <linearGradient id={giveUpGradientId} gradientUnits="userSpaceOnUse" x1="256" y1="0" x2="176" y2="0">
              <stop offset="0" className={styles.stopRich} />
              <stop offset="1" className={styles.stopPoor} />
            </linearGradient>
          </defs>

          {/* Oxygen-poor vessels */}
          <path d={RETURN_TRUNK} className={`${styles.vessel} ${styles.vesselPoor} ${styles.vesselTrunk}`} />
          <path d={OUTER_BRANCH} className={`${styles.vessel} ${styles.vesselPoor}`} />
          <path d={INNER_BRANCH} className={`${styles.vessel} ${styles.vesselPoor}`} />

          {/* Gills */}
          <path d={OUTER_GILL} className={styles.gill} stroke={`url(#${takeUpGradientId})`} />
          <path d={INNER_GILL} className={styles.gill} stroke={`url(#${takeUpGradientId})`} />

          {/* Oxygen-rich vessels */}
          <path d={OUTER_AFTER} className={`${styles.vessel} ${styles.vesselRich}`} />
          <path d={INNER_AFTER} className={`${styles.vessel} ${styles.vesselRich}`} />
          <path d={MAIN_VESSEL} className={`${styles.vessel} ${styles.vesselMain}`} />

          {/* Body capillaries */}
          <path d={CAPILLARIES} className={styles.capillaries} stroke={`url(#${giveUpGradientId})`} />

          {/* Static direction markers for reduced motion */}
          <g className={styles.still}>
            <path d="M268 38.6 L280 44 L268 49.4Z" className={`${styles.arrow} ${styles.arrowRich}`} />
            <path d="M278 190.6 L266 196 L278 201.4Z" className={`${styles.arrow} ${styles.arrowRich}`} />
            <path d="M142 192.4 L133 196 L142 199.6Z" className={`${styles.arrow} ${styles.arrowPoor}`} />
          </g>

          {/* Animated flow */}
          <path d={FLOW_SHARED} pathLength={380} className={`${styles.flow} ${styles.flowMain}`} />
          <path d={FLOW_OUTER} pathLength={580} className={styles.flow} />
          <path d={FLOW_INNER} pathLength={520} className={styles.flow} />

          {/* Hearts */}
          <Heart x={47.1} y={152.1} angle={245} scale={0.84} />
          <Heart x={68.9} y={98} angle={295} scale={0.84} />
          <Heart x={355.4} y={146} angle={110} scale={1.18} delay={0.45} />

          {/* Labels */}
          <path d="M87 121 L79 107 M87 127 L59 144" className={styles.leader} />
          <text x="90" y="131" className={styles.count}>2 branchial hearts</text>
          <text x="90" y="146" className={styles.role}>one beside each gill</text>

          <path d="M331 143 L339 144" className={styles.leader} />
          <text x="328" y="143" className={`${styles.count} ${styles.end}`}>systemic heart</text>
          <text x="328" y="158" className={`${styles.role} ${styles.end}`}>to the body</text>

          {/* Anatomy annotations */}
          <path d="M150 30 v-4 h72 v4" className={styles.leader} />
          <text x="186" y="19" className={styles.anno}>GILLS</text>

          <path d="M176 216 v4 h80 v-4" className={styles.leader} />
          <text x="216" y="233" className={styles.anno}>BODY</text>

        </svg>
      </figure>
    </section>
  )
}
