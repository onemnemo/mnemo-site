"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import type { DocHeading } from "@/lib/markdown"

/**
 * "On this page" rail with a scroll spy.
 *
 * The active section is the last heading above the reading line (just
 * under the sticky header), tracked with a passive scroll listener
 * throttled to animation frames. At a handful of headings per article,
 * measuring them directly costs no more than an IntersectionObserver.
 * At the very bottom of the page the last section wins even if its
 * heading never reaches the line.
 *
 * Server-rendered HTML carries no active state, so without JavaScript
 * this degrades to a static list of links.
 */

/* Pixels from the top of the viewport. Matches the scroll-margin-top on
   .docs-prose headings (5.5rem), so a heading jumped to via its anchor
   lands as the active one. */
const READING_LINE = 96

export function TocRail({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4

      let current: string | null = null
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (!element) continue
        if (atBottom || element.getBoundingClientRect().top <= READING_LINE) {
          current = heading.id
        }
      }
      setActiveId(current)
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

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
    <nav aria-label="On this page" className="text-sm">
      <p className="text-foreground/80 text-xs font-semibold tracking-wider uppercase">
        On this page
      </p>
      <ul className="border-border mt-3 space-y-2 border-l pl-4">
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          return (
            <li
              key={heading.id}
              className={cn("relative", heading.depth === 3 && "pl-3")}
            >
              {/* The journey-spine dash, vertical on the rail's border:
                  the site's "you are here" marker. */}
              {isActive && (
                <span
                  aria-hidden
                  className="bg-primary absolute top-1/2 -left-[17px] h-4 w-[3px] -translate-y-1/2 rounded-full"
                />
              )}
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block transition-colors",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
