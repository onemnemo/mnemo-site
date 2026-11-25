import { useEffect, useRef } from 'react'
import { Field } from '../../components/Field'
import { Icon } from '../../components/Icon'
import { PageShell } from '../../components/layout/PageShell'
import { Reveal } from '../../components/Reveal'
import { SmartLink } from '../../components/SmartLink'
import { useLatestRelease } from '../../hooks/useLatestRelease'
import { ISSUES_URL } from '../../lib/site'
import '../../styles/roadmap.css'
import { RELEASES } from './releases'

/** Fills the rail as the releases scroll past and lights each dot once the line reaches it. */
function useRail(road: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = road.current
    const bar = el?.querySelector<HTMLElement>('.rail i')
    if (!el || !bar) return
    const rels = [...el.querySelectorAll<HTMLElement>('.rel')]
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, (innerHeight * 0.55 - r.top) / r.height))
      bar.style.setProperty('--p', p.toFixed(4))
      const y = r.top + p * r.height
      rels.forEach((rel) => rel.classList.toggle('lit', rel.getBoundingClientRect().top + 40 <= y))
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    tick()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
    }
  }, [road])
}

export default function RoadmapPage() {
  const { version } = useLatestRelease()
  const road = useRef<HTMLDivElement>(null)
  useRail(road)

  return (
    <PageShell
      scope="p-roadmap"
      title="Roadmap | Mnemo"
      description="What is coming to Mnemo next: the 0.9 overhaul, a performance release, new features and a stable 1.0."
      nav={{ solid: true, current: 'roadmap', logoHref: '/', downloadHref: '/download' }}
    >
      <main>
        <section className="panel top" aria-labelledby="rm-title">
          <div className="wrap">
            <Reveal as="h1" className="h2" id="rm-title">
              Where Mnemo is going.
            </Reveal>
            <Reveal as="p" className="sub">
              Version <span>{version}</span> is out today. Here is what we are building next, in the
              order we plan to ship it. Plans can shift, and we will keep this page honest when they
              do.
            </Reveal>
          </div>
        </section>

        <section
          className="panel"
          aria-label="Planned releases"
          style={{ padding: 'clamp(48px,6vw,80px) 0' }}
        >
          <div className="wrap">
            <div className="road" ref={road}>
              <div className="rail" aria-hidden="true">
                <i />
              </div>
              {RELEASES.map((r) => (
                <Reveal
                  as="article"
                  className={r.now ? 'rel now' : 'rel'}
                  aria-labelledby={r.id}
                  key={r.id}
                >
                  <div className="art">
                    <Field name={r.field} seed={r.seed} />
                    <span className="ver" aria-hidden="true">
                      {r.version}
                    </span>
                  </div>
                  <div className="txt">
                    <h2 id={r.id}>{r.title}</h2>
                    <p>{r.body}</p>
                    <ul>
                      {r.items.map((item) => (
                        <li key={item}>
                          <Icon name={r.now ? 'check' : 'dot'} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="panel ask" aria-labelledby="ask-title">
          <div className="wrap">
            <Reveal className="in">
              <Field name="silk-rose" seed={88} />
              <div>
                <h2 className="h2" id="ask-title">
                  Help shape it.
                </h2>
                <p>
                  Missing something you need? Tell us on GitHub or Reddit. The roadmap moves with
                  what people ask for.
                </p>
              </div>
              <div className="acts">
                <a className="pill pill-light" href={ISSUES_URL}>
                  <Icon name="gh" />
                  Suggest a feature
                </a>
                <SmartLink className="pill pill-dim" href="/download">
                  <Icon name="dl" />
                  Download for desktop
                </SmartLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
