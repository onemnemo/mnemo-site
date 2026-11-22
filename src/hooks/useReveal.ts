import { useEffect, useState, type RefObject } from 'react'

const callbacks = new WeakMap<Element, () => void>()
let observer: IntersectionObserver | undefined

const getObserver = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        observer?.unobserve(e.target)
        callbacks.get(e.target)?.()
        callbacks.delete(e.target)
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
  ))

/** True once the element has scrolled into view; never flips back. One shared observer. */
export function useReveal(ref: RefObject<Element | null>): boolean {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    callbacks.set(el, () => setShown(true))
    getObserver().observe(el)
    return () => {
      callbacks.delete(el)
      observer?.unobserve(el)
    }
  }, [ref])
  return shown
}
