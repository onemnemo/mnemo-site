import { useRef } from 'react'
import { Icon } from '../../../components/Icon'
import { Shot } from '../../../components/Shot'
import { shot } from '../../../lib/assets'
import { SmartLink } from '../../../components/SmartLink'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { clamp, useScrollFrame } from '../../../hooks/useScrollFrame'
import { GITHUB_URL } from '../../../lib/site'
import { HeroField } from './HeroField'

/** Hero copy, live field and the app window that tilts upright as you scroll. */
export function Hero({ onNavSolid }: { onNavSolid: (solid: boolean) => void }) {
  const reduce = useReducedMotion()
  const copy = useRef<HTMLDivElement>(null)
  const figure = useRef<HTMLElement>(null)
  const win = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useScrollFrame(() => {
    if (copy.current) onNavSolid(copy.current.getBoundingClientRect().bottom < 60)
    if (reduce || !figure.current || !win.current) return
    const vh = innerHeight
    const p = clamp((vh * 0.85 - figure.current.getBoundingClientRect().top) / (vh * 0.65))
    win.current.style.transform = `rotateX(${(8 * (1 - p)).toFixed(2)}deg) scale(${(0.94 + 0.06 * p).toFixed(4)})`
    // the field drifts down a little slower than the page
    if (canvas.current)
      canvas.current.style.transform = `translateY(${Math.min(scrollY * 0.18, 400).toFixed(1)}px)`
  })

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroField canvasRef={canvas} />
      <div className="wrap">
        <div className="copy" ref={copy}>
          <h1 id="hero-title">Remember what you study.</h1>
          <p className="sub">
            An open-source home for your notes, mind maps, and flashcards. Fast, offline-ready, and
            built without the clutter.
          </p>
          <div className="cta">
            <SmartLink className="pill pill-light" href="/download">
              <Icon name="dl" />
              Download for desktop
            </SmartLink>
            <a className="pill pill-dim" href={GITHUB_URL}>
              <Icon name="gh" />
              View on GitHub
            </a>
          </div>
        </div>
        <figure className="shot" ref={figure}>
          <div className="win" ref={win}>
            <Shot
              light={shot('home-light')}
              dark={shot('home')}
              width={2820}
              height={1740}
              alt="Mnemo Home: 303 cards due today, a 23 day streak, 88 percent retention and a review forecast."
              priority
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
