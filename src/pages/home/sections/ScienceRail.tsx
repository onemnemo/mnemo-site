import { useCallback, useEffect, useRef, useState } from 'react'
import { Field } from '../../../components/Field'
import { Reveal } from '../../../components/Reveal'
import { SCIENCE_CARDS } from '../../../content/home'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/** A horizontal rail of science cards with previous and next arrows. */
export function ScienceRail() {
  const reduce = useReducedMotion()
  const rail = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const r = rail.current
    if (!r) return
    setAtStart(r.scrollLeft < 4)
    setAtEnd(r.scrollLeft + r.clientWidth >= r.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    addEventListener('resize', update)
    return () => removeEventListener('resize', update)
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const r = rail.current
    const card = r?.querySelector<HTMLElement>('.rc')
    if (!r || !card) return
    r.scrollBy({ left: (card.offsetWidth + 14) * 2 * dir, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="rail-sec" id="science" aria-labelledby="science-title">
      <div className="wrap rail-head">
        <Reveal as="h2" className="h2" id="science-title">
          Built on how the brain actually works.
        </Reveal>
        <div className="arrows">
          <button aria-label="Previous" disabled={atStart} onClick={() => scroll(-1)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button aria-label="Next" disabled={atEnd} onClick={() => scroll(1)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="rail" ref={rail} onScroll={update}>
        {SCIENCE_CARDS.map((c) => (
          <article className="rc" key={c.title}>
            <Field name={`silk-${c.field}`} seed={c.seed} />
            <div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </article>
        ))}
        <span style={{ flex: '0 0 1px' }} />
      </div>
    </section>
  )
}
