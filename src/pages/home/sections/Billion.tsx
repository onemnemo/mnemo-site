import { useEffect, useRef, type ReactNode } from 'react'
import { Reveal } from '../../../components/Reveal'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { createEarthStrip } from '../../../lib/webgl/earthStrip'
import { WordReveal } from './WordReveal'

const VALUES: { title: string; body: string; icon: ReactNode; craft?: boolean }[] = [
  {
    title: 'Free',
    body: 'Every core feature is free, for everyone, with no ads.',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 12 8 12 8s2.5-5 4.5-5a2.5 2.5 0 0 1 0 5" />
      </>
    ),
  },
  {
    title: 'Works offline',
    body: '2.2 billion people have no internet. Mnemo never needs it.',
    icon: (
      <>
        <path d="M12 20h.01" />
        <path d="M8.5 16.43a5 5 0 0 1 7 0" />
        <path d="M5 12.86a10 10 0 0 1 5.17-2.69" />
        <path d="M19 12.86a10 10 0 0 0-2.01-1.53" />
        <path d="M2 8.82a15 15 0 0 1 4.18-2.65" />
        <path d="M22 8.82a15 15 0 0 0-11.29-3.76" />
        <path d="m2 2 20 20" />
      </>
    ),
  },
  {
    title: 'Open source',
    body: 'All of the code is on GitHub. Anyone can check it, translate it or help build it.',
    craft: true,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="m10 9-3 3 3 3" />
        <path d="m14 15 3-3-3-3" />
      </>
    ),
  },
]

/** Drives the planet strip: drift always, pointer parallax and sheen on fine pointers. */
function useEarthCards(
  row: React.RefObject<HTMLDivElement | null>,
  canvases: React.RefObject<(HTMLCanvasElement | null)[]>,
  craft: React.RefObject<HTMLImageElement | null>,
) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const rowEl = row.current
    const targets = canvases.current.filter((c): c is HTMLCanvasElement => !!c)
    if (!rowEl || targets.length !== 3) return
    const strip = createEarthStrip()
    if (!strip) return
    const animate = !reduce
    const hover = animate && matchMedia('(hover: hover) and (pointer: fine)').matches
    const firstCard = targets[0]?.parentElement
    if (!firstCard) return

    // While animating, the strip is capped at 1.5x so it stays light on laptops.
    let dpr = 1
    let ctxs: CanvasRenderingContext2D[] = []
    const draw = () => strip.draw(ctxs, 0.6 * dpr)
    const layout = () => {
      const r = firstCard.getBoundingClientRect()
      if (!r.width) return
      dpr = Math.min(devicePixelRatio || 1, animate ? 1.5 : 2)
      const gap = parseFloat(getComputedStyle(rowEl).columnGap) || 14
      const cw = Math.round(r.width * dpr)
      const ch = Math.round(r.height * dpr)
      strip.resize(cw, ch, Math.round(gap * dpr))
      ctxs = targets.flatMap((cv) => {
        cv.width = cw
        cv.height = ch
        const c = cv.getContext('2d')
        return c ? [c] : []
      })
      draw()
    }
    let pending = 0
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(pending)
      pending = requestAnimationFrame(layout)
    })
    ro.observe(rowEl)
    layout()

    const ptr = { x: 0, y: 0, nx: 0, ny: 0, on: 0 }
    const cur = { ...ptr }
    const onMove = (e: PointerEvent) => {
      const r0 = firstCard.getBoundingClientRect()
      const rr = rowEl.getBoundingClientRect()
      ptr.x = (e.clientX - r0.left) / r0.height
      ptr.y = (e.clientY - r0.top) / r0.height
      ptr.nx = ((e.clientX - rr.left) / rr.width) * 2 - 1
      ptr.ny = ((e.clientY - rr.top) / rr.height) * 2 - 1
      if (!cur.on) {
        cur.x = ptr.x
        cur.y = ptr.y
      }
      ptr.on = 1
    }
    const onLeave = () => {
      ptr.on = 0
      ptr.nx = 0
      ptr.ny = 0
    }
    if (hover) {
      rowEl.addEventListener('pointermove', onMove)
      rowEl.addEventListener('pointerleave', onLeave)
    }

    let onScreen = false
    let raf = 0
    let last = 0
    let clock = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = last ? Math.min(now - last, 100) : 16
      if (dt < 30 && last) return // ~30 fps is plenty for slow air
      last = now
      clock += dt / 1000
      const k = 1 - Math.pow(0.04, dt / 1000) // frame rate independent lerp
      for (const n of ['x', 'y', 'nx', 'ny', 'on'] as const) cur[n] += (ptr[n] - cur[n]) * k
      strip.setMotion(clock, cur.nx * 0.006, cur.ny * 0.004, [cur.x, cur.y, cur.on])
      draw()
      if (craft.current)
        craft.current.style.translate = `${(cur.nx * 7).toFixed(2)}px ${(cur.ny * 5).toFixed(2)}px`
    }
    const gate = () => {
      const run = animate && onScreen && !document.hidden
      if (run && !raf) {
        last = 0
        raf = requestAnimationFrame(frame)
      } else if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
    const io = new IntersectionObserver((es) => {
      onScreen = es[es.length - 1]?.isIntersecting ?? false
      gate()
    })
    io.observe(rowEl)
    document.addEventListener('visibilitychange', gate)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(pending)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', gate)
      rowEl.removeEventListener('pointermove', onMove)
      rowEl.removeEventListener('pointerleave', onLeave)
      strip.dispose()
    }
  }, [row, canvases, craft, reduce])
}

/** "A billion students": three film cards cut from one animated planet strip. */
export function Billion() {
  const row = useRef<HTMLDivElement>(null)
  const canvases = useRef<(HTMLCanvasElement | null)[]>([])
  const craft = useRef<HTMLImageElement>(null)
  useEarthCards(row, canvases, craft)

  return (
    <section className="why" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <WordReveal id="why-title" className="h2">
          There are over a billion students on earth.{' '}
          <span className="mute">They all deserve the same tools.</span>
        </WordReveal>
        <div className="values" ref={row}>
          {VALUES.map((v, i) => (
            <Reveal as="article" className="card" key={v.title} delay={i ? i * 0.08 : undefined}>
              <canvas
                ref={(el) => {
                  canvases.current[i] = el
                }}
              />
              <div className="grain" />
              {v.craft && (
                <img
                  ref={craft}
                  className="craft"
                  alt=""
                  src="/assets/craft.png"
                  width={229}
                  height={300}
                />
              )}
              <div className="content">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {v.icon}
                  </svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
