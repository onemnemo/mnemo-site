import { useRef } from 'react'
import { Field } from '../../../components/Field'
import { Reveal } from '../../../components/Reveal'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { clamp, useScrollFrame } from '../../../hooks/useScrollFrame'

const PLANNED = [
  {
    title: 'Extensions',
    body: 'Themes, language packs and study tools made by others. Planned for a later release.',
    field: 'silk-sunset',
    seed: 31,
    img: '/assets/ext-modal.webp',
    alt: 'A design for the planned Extensions page.',
  },
  {
    title: 'Sync',
    body: "Free starter tier and cheap upgrades in 0.9, or self-host it and we'll walk you through setup.",
    field: 'silk-sky',
    seed: 44,
    img: '/assets/sync-modal.webp',
    alt: 'A design for the planned Sync page, with a laptop, a tablet and a phone, and switches for notes and flashcards.',
  },
] as const

/** What comes next: roadmap cards whose windows settle as they scroll up. */
export function Next() {
  const reduce = useReducedMotion()
  const duo = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    const vh = innerHeight
    duo.current?.querySelectorAll<HTMLElement>('.soft').forEach((card) => {
      const win = card.querySelector<HTMLElement>('.win')
      if (!win) return
      const t = clamp((vh - card.getBoundingClientRect().top) / (vh * 0.7))
      win.style.transform = `translateY(${(40 * (1 - t)).toFixed(1)}px)`
    })
  }, !reduce)

  return (
    <section className="next" id="next">
      <div className="wrap">
        <Reveal as="h2" className="h2">
          What comes next.
        </Reveal>
        <div className="duo" ref={duo}>
          {PLANNED.map((p, i) => (
            <Reveal as="article" className="soft" key={p.title} delay={i ? 0.08 : undefined}>
              <div className="txt">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
              <div className="art">
                <Field name={p.field} seed={p.seed} />
                <div className="win">
                  <img src={p.img} width={1020} height={660} alt={p.alt} loading="lazy" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
