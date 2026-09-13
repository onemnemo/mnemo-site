"use client"

import { useState } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"
import styles from "./interactions.module.css"

export function QuizCard() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className={styles.cardStack}>
      <div className={styles.quiz}>
        <p className={styles.prompt}>How many hearts does an octopus have?</p>
        <div id="recall-answer" className={styles.answer} aria-live="polite" aria-atomic="true">
          {revealed ? (
            <div>
              <strong>Three.</strong>
              <p>Two for the gills. One for the rest of the body.</p>
            </div>
          ) : <p>Try it without looking back.</p>}
        </div>
        <button type="button" onClick={() => setRevealed(!revealed)} aria-expanded={revealed} aria-controls="recall-answer">
          {revealed ? "Try recalling it again" : "Show the answer"}
          {revealed ? <RotateCcw size={17} aria-hidden /> : <ArrowRight size={18} aria-hidden />}
        </button>
      </div>
    </div>
  )
}
