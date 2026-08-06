"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * Desktop navigation links.
 *
 * A client component only because active-link highlighting needs the current
 * pathname. Kept tiny so the rest of the header stays on the server.
 */
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={cn("flex items-center gap-1", className)}>
      {mainNav.map((item) => {
        // Strip any #fragment so "/#features" compares against "/".
        const targetPath = item.href.split("#")[0] || "/"
        const isActive = targetPath !== "/" && pathname.startsWith(targetPath)

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
            {/* The lit dash of the journey spine (see StageMarker and the
                card sprites): the site's marker for "you are here". */}
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
