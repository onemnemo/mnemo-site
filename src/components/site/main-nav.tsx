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
              "hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
