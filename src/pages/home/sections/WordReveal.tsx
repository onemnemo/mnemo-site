import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { clamp, useScrollFrame } from '../../../hooks/useScrollFrame'

/** Wraps every word of the text in a span.w, keeping elements and spaces as they are. */
function splitWords(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((t, i) =>
        !t ? null : /^\s+$/.test(t) ? (
          t
        ) : (
          <span className="w" key={i}>
            {t}
          </span>
        ),
      )
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(
        child as ReactElement<{ children?: ReactNode }>,
        undefined,
        splitWords(child.props.children),
      )
    }
    return child
  })
}

interface WordRevealProps {
  id: string
  className: string
  children: ReactNode
}

/** A headline whose words come into focus in turn as it scrolls up. */
export function WordReveal({ id, className, children }: WordRevealProps) {
  const reduce = useReducedMotion()
  const h = useRef<HTMLHeadingElement>(null)

  useScrollFrame(() => {
    const el = h.current
    if (!el) return
    const vh = innerHeight
    const t = clamp((vh * 0.9 - el.getBoundingClientRect().top) / (vh * 0.4))
    const words = el.querySelectorAll<HTMLElement>('.w')
    const N = words.length
    words.forEach((w, i) => {
      const k = 1 - Math.pow(1 - clamp((t - (i / N) * 0.6) / 0.4), 3)
      w.style.opacity = (0.12 + 0.88 * k).toFixed(3)
      w.style.transform = `translateY(${((1 - k) * 0.25).toFixed(3)}em)`
      w.style.filter = k > 0.995 ? 'none' : `blur(${((1 - k) * 6).toFixed(2)}px)`
    })
  }, !reduce)

  return (
    <h2 className={className} id={id} ref={h}>
      {splitWords(children)}
    </h2>
  )
}
