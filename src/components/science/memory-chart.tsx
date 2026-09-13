"use client"

import { useState } from "react"
import { RotateCcw, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { ForgettingCurve, SpacedCurve } from "./figures"
import styles from "./interactions.module.css"

export function MemoryChart() {
  const [spaced, setSpaced] = useState(true)
  const [replay, setReplay] = useState(0)

  return (
    <figure className={styles.chart}>
      <div className={styles.chartControls}>
        <div className={styles.switch} role="group" aria-label="Compare review patterns">
          <button type="button" aria-pressed={!spaced} aria-controls="memory-plot" onClick={() => setSpaced(false)}>Read once</button>
          <button type="button" aria-pressed={spaced} aria-controls="memory-plot" onClick={() => setSpaced(true)}>Come back to it</button>
        </div>
        <button className={styles.replay} type="button" onClick={() => setReplay(replay + 1)} aria-label="Replay the curve animation"><RotateCcw size={18} aria-hidden /></button>
      </div>
      <div className={styles.plotHeading}>
        <span>Easier to recall</span>
        <div className={styles.legends}>
          {spaced && <span className={styles.baselineLegend}><i aria-hidden />Read once</span>}
          <span className={styles.legend}><i aria-hidden />{spaced ? "With reviews" : "Without review"}</span>
        </div>
      </div>
      <div id="memory-plot" className={styles.plot}>
        <div className={styles.grid} aria-hidden />
        {spaced && <div className={styles.ghost}><ForgettingCurve /></div>}
        <Reveal key={`${spaced}-${replay}`} className={styles.curves}>
          {spaced ? <SpacedCurve /> : <ForgettingCurve />}
        </Reveal>
        {spaced && <div className={styles.reviewLabels} aria-hidden><span>Review</span><span>Review</span><span>Review</span></div>}
      </div>
      <div className={styles.axis}><span>Just learned</span><span>Time passes <ArrowRight size={16} aria-hidden /></span></div>
      <figcaption aria-live="polite" aria-atomic="true">
        <p>{spaced ? "Each review gives you another chance to recall it. Over time, you can leave more room between reviews." : "Without another encounter, something you’ve just learned can become harder to bring to mind."}</p>
        <small>An illustration of the pattern, not measured results. Everyone’s timing is different.</small>
      </figcaption>
    </figure>
  )
}
