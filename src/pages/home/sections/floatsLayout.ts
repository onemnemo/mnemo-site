import { useEffect, type RefObject } from 'react'

interface Float {
  img: string
  /** Depth: 1 is nearest and sharpest, 3 is far, dim and dropped below 1180px. */
  depth: 1 | 2 | 3
  right?: boolean
  /** Scroll parallax: how fast the card rises as the hero scrolls away. */
  k: number
  style: Record<string, string | number>
}

/** Same scatter, order and timings as the static hero. */
export const FLOATS: Float[] = [
  {
    img: 'eye',
    depth: 1,
    k: 0.34,
    style: {
      '--x': '9%',
      '--y': '3%',
      '--w': '7.4vw',
      '--i': 0,
      '--t': '19s',
      '--o': '-4s',
      '--a': 1,
    },
  },
  {
    img: 'butterfly',
    depth: 3,
    k: 0.1,
    style: {
      '--x': '2.6%',
      '--y': '31%',
      '--w': '4.8vw',
      '--i': 4,
      '--t': '24s',
      '--o': '-11s',
      '--a': -1,
    },
  },
  {
    img: 'fibers',
    depth: 2,
    k: 0.2,
    style: {
      '--x': '18%',
      '--y': '30%',
      '--xs': '12%',
      '--ys': '30%',
      '--w': '6.2vw',
      '--i': 2,
      '--t': '22s',
      '--o': '-7s',
      '--a': 1,
    },
  },
  {
    img: 'skull',
    depth: 1,
    k: 0.38,
    style: {
      '--x': '5.5%',
      '--y': '58%',
      '--w': '8.4vw',
      '--i': 6,
      '--t': '17s',
      '--o': '-2s',
      '--a': -1,
    },
  },
  {
    img: 'jelly',
    depth: 3,
    k: 0.12,
    style: {
      '--x': '20.5%',
      '--y': '76%',
      '--w': '4.6vw',
      '--i': 8,
      '--t': '25s',
      '--o': '-15s',
      '--a': 1,
    },
  },
  {
    img: 'mri',
    depth: 2,
    right: true,
    k: 0.22,
    style: {
      '--x': '18%',
      '--y': '5%',
      '--xs': '15%',
      '--ys': '0%',
      '--w': '6.4vw',
      '--i': 1,
      '--t': '21s',
      '--o': '-9s',
      '--a': -1,
    },
  },
  {
    img: 'nasa',
    depth: 1,
    right: true,
    k: 0.36,
    style: {
      '--x': '4%',
      '--y': '16%',
      '--w': '8vw',
      '--i': 3,
      '--t': '18s',
      '--o': '-6s',
      '--a': 1,
    },
  },
  {
    img: 'petri',
    depth: 3,
    right: true,
    k: 0.1,
    style: {
      '--x': '21.5%',
      '--y': '44%',
      '--w': '4.8vw',
      '--i': 5,
      '--t': '23s',
      '--o': '-13s',
      '--a': -1,
    },
  },
  {
    img: 'xray',
    depth: 1,
    right: true,
    k: 0.4,
    style: {
      '--x': '9.5%',
      '--y': '62%',
      '--w': '8.8vw',
      '--i': 7,
      '--t': '16s',
      '--o': '-3s',
      '--a': -1,
    },
  },
  {
    img: 'bird',
    depth: 3,
    right: true,
    k: 0.14,
    style: {
      '--x': '2.4%',
      '--y': '80%',
      '--w': '5vw',
      '--i': 9,
      '--t': '24s',
      '--o': '-18s',
      '--a': 1,
    },
  },
]

export const floatSrc = (name: string) => `/assets/hero/${name}.webp`

/**
 * Fits the floats into the band between the nav and the app window, and drops any card that
 * would touch the hero copy or the page edge. Runs on resize, font load and page load.
 */
export function useFloatsLayout(
  floats: RefObject<HTMLDivElement | null>,
  shot: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const layout = () => {
      const el = floats.current
      const shotEl = shot.current
      const hero = el?.parentElement
      if (!el || !shotEl || !hero || getComputedStyle(el).display === 'none') return
      const H = hero.getBoundingClientRect()
      const band = Math.max(220, shotEl.offsetTop - el.offsetTop - 28)
      el.style.setProperty('--band', `${band}px`)
      const keep = [...hero.querySelectorAll('.copy>*')].map((c) => {
        const g = document.createRange()
        g.selectNodeContents(c)
        const r = g.getBoundingClientRect()
        return {
          l: r.left - H.left - 28,
          r: r.right - H.left + 28,
          t: r.top - H.top - 28,
          b: r.bottom - H.top + 28,
        }
      })
      const W = hero.clientWidth
      el.querySelectorAll<HTMLElement>('.fl').forEach((f) => {
        f.classList.remove('off')
        f.style.top = ''
        if (getComputedStyle(f).display === 'none') return
        const h = f.offsetHeight
        const y = Math.min(f.offsetTop, band - h)
        if (y < 0) {
          f.classList.add('off')
          return
        }
        f.style.top = `${y}px`
        const l = f.offsetLeft
        const r = l + f.offsetWidth
        const t = el.offsetTop + y
        const b = t + h
        const hit = keep.some((k) => l < k.r && r > k.l && t < k.b && b > k.t)
        if (hit || l < 16 || r > W - 16) f.classList.add('off')
      })
    }
    let alive = true
    addEventListener('resize', layout)
    addEventListener('load', layout)
    void document.fonts.ready.then(() => alive && layout())
    // Images set the card heights, so lay out again as each one arrives.
    const imgs = [...(floats.current?.querySelectorAll('img') ?? [])]
    imgs.forEach((i) => i.addEventListener('load', layout))
    layout()
    return () => {
      alive = false
      removeEventListener('resize', layout)
      removeEventListener('load', layout)
      imgs.forEach((i) => i.removeEventListener('load', layout))
    }
  }, [floats, shot])
}

/** Scroll parallax: near cards rise faster than far ones as the hero scrolls away. */
export function moveFloats(el: HTMLDivElement | null) {
  if (!el || scrollY >= innerHeight * 1.5) return
  el.querySelectorAll<HTMLElement>('.fl').forEach((f) => {
    f.style.translate = `0 ${(-scrollY * Number(f.dataset.k)).toFixed(1)}px`
  })
}
