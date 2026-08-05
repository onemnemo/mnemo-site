import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type PlaceholderProps = ComponentPropsWithoutRef<"div"> & {
  /** Short label describing what will eventually live here. */
  label?: string
}

/**
 * Wireframe stand-in for images, video, and illustrations.
 *
 * Renders in the current text color at low opacity, so it automatically fits
 * whatever canvas it sits on. Size and aspect ratio are the caller's job,
 * for example className="aspect-video" or className="size-40 rounded-full".
 */
export function Placeholder({
  label = "Media",
  className,
  ...props
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${label}`}
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-current/30 bg-current/10",
        className
      )}
      {...props}
    >
      <span className="font-mono text-xs tracking-widest uppercase opacity-60">
        {label}
      </span>
    </div>
  )
}
