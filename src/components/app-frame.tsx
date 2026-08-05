import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type AppFrameProps = ComponentPropsWithoutRef<"div"> & {
  /** Text shown in the title bar, e.g. a document or deck name. */
  title?: string
  /**
   * Whether to draw the synthetic title bar. Real Mnemo screenshots already
   * carry the app's own window chrome (tabs, window controls), so a second
   * fake bar on top would double up; leave chrome off for those. Only
   * placeholders during the wireframe phase want the synthetic bar.
   */
  chrome?: boolean
}

/**
 * Neutral desktop window frame for app screenshots.
 *
 * The frame belongs to the site, not the app, which is what lets screenshots
 * be swapped after every app redesign without touching the layout. Children
 * should be the screenshot itself (or a Placeholder during the wireframe
 * phase) and are clipped to the frame's radius.
 */
export function AppFrame({
  title = "Mnemo",
  chrome = true,
  className,
  children,
  ...props
}: AppFrameProps) {
  return (
    <div
      className={cn(
        "bg-card overflow-hidden rounded-xl border shadow-sm",
        className
      )}
      {...props}
    >
      {chrome && (
        <div className="flex items-center gap-2 border-b px-4 py-2.5">
          {/* Window control dots, deliberately grayscale to stay neutral. */}
          <span aria-hidden className="flex gap-1.5">
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span className="bg-muted-foreground/30 size-2.5 rounded-full" />
          </span>
          <span className="text-muted-foreground ml-2 font-mono text-xs">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}
