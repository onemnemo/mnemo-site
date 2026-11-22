import { useEffect, useRef } from 'react'
import { Reveal } from '../../../components/Reveal'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { startCurveDemo } from '../curve/curveDemo'

/** The dark panel with the forgetting curve played out. */
export function Curve() {
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const figure = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const day = useRef<HTMLElement>(null)
  const event = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!section.current || !figure.current || !canvas.current || !day.current || !event.current)
      return
    return startCurveDemo({
      root: figure.current,
      canvas: canvas.current,
      dayEl: day.current,
      eventEl: event.current,
      background: getComputedStyle(section.current).backgroundColor,
      reduce,
    })
  }, [reduce])

  return (
    <section className="panel curve" id="curve" ref={section}>
      <div className="wrap">
        <div className="head">
          <Reveal as="h2" className="h2">
            Built to beat the forgetting curve.
          </Reveal>
          <Reveal as="p" className="sub">
            Mnemo schedules reviews with FSRS, the same open algorithm behind Anki. Cards you know
            stretch out over months, tough ones come back sooner, and the timing adapts to how you
            actually remember.
          </Reveal>
        </div>
        <figure className="plot" id="demo" ref={figure}>
          <div className="plot-top">
            <div className="readout">
              <b ref={day}>Day 0</b>
              <span className="ev" ref={event}>
                First study
              </span>
            </div>
            <div className="legend">
              <span>
                <i />
                With reviews
              </span>
              <span className="dash">
                <i />
                Never reviewed
              </span>
            </div>
          </div>
          <div className="chart">
            <canvas
              ref={canvas}
              role="img"
              aria-label="Chance of recalling a card over time. Without reviews it falls away. With reviews it resets each time and falls more slowly after every review."
            />
          </div>
          <figcaption className="caption">
            <p>
              Your chance of recalling a card over time. Each review brings it back up, and it fades
              slower every round. Left alone, memories drop along the curve Ebbinghaus measured in
              1885.<sup>1</sup> This chart is a simplified view of the model FSRS fits to your own
              reviews.<sup>2</sup>
            </p>
            <ol>
              <li>
                Ebbinghaus, H. (1885). <i>Über das Gedächtnis.</i>
              </li>
              <li>
                Ye, J., Su, J. &amp; Cao, Y. (2022). A stochastic shortest path algorithm for
                optimizing spaced repetition scheduling. <i>KDD ’22.</i>
              </li>
            </ol>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
