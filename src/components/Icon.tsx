import sprite from './icons/sprite.svg?raw'

export type IconName =
  | 'dl'
  | 'gh'
  | 'win'
  | 'mac'
  | 'linux'
  | 'book'
  | 'import'
  | 'tablet'
  | 'arrow'
  | 'code'
  | 'search'
  | 'chev'
  | 'note'
  | 'map'
  | 'cards'
  | 'cycle'
  | 'box'
  | 'sliders'
  | 'term'
  | 'layers'
  | 'branch'
  | 'check'
  | 'dot'

const symbols = sprite.replace(/<!--[\s\S]*?-->/, '')

/** The symbol sheet every <Icon> points into. Rendered once by the page shell. */
export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: symbols }}
    />
  )
}

interface IconProps {
  name: IconName
  className?: string
  width?: number
  height?: number
}

export function Icon({ name, className, width, height }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} width={width} height={height}>
      <use href={`#i-${name}`} />
    </svg>
  )
}
