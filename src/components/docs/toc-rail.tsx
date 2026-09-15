"use client"

import { useEffect, useState } from "react"
import type { DocHeading } from "@/lib/markdown"
import styles from "./toc.module.css"

const READING_LINE = 120

export function TocRail({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      let current: string | null = headings[0]?.id ?? null
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (element && (atBottom || element.getBoundingClientRect().top <= READING_LINE)) current = heading.id
      }
      setActiveId(current)
    }
    const schedule = () => { if (frame === 0) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [headings])

  return (
    <nav aria-label="On this page" className={styles.toc}>
      <h2>On this page</h2>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} data-depth={heading.depth}>
            <a href={`#${heading.id}`} aria-current={heading.id === activeId ? "location" : undefined}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
