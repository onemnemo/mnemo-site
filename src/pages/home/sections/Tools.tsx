import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { Field } from '../../../components/Field'
import { Reveal } from '../../../components/Reveal'
import { Shot } from '../../../components/Shot'
import { shot } from '../../../lib/assets'
import { TOOL_TABS, TOOL_TAB_MS } from '../../../content/home'
import { useInView } from '../../../hooks/useInView'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/** Five parts of Mnemo, one at a time; the tabs advance by themselves while on screen. */
export function Tools() {
  const reduce = useReducedMotion()
  const grid = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [hover, setHover] = useState(false)
  const [current, setCurrent] = useState(0)
  // Bumped on every selection, and on coming back into view or out of hover, so the
  // progress bar restarts.
  const [cycle, setCycle] = useState(0)
  const restart = () => setCycle((c) => c + 1)
  const inView = useInView(grid, { threshold: 0.35, onChange: (v) => v && restart() })
  const running = inView && !hover && !reduce

  const select = useCallback((i: number, fromUser = false) => {
    setCurrent(i)
    setCycle((c) => c + 1)
    if (fromUser && matchMedia('(max-width:900px)').matches) {
      tabRefs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => select((current + 1) % TOOL_TABS.length), TOOL_TAB_MS)
    return () => clearTimeout(t)
  }, [running, current, cycle, select])

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const step =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? -1
          : 0
    if (!step) return
    e.preventDefault()
    const n = (i + step + TOOL_TABS.length) % TOOL_TABS.length
    tabRefs.current[n]?.focus()
    select(n, true)
  }

  return (
    <section
      className={running ? 'tools' : 'tools paused'}
      id="tools"
      style={{ '--dur': `${TOOL_TAB_MS / 1000}s` } as CSSProperties}
    >
      <div className="wrap">
        <div className="head">
          <Reveal as="h2" className="h2">
            Write, map and practise
            <br />
            in one place.
          </Reveal>
        </div>
        <div
          className="grid"
          ref={grid}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false)
            restart()
          }}
        >
          <div className="tablist">
            <div className="tabs" role="tablist" aria-label="Parts of Mnemo">
              {TOOL_TABS.map((t, i) => {
                const on = i === current
                return (
                  <button
                    key={t.title}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    className={on ? 'tab on' : 'tab'}
                    role="tab"
                    id={`tt${i}`}
                    aria-controls="tools-stage"
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i, true)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                  >
                    <b>{t.title}</b>
                    <span className="more">
                      <i>{t.body}</i>
                    </span>
                    <em className="bar" key={on ? cycle : undefined} />
                  </button>
                )
              })}
            </div>
          </div>
          <div className="stage" id="tools-stage" role="tabpanel" aria-labelledby={`tt${current}`}>
            {TOOL_TABS.map((t, i) => (
              <Field
                key={t.title}
                name={t.field}
                seed={i + 3}
                className={i === current ? 'on' : undefined}
              />
            ))}
            {TOOL_TABS.map((t, i) => (
              <div
                key={t.title}
                className={i === current ? 'pane on' : 'pane'}
                aria-hidden={i !== current}
              >
                <div className="win">
                  <Shot light={shot(t.light)} dark={shot(t.dark)} alt={t.alt} lazy={i > 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="list">
          {TOOL_TABS.map((t, i) => (
            <article className="item" key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className="art">
                <Field name={t.field} seed={i + 3} />
                <div className="win">
                  <Shot light={shot(t.light)} dark={shot(t.dark)} alt={t.alt} lazy />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
