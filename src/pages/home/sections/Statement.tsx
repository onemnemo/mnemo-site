import { useRef } from 'react'
import { STATEMENT_LINES } from '../../../content/home'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { clamp, useScrollFrame } from '../../../hooks/useScrollFrame'

/** Four lines that come into focus one after another as you scroll. */
export function Statement() {
  const reduce = useReducedMotion()
  const lines = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    const vh = innerHeight
    lines.current?.querySelectorAll('p').forEach((l) => {
      const t = clamp((vh * 0.82 - l.getBoundingClientRect().top) / (vh * 0.3))
      l.style.opacity = (0.16 + 0.84 * t).toFixed(3)
      l.style.filter = t >= 1 ? 'none' : `blur(${(7 * (1 - t)).toFixed(2)}px)`
    })
  }, !reduce)

  return (
    <section className="statement" aria-label="What Mnemo is">
      <div className="wrap">
        <div className="lines" ref={lines}>
          {STATEMENT_LINES.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
