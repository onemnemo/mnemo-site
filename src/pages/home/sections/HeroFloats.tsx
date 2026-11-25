import type { CSSProperties, RefObject } from 'react'
import { FLOATS, floatSrc } from './floatsLayout'

export function HeroFloats({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="floats" ref={ref} aria-hidden="true">
      {FLOATS.map((f) => (
        <figure
          key={f.img}
          className={`fl${f.right ? ' r' : ''} d${f.depth}`}
          data-k={f.k}
          style={f.style as CSSProperties}
        >
          <div className="fl-in">
            <div className="ph">
              <img src={floatSrc(f.img)} alt="" />
            </div>
          </div>
        </figure>
      ))}
    </div>
  )
}

/** Phone row: the same photos twice over, scrolling sideways. */
export function HeroChips() {
  const imgs = [...FLOATS, ...FLOATS]
  return (
    <div className="chips" aria-hidden="true">
      <div className="track">
        {imgs.map((f, i) => (
          <img key={i} src={floatSrc(f.img)} alt="" width={76} height={76} />
        ))}
      </div>
    </div>
  )
}
