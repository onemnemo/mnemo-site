import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * The named canvases of the brand system. See globals.css for the pairing
 * rules; the short version is that each canvas carries its own ink color and
 * text inside a Section inherits it automatically.
 */
export type Canvas = "paper" | "meadow" | "cobalt" | "butter" | "blush" | "ink"

/**
 * Canvas and ink are applied together so a section can never end up with a
 * mismatched text color. This record is the single place the pairs exist.
 */
const canvasClasses: Record<Canvas, string> = {
  paper: "bg-background text-foreground",
  meadow: "bg-meadow text-meadow-ink",
  cobalt: "bg-cobalt text-cobalt-ink",
  butter: "bg-butter text-butter-ink",
  blush: "bg-blush text-blush-ink",
  ink: "bg-ink text-paper",
}

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Which brand canvas the section sits on. Defaults to paper. */
  canvas?: Canvas
}

/**
 * Full-width page band. The building block of the editorial page rhythm:
 * paper by default, with colored canvases reserved for major moments.
 */
export function Section({
  canvas = "paper",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(canvasClasses[canvas], "py-16 sm:py-24", className)}
      {...props}
    />
  )
}
