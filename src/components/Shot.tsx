interface ShotProps {
  /** Light and dark screenshot paths, served from /public. */
  light: string
  dark: string
  alt: string
  width?: number
  height?: number
  lazy?: boolean
  priority?: boolean
  className?: string
}

/** A screenshot that follows the system colour scheme. */
export function Shot({ light, dark, alt, width, height, lazy, priority, className }: ShotProps) {
  return (
    <picture className={className}>
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img
        src={light}
        width={width}
        height={height}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  )
}
