import { useLayoutEffect, useRef } from 'react'

/**
 * Runs `onFrame` once on mount, then at most once per animation frame while the page
 * scrolls or resizes. The latest callback is always used, so it may close over props.
 */
export function useScrollFrame(onFrame: () => void, enabled = true) {
  const cb = useRef(onFrame)
  useLayoutEffect(() => {
    cb.current = onFrame
  })
  useLayoutEffect(() => {
    if (!enabled) return
    let raf = 0
    const run = () => {
      raf = 0
      cb.current()
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }
    run()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [enabled])
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
