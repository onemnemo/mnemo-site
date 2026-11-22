import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { fieldFallback, type FieldName } from '../lib/webgl/palettes'
import { requestStill } from '../lib/webgl/stillQueue'

interface FieldProps {
  name: FieldName
  seed?: number
  /** Glow centre in uv, for long exposure fields. */
  glow?: readonly [number, number]
  className?: string
  as?: 'div' | 'span'
}

/** A still WebGL field, painted lazily over its CSS gradient fallback. */
export function Field({ name, seed, glow, className, as: Tag = 'div' }: FieldProps) {
  const ref = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [painted, setPainted] = useState(false)
  const glowX = glow?.[0]
  const glowY = glow?.[1]

  useEffect(() => {
    const el = ref.current
    const target = canvas.current
    if (!el || !target) return
    const cancel = requestStill({
      el,
      name,
      seed,
      glow: glowX !== undefined && glowY !== undefined ? [glowX, glowY] : undefined,
      target,
      onPainted: () => requestAnimationFrame(() => setPainted(true)),
    })
    return cancel || undefined
  }, [name, seed, glowX, glowY])

  const style: CSSProperties = { background: fieldFallback(name) }
  return (
    <Tag
      ref={ref as never}
      className={className ? `field ${className}` : 'field'}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvas} className={painted ? 'on' : undefined} />
    </Tag>
  )
}
