"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ProductImage } from "@/components/landing/product-image"
import { archive } from "./archive-data"
import styles from "./archive.module.css"

function ArchiveControls({ selected, onSelect, className }: {
  selected: number
  onSelect: (index: number) => void
  className: string
}) {
  const id = useId()
  const last = archive.length - 1
  return (
    <div className={`${styles.controls} ${className}`}>
      <button type="button" aria-label="Previous design" disabled={selected === 0} onClick={() => onSelect(selected - 1)}><ArrowLeft size={20} aria-hidden /></button>
      <div className={styles.scrubber}>
        <label htmlFor={id} className="sr-only">Move through Mnemo’s old designs</label>
        <input id={id} type="range" min="0" max={last} step="1" value={selected} onChange={(event) => onSelect(Number(event.target.value))} aria-valuetext={archive[selected].label} style={{ "--progress": `${selected / last * 100}%` } as CSSProperties} />
        <div className={styles.endpoints}><span>The early attempts</span><button type="button" onClick={() => onSelect(last)}>Mnemo today <ArrowRight size={14} aria-hidden /></button></div>
      </div>
      <button type="button" aria-label="Next design" disabled={selected === last} onClick={() => onSelect(selected + 1)}><ArrowRight size={20} aria-hidden /></button>
    </div>
  )
}

export function StoryArchive() {
  const [selected, setSelected] = useState(0)
  const rail = useRef<HTMLDivElement>(null)
  const item = archive[selected]
  const last = archive.length - 1

  useEffect(() => {
    const container = rail.current
    const button = container?.children[selected] as HTMLElement | undefined
    if (!container || !button) return
    container.scrollTo({
      left: button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    })
  }, [selected])

  return (
    <div className={styles.archive}>
      <div className={styles.exhibit} data-color={item.color}>
        <div className={styles.screen} key={item.id}>
          <ProductImage src={item.image} alt={item.alt} label={`Enlarge ${item.label.toLowerCase()}`} />
        </div>
        <ArchiveControls selected={selected} onSelect={setSelected} className={styles.mobileControls} />
        <div className={styles.commentary} aria-live="polite" aria-atomic="true">
          <div className={styles.position}>{selected === last ? "Today" : `From the archive · ${selected + 1} / ${last}`}</div>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <p className={styles.aside}>{item.aside}</p>
        </div>
      </div>

      <ArchiveControls selected={selected} onSelect={setSelected} className={styles.desktopControls} />

      <div className={styles.filmstrip} ref={rail} role="group" aria-label="Choose a design">
        {archive.map((entry, index) => (
          <button type="button" key={entry.id} aria-pressed={index === selected} onClick={() => setSelected(index)} aria-label={`Show ${entry.label.toLowerCase()}`}>
            <span className={styles.thumbnail}><Image src={entry.image} alt="" sizes="120px" /></span>
            <span>{entry.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
