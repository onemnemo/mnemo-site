import { useEffect, useState, type RefObject } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { createLongExposurePainter } from '../../../lib/webgl/painters'
import { LONG_EXPOSURE, fieldFallback } from '../../../lib/webgl/palettes'

/** The hero's long exposure field, drawn live and slowly drifting; paused off screen. */
export function HeroField({ canvasRef }: { canvasRef: RefObject<HTMLCanvasElement | null> }) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const p = (() => {
      try {
        return createLongExposurePainter(cv)
      } catch {
        return null
      }
    })()
    if (!p) {
      setFailed(true)
      return
    }
    const t0 = performance.now()
    const draw = (now: number) => {
      const k = 0.55
      const w = Math.round(cv.clientWidth * k)
      const h = Math.round(cv.clientHeight * k)
      if (w > 0 && h > 0)
        p.paint(w, h, LONG_EXPOSURE.dusk, 4 + ((now - t0) / 1000) * 0.35, 2.4, null, 0.05)
    }
    let visible = true
    const io = new IntersectionObserver((e) => (visible = e[0]?.isIntersecting ?? false))
    io.observe(cv)
    draw(performance.now())
    setOn(true)

    let raf = 0
    let last = 0
    const onResize = () => draw(performance.now())
    if (reduce) {
      addEventListener('resize', onResize)
    } else {
      const frame = (now: number) => {
        if (visible && now - last > 33) {
          last = now
          draw(now)
        }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', onResize)
      io.disconnect()
      p.dispose()
    }
  }, [canvasRef, reduce])

  return (
    <div className="field" style={{ background: fieldFallback('dusk') }} aria-hidden="true">
      {/* Keyed so a motion preference change gets a fresh context after dispose. */}
      {!failed && <canvas key={String(reduce)} ref={canvasRef} className={on ? 'on' : undefined} />}
    </div>
  )
}
