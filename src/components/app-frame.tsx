import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type AppFrameProps = ComponentPropsWithoutRef<"div"> & {
  /** Text shown in the title bar, e.g. a document or deck name. */
  title?: string
  /**
   * Whether to draw the synthetic title bar. Real Mnemo screenshots already
   * carry the app's own window chrome (tabs, window controls), so a second
   * bar would double up; pass false for those. Placeholders, which have no
   * chrome of their own, want it on.
   */
  chrome?: boolean
}

/**
 * Neutral desktop window frame for app screenshots.
 *
 * The frame belongs to the site, not the app, so screenshots can be swapped
 * after an app redesign without touching the layout. Children should be the
 * screenshot itself (or a Placeholder) and are clipped to the frame's radius.
 *
 * Depth is shadow, not border. The app is explicit that borders are a last
 * resort and that the canvas floats above the frame on elevation alone;
 * shadow-canvas is that exact elevation token, and it already carries a
 * hairline ring in its first layer, so an actual border would double it.
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
        "bg-canvas shadow-canvas overflow-hidden rounded-xl",
        className
      )}
      {...props}
    >
      {chrome && (
        <div className="border-line-soft flex items-center gap-2 border-b px-4 py-2.5">
          {/* Window control dots, grayscale so the frame stays neutral. */}
          <span aria-hidden className="flex gap-1.5">
            <span className="bg-ink-3/30 size-2.5 rounded-full" />
            <span className="bg-ink-3/30 size-2.5 rounded-full" />
            <span className="bg-ink-3/30 size-2.5 rounded-full" />
          </span>
          <span className="text-ink-3 ml-2 font-mono text-xs">
            {title}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}
