"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react"

import { CirculationFigure } from "./circulation-figure"
import styles from "./context-section.module.css"

type ContextSectionProps = {
  href?: string
  className?: string
}

/**
 * The section teaches first, then translates. The figure starts as the
 * circulation; the CTA reorganises it into a mind map in place, and only
 * then becomes the link into the product story.
 */
export function ContextSection({ href = "/#mindmaps", className }: ContextSectionProps) {
  const [showExtra, setShowExtra] = useState(false)
  const [mapped, setMapped] = useState(false)
  const [armed, setArmed] = useState(false)
  const titleId = useId()
  const extraId = useId()
  const openLink = useRef<HTMLAnchorElement>(null)

  // The transform button unmounts when it succeeds; keep keyboard focus on its successor.
  useEffect(() => {
    if (mapped) openLink.current?.focus({ preventScroll: true })
  }, [mapped])

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
              <p>Your heart actually does almost the same job as all three octopus hearts. The right side pumps blood through the lungs, while the left side pumps it around the body. In a way, us humans have two hearts merged into one. Isn’t that cool?</p>
              <p>An octopus splits that work apart, with one heart for each gill and another for the rest of the body. Same circulation problem, but a completely different anatomy.</p>
            </div>
          </div>
        </div>

        {mapped ? (
          <div className={styles.actions}>
            <Link ref={openLink} className={styles.link} href={href}>Open mind maps <ArrowUpRight size={17} aria-hidden /></Link>
            <button type="button" className={styles.back} onClick={() => setMapped(false)}>
              <RotateCcw size={14} aria-hidden /> Back to circulation
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.link}
            onClick={() => { setArmed(false); setMapped(true) }}
            onMouseEnter={() => setArmed(true)}
            onMouseLeave={() => setArmed(false)}
            onFocus={() => setArmed(true)}
            onBlur={() => setArmed(false)}
          >
            See how this becomes a mind map <ArrowRight size={17} aria-hidden />
          </button>
        )}
      </div>

      <CirculationFigure mapped={mapped} armed={armed} />
    </section>
  )
}
