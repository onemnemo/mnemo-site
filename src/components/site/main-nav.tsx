"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { mainNav } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * Desktop navigation links.
 *
 * A client component only because active-link highlighting needs the
 * current pathname. Kept tiny so the rest of the header stays on the
 * server.
 *
 * Route links activate by pathname. The Features link points at a home
 * section (/#features), and the pathname never carries the hash, so it
 * activates by scroll spy instead: an observer marks it active while the
 * features section crosses the middle band of the viewport. Watching the
 * hash would miss link clicks, since Next's pushState hash navigation
 * fires no hashchange event.
 */
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const [featuresInView, setFeaturesInView] = useState(false)

  useEffect(() => {
    // Off the home page there is nothing to observe. isActive already
    // requires pathname === "/", so stale state cannot show through, and a
    // new observer reports the current intersection on arrival back home.
    if (pathname !== "/") return
    const section = document.getElementById("features")
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => setFeaturesInView(entries.some((e) => e.isIntersecting)),
      /* Active while the section overlaps the middle ~30% of the
         viewport, so it lights up as the section arrives and hands off
         once the next one takes over. */
      { rootMargin: "-35% 0px -35% 0px" },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [pathname])

  return (
    <nav aria-label="Main" className={cn("flex items-center gap-1", className)}>
      {mainNav.map((item) => {
        // Strip any #fragment so "/#features" compares against "/".
        const targetPath = item.href.split("#")[0] || "/"
        const isActive = item.href.startsWith("/#")
          ? pathname === "/" && featuresInView
          : targetPath !== "/" && pathname.startsWith(targetPath)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "hover:text-foreground hover:bg-secondary relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {item.title}
            {/* The lit dash of the journey spine (see StageMarker), the
                site's marker for "you are here". */}
            {isActive && (
              <span
                aria-hidden
                className="bg-primary absolute -bottom-0.5 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
