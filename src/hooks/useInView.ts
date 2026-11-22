import { useEffect, useRef, useState, type RefObject } from 'react'

interface InViewOptions {
  threshold?: number
  rootMargin?: string
  /** Called from the observer whenever visibility changes. */
  onChange?: (inView: boolean) => void
}

/** Tracks whether an element intersects the viewport. */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0, rootMargin, onChange }: InViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false)
  const cb = useRef(onChange)
  useEffect(() => {
    cb.current = onChange
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1]
        if (!last) return
        setInView(last.isIntersecting)
        cb.current?.(last.isIntersecting)
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin])
  return inView
}
