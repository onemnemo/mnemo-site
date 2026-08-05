import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Cell dimensions of the cut doodle sheets (see scripts/process-assets.mjs).
 * All doodles from one sheet share these, so aspect ratios stay correct.
 */
const cellSize = {
  dark: { width: 220, height: 220 },
  light: { width: 255, height: 191 },
} as const

type DoodleProps = {
  /** File stem under public/illos/doodles, e.g. "dark-01" or "light-08". */
  name: `dark-${string}` | `light-${string}`
  /** Positioning, size, rotation, and opacity, e.g. "top-10 right-8 w-12 opacity-25". */
  className?: string
}

/**
 * A single background doodle inside a Section band.
 *
 * The atmosphere layer of the brand system: purely decorative, so it is
 * hidden from assistive tech, ignores the pointer, and disappears on small
 * screens where every pixel belongs to content. The parent Section needs
 * `relative overflow-hidden`.
 */
export function Doodle({ name, className }: DoodleProps) {
  const sheet = name.startsWith("dark") ? "dark" : "light"
  return (
    <Image
      src={`/illos/doodles/${name}.png`}
      alt=""
      aria-hidden
      width={cellSize[sheet].width}
      height={cellSize[sheet].height}
      className={cn(
        "pointer-events-none absolute hidden select-none sm:block",
        className
      )}
    />
  )
}
