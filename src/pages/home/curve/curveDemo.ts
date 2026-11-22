import {
  GRADE_NAMES,
  RUN,
  S0,
  formatGap,
  gap,
  nextStability,
  recall,
  targetSpan,
  type Grade,
  type Review,
} from './model'

interface CurveDemoOptions {
  root: HTMLElement
  canvas: HTMLCanvasElement
  dayEl: HTMLElement
  eventEl: HTMLElement
  /** Background behind the chart, used to ring the moving head. */
  background: string
  reduce: boolean
}

/**
 * Plays a run of reviews on the chart while it is on screen, then starts over.
 * With reduced motion it draws the finished run once. Returns a cleanup function.
 */
export function startCurveDemo({
  root,
  canvas: cv,
  dayEl,
  eventEl,
  background,
  reduce,
}: CurveDemoOptions) {
  const ctx = cv.getContext('2d')
  if (!ctx) return () => {}
  const font = getComputedStyle(document.body).fontFamily
  const view = { now: 0, xMax: 30, alpha: 1 }
  const flashes: { t: number; t0: number }[] = []
  let reviews: Review[] = []
  let now = 0
  let step = 0
  let raf = 0
  let fadeRaf = 0
  let pulseRaf = 0
  let timer = 0
  let fadeTimer = 0
  let playing = false
  let disposed = false

  const reset = () => {
    reviews = [{ t: 0, S: S0, g: 2 }]
    now = S0
    step = 0
    view.now = 0
    view.xMax = 30
  }
  reset()

  const niceStep = (span: number) =>
    [5, 10, 20, 30, 60, 90, 180, 365, 730].find(
      (s) => span / s <= (cv.clientWidth < 480 ? 3 : 5),
    ) ?? 1460

  function draw() {
    if (!ctx) return
    const dpr = Math.min(2, devicePixelRatio || 1)
    const W = cv.clientWidth
    const H = cv.clientHeight
    if (!W) return
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, W, H)
    ctx.globalAlpha = view.alpha
    const L = 44,
      R = 6,
      T = 26,
      B = 30
    const pw = W - L - R,
      ph = H - T - B
    const X = (t: number) => L + (t / view.xMax) * pw
    const Y = (r: number) => T + (1 - r) * ph
    ctx.font = `12px ${font}`

    // grid
    for (const r of [0, 0.5, 1]) {
      ctx.strokeStyle = r === 0 ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.07)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(L, Math.round(Y(r)) + 0.5)
      ctx.lineTo(W - R, Math.round(Y(r)) + 0.5)
      ctx.stroke()
      ctx.fillStyle = 'rgba(244,242,239,.42)'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${r * 100}%`, L - 10, Y(r))
    }
    const st = niceStep(view.xMax)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (let t = 0; t <= view.xMax; t += st) {
      if (t && X(t) > W - R - 20) break
      ctx.fillStyle = 'rgba(244,242,239,.42)'
      ctx.fillText(`day ${t}`, X(t), H - B + 11)
    }

    // never reviewed
    ctx.setLineDash([3, 5])
    ctx.strokeStyle = 'rgba(244,242,239,.36)'
    ctx.lineWidth = 1.3
    ctx.beginPath()
    for (let i = 0; i <= 160; i++) {
      const t = (view.xMax * i) / 160
      if (i) ctx.lineTo(X(t), Y(recall(t, S0)))
      else ctx.moveTo(X(t), Y(recall(t, S0)))
    }
    ctx.stroke()
    ctx.setLineDash([])

    // with reviews: area under the line, then the line
    const pts: [number, number][] = []
    reviews.forEach((r, i) => {
      const nextT = reviews[i + 1]?.t
      const end = Math.min(nextT ?? view.now, view.now)
      if (end < r.t) return
      const n = Math.max(4, Math.ceil(((end - r.t) / view.xMax) * 200))
      for (let k = 0; k <= n; k++) {
        const t = r.t + ((end - r.t) * k) / n
        pts.push([X(t), Y(recall(t - r.t, r.S))])
      }
    })
    const first = pts[0]
    const lastPt = pts[pts.length - 1]
    if (first && lastPt && pts.length > 1) {
      const g = ctx.createLinearGradient(0, T, 0, T + ph)
      g.addColorStop(0, 'rgba(244,242,239,.12)')
      g.addColorStop(1, 'rgba(244,242,239,0)')
      const trace = () => {
        ctx.beginPath()
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
      }
      trace()
      ctx.lineTo(lastPt[0], Y(0))
      ctx.lineTo(first[0], Y(0))
      ctx.closePath()
      ctx.fillStyle = g
      ctx.fill()
      trace()
      ctx.strokeStyle = '#f4f2ef'
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.stroke()
    }

    // review markers with their grade
    reviews.forEach((r, i) => {
      if (r.t > view.now + 1e-6) return
      const x = X(r.t),
        y = Y(1)
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, 7)
      if (r.g === 0) {
        ctx.strokeStyle = '#f4f2ef'
        ctx.lineWidth = 1.4
        ctx.stroke()
      } else {
        ctx.fillStyle = '#f4f2ef'
        ctx.fill()
      }
      const prev = reviews[i - 1]
      if (prev && X(r.t) - X(prev.t) > 34) {
        ctx.fillStyle = 'rgba(244,242,239,.55)'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillText(GRADE_NAMES[r.g], x, y - 9)
      }
    })
    const t2 = performance.now()
    for (const f of flashes) {
      const k = (t2 - f.t0) / 700
      if (k > 1) continue
      ctx.beginPath()
      ctx.arc(X(f.t), Y(1), 4 + k * 14, 0, 7)
      ctx.strokeStyle = `rgba(244,242,239,${(1 - k) * 0.6})`
      ctx.lineWidth = 1.2
      ctx.stroke()
    }

    // the moving head
    const last = reviews[reviews.length - 1]
    if (last) {
      ctx.beginPath()
      ctx.arc(X(view.now), Y(recall(view.now - last.t, last.S)), 4.5, 0, 7)
      ctx.fillStyle = '#f4f2ef'
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = background
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  const setDay = (day: number) => (dayEl.textContent = `Day ${Math.round(day)}`)
  function say(day: number, text: string) {
    setDay(day)
    if (eventEl.textContent === text) return
    eventEl.classList.add('fade')
    fadeTimer = window.setTimeout(() => {
      eventEl.textContent = text
      eventEl.classList.remove('fade')
    }, 220)
  }

  // animate the view from where it is to a new time and zoom
  function tween(toNow: number, toX: number, ms: number, done: () => void) {
    cancelAnimationFrame(raf)
    const a = { n: view.now, x: view.xMax }
    const t0 = performance.now()
    const loop = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      view.now = a.n + (toNow - a.n) * e
      view.xMax = a.x + (toX - a.x) * e
      setDay(view.now)
      draw()
      if (p < 1) raf = requestAnimationFrame(loop)
      else done()
    }
    raf = requestAnimationFrame(loop)
  }

  function fade(to: number, done: () => void) {
    const from = view.alpha
    const t0 = performance.now()
    const f = (t: number) => {
      const p = Math.min(1, (t - t0) / 500)
      view.alpha = from + (to - from) * p
      draw()
      if (p < 1) fadeRaf = requestAnimationFrame(f)
      else done()
    }
    fadeRaf = requestAnimationFrame(f)
  }

  function next() {
    if (!playing || disposed) return
    if (step >= RUN.length) {
      // hold, fade, start over
      timer = window.setTimeout(
        () =>
          fade(0, () => {
            reset()
            say(0, 'First study')
            draw()
            fade(1, () => {
              timer = window.setTimeout(next, 350)
            })
          }),
        1800,
      )
      return
    }
    // drift forward to the next review, then grade it
    tween(now, targetSpan(now), 850, () => {
      const last = reviews[reviews.length - 1]
      const g = RUN[step++] as Grade
      if (!last) return
      const S = nextStability(last.S, g)
      reviews.push({ t: now, S, g })
      flashes.push({ t: now, t0: performance.now() })
      say(
        now,
        g === 0
          ? 'Again. Back in 10 minutes'
          : `${GRADE_NAMES[g]}. Next review in ${formatGap(gap(S, g))}`,
      )
      const pulse = (t0: number) => {
        draw()
        if (performance.now() - t0 < 900) pulseRaf = requestAnimationFrame(() => pulse(t0))
      }
      pulse(performance.now())
      now += gap(S, g)
      timer = window.setTimeout(next, 520)
    })
  }

  const play = () => {
    if (playing) return
    playing = true
    next()
  }
  const pause = () => {
    playing = false
    clearTimeout(timer)
  }

  let io: IntersectionObserver | undefined
  if (reduce) {
    for (const g of RUN) {
      const last = reviews[reviews.length - 1]
      if (!last) break
      const S = nextStability(last.S, g)
      reviews.push({ t: now, S, g })
      now += gap(S, g)
    }
    view.now = now
    view.xMax = targetSpan(now)
    setDay(now)
    eventEl.textContent = `${reviews.length - 1} reviews`
  } else {
    io = new IntersectionObserver((e) => (e[0]?.isIntersecting ? play() : pause()), {
      threshold: 0.45,
    })
    io.observe(root)
  }

  draw()
  const ro = new ResizeObserver(draw)
  ro.observe(cv)
  void document.fonts?.ready.then(() => !disposed && draw())

  return () => {
    disposed = true
    pause()
    clearTimeout(fadeTimer)
    cancelAnimationFrame(raf)
    cancelAnimationFrame(fadeRaf)
    cancelAnimationFrame(pulseRaf)
    io?.disconnect()
    ro.disconnect()
  }
}
