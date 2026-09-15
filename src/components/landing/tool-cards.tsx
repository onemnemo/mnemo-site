"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, RotateCcw } from "lucide-react"

import styles from "./hero.module.css"

function CardLink({ href, number, children }: {
  href: string
  number: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={styles.cardLink}>
      <span className={styles.cardNumber} aria-hidden>{number}</span>
      <h2>{children}</h2>
      <ArrowDown className={styles.cardArrow} aria-hidden size={19} />
    </Link>
  )
}

export function RecallExample({ className = "" }: { className?: string }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      type="button"
      className={`${styles.recall} ${className}`}
      data-revealed={revealed}
      aria-pressed={revealed}
      aria-label={revealed ? "Show the flashcard question" : "Reveal the flashcard answer"}
      onClick={() => setRevealed(!revealed)}
    >
      <span className={styles.recallText} aria-live="polite">
        {revealed ? <>A bond formed by<br /><strong>sharing electrons.</strong></> : <>What is a<br /><strong>covalent bond?</strong></>}
      </span>
      <span className={styles.recallAction}>
        {revealed ? "Try again" : "Turn it over"}<RotateCcw size={15} aria-hidden />
      </span>
    </button>
  )
}

export function ConnectionExample({ className = "" }: { className?: string }) {
  return (
    <svg className={`${styles.connections} ${className}`} viewBox="0 0 260 230" role="img" aria-label="A mind map connects a question to what, how, and why">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M126 112 C126 70 48 85 48 47" />
        <path d="M148 119 C188 119 208 95 208 71" />
        <path d="M132 135 C132 158 137 160 137 185" />
      </g>
      <g fill="#fcf6ee" stroke="currentColor" strokeWidth="1.3">
        <rect x="13" y="20" width="70" height="35" rx="17.5" />
        <rect x="172" y="40" width="75" height="35" rx="17.5" />
        <rect x="97" y="181" width="80" height="35" rx="17.5" />
      </g>
      <rect x="70" y="98" width="120" height="45" rx="22.5" fill="currentColor" />
      <g textAnchor="middle" fontFamily="inherit" fontSize="14">
        <text x="48" y="42">What?</text>
        <text x="209" y="62">How?</text>
        <text x="137" y="203">Why?</text>
        <text x="130" y="126" fill="#fffaf5">A question</text>
      </g>
    </svg>
  )
}

export function ToolCards() {
  return (
    <div className={styles.cards}>
      <article className={`${styles.card} ${styles.notes}`}>
        <CardLink href="#notes" number="01">Notes</CardLink>
        <p>Somewhere to put<br />what’s on your mind.</p>
        <div className={styles.noteExample} aria-hidden>
          <span className={styles.noteTitle}>A thought worth keeping.</span>
          <p>You don’t have to know where an idea is going to write it down.</p>
          <span className={styles.noteHighlight}>Start here.</span>
          <span className={styles.caret} />
        </div>
      </article>
      <article className={`${styles.card} ${styles.flashcards}`}>
        <CardLink href="#flashcards" number="02">Flashcards</CardLink>
        <p>A little practice.<br />A longer memory.</p>
        <div className={styles.recallStack}><RecallExample /></div>
      </article>
      <article className={`${styles.card} ${styles.mindmaps}`}>
        <CardLink href="#mindmaps" number="03">Mind maps</CardLink>
        <p>Follow the connections.<br />See the whole picture.</p>
        <ConnectionExample />
      </article>
    </div>
  )
}
