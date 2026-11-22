import { useState } from 'react'
import { Reveal } from '../../../components/Reveal'
import { FAQ } from '../../../content/home'
import { ISSUES_URL } from '../../../lib/site'

export function Faq() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set())
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(i)) next.add(i)
      return next
    })

  return (
    <section className="panel faq" id="faq">
      <div className="wrap split">
        <Reveal className="side">
          <h2 className="h2">Questions, answered.</h2>
          <p>
            Something missing? <a href={ISSUES_URL}>Ask on GitHub</a>.
          </p>
        </Reveal>
        <Reveal className="qas">
          {FAQ.map((item, i) => {
            const isOpen = open.has(i)
            return (
              <div className="qa" key={item.q} data-open={isOpen ? '' : undefined}>
                <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => toggle(i)}>
                  {item.q}
                  <span className="pm">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className="ans" id={`faq-${i}`}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
