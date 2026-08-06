"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Reveal-on-scroll trigger: a wrapper that flips `data-revealed` on
 * itself the first time it enters the viewport. All actual motion lives
 * in CSS (see the reveal block in globals.css) keyed off two attributes:
 *
 * - `data-armed` is set here on mount, before the observer runs. CSS
 *   only hides things under [data-armed], so the server-rendered page
 *   and no-JS visitors always see the complete static article; nothing
 *   is hidden until the script that can un-hide it is actually running.
 * - `data-revealed` starts the animations, once, and the observer
 *   disconnects, so scrolling back up never replays them.
 *
 * Under prefers-reduced-motion both attributes are set immediately and
 * the CSS block disables the animations, so everything just sits in its
 * final state.
 */
export function Reveal({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.setAttribute("data-armed", "")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-revealed", "")
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.setAttribute("data-revealed", "")
          observer.disconnect()
        }
      },
      /* Fire when a third of the element is in view, pulled up a little
         so figures start drawing while the reader can still see them. */
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
