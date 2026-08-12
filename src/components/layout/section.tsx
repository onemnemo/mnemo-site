import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Mostly surface depths, plus two bands whose colour is load-bearing.
 *
 * The app's first principle is that the frame is one continuous surface and
 * everything else floats on it, with depth coming from shadow rather than a
 * change of material. The site used to contradict this with six saturated
 * full-width bands, each assigned an invented meaning ("meadow is growth"),
 * which is decoration dressed as a system.
 *
 * Three of those six are gone. Two stayed, because a neutral cannot do their
 * job: /science needs water to sink a fact into, and the closing call to
 * action reads warmer in yellow than in anything the neutral ramp offers.
 *
 *   paper   the page itself, and most of it
 *   sunken  a recessed band, the same material one step back
 *   sea     /science's water. Blue because it is water
 *   butter  the closing call to action, once per page
 *   deep    the app's dark canvas, at most once per page
 */
export type Canvas = "paper" | "sunken" | "sea" | "butter" | "deep"

/**
 * Surface and ink are applied together so a section can never end up with a
 * mismatched text colour. This record is the single place the pairs exist.
 */
const canvasClasses: Record<Canvas, string> = {
  paper: "bg-paper text-ink",
  sunken: "bg-sunken text-ink",
  sea: "bg-sea text-sea-ink",
  butter: "bg-butter text-ink",
  deep: "bg-deep text-deep-ink",
}

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** How deep the section sits on the page surface. Defaults to paper. */
  canvas?: Canvas
}

/**
 * Full-width page band.
 *
 * Vertical rhythm is uniform: sections do not each invent their own padding,
 * because inconsistent band heights were half of why the page read as
 * assembled rather than designed.
 */
export function Section({
  canvas = "paper",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(canvasClasses[canvas], "py-20 sm:py-28", className)}
      {...props}
    />
  )
}
