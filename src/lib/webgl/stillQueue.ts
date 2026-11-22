import { createLongExposurePainter, createSilkPainter } from './painters'
import { LONG_EXPOSURE, SILK, isSilk, type FieldName, type SilkName } from './palettes'

/**
 * Paints still fields lazily as they come near the viewport. Every field shares one
 * offscreen context per shader; each result is copied into the field's own 2D canvas,
 * one per idle callback so scrolling stays smooth.
 */
export interface StillRequest {
  el: HTMLElement
  name: FieldName
  seed?: number
  glow?: readonly [number, number]
  target: HTMLCanvasElement
  onPainted: () => void
}

type Painters = {
  long: ReturnType<typeof createLongExposurePainter>
  silk: ReturnType<typeof createSilkPainter>
}

let painters: Painters | undefined
let observer: IntersectionObserver | undefined
const pending = new Map<Element, StillRequest>()
const queue: StillRequest[] = []
let busy = false
// Fields without a seed take the running count, as the static site did.
let counter = 1

const idle = (cb: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 120 }) : setTimeout(cb, 16)

function getPainters(): Painters {
  if (!painters) {
    const safe = <T>(make: () => T | null) => {
      try {
        return make()
      } catch {
        return null
      }
    }
    painters = {
      long: safe(() => createLongExposurePainter(document.createElement('canvas'))),
      silk: safe(() => createSilkPainter(document.createElement('canvas'))),
    }
  }
  return painters
}

function job() {
  const req = queue.shift()
  if (!req) {
    busy = false
    return
  }
  const { long, silk } = getPainters()
  const r = req.el.getBoundingClientRect()
  const src = isSilk(req.name) ? silk : long
  if (src && r.width > 0 && req.el.isConnected) {
    const W = Math.max(320, Math.min(900, Math.round(r.width * 0.75)))
    const H = Math.min(
      1400,
      Math.max(240, Math.round((W * (r.height || r.width)) / (r.width || 1))),
    )
    const s = req.seed ?? counter
    if (isSilk(req.name) && silk) {
      silk.paint(W, H, SILK[req.name.slice(5) as SilkName], (s * 1.37) % 97)
    } else if (!isSilk(req.name) && long) {
      long.paint(W, H, LONG_EXPOSURE[req.name], 10 + s * 3.7, s * 1.93, req.glow ?? null, 0.07)
    }
    req.target.width = src.canvas.width
    req.target.height = src.canvas.height
    req.target.getContext('2d')?.drawImage(src.canvas, 0, 0)
    req.onPainted()
  }
  counter++
  idle(job)
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const req = pending.get(e.target)
        observer?.unobserve(e.target)
        pending.delete(e.target)
        if (!req) continue
        queue.push(req)
        if (!busy) {
          busy = true
          idle(job)
        }
      }
    },
    { rootMargin: '900px 0px' },
  )
  return observer
}

/** Returns false when WebGL is unavailable, so the CSS fallback stays. */
export function requestStill(req: StillRequest): (() => void) | false {
  const { long, silk } = getPainters()
  if (!long && !silk) return false
  pending.set(req.el, req)
  getObserver().observe(req.el)
  return () => {
    pending.delete(req.el)
    observer?.unobserve(req.el)
    const i = queue.indexOf(req)
    if (i >= 0) queue.splice(i, 1)
  }
}
