import { useRef, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps<T extends ElementType> = {
  as?: T
  /** Transition delay in seconds, to stagger neighbours. */
  delay?: number
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/** Fades and unblurs its element in once it enters the viewport (see [data-rv] in base.css). */
export function Reveal<T extends ElementType = 'div'>({
  as,
  delay,
  className,
  style,
  ...rest
}: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div'
  const ref = useRef<Element>(null)
  const shown = useReveal(ref)
  const classes = [className, shown && 'in'].filter(Boolean).join(' ') || undefined
  return (
    <Tag
      ref={ref}
      data-rv=""
      className={classes}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
      {...rest}
    />
  )
}
