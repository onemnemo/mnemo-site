import Image from "next/image"

import { doodleArt, type DoodleName } from "@/components/doodle-art"
import { cn } from "@/lib/utils"

type DoodleProps = {
  /** File stem under public/illos/doodles, e.g. "dark-01" or "light-08". */
  name: DoodleName
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
 *
 * The art comes from a static import (see doodle-art.ts) rather than a
 * hand-built URL string, so intrinsic dimensions come from the file itself
 * and re-cutting a sheet busts every cache on the way to the browser.
 *
 * Each doodle drifts on a slow float (doodle-drift in globals.css),
 * desynced by hashing its name into a duration and a negative delay, so
 * every instance is mid-cycle from the first frame and no two bob in
 * step. Hashing instead of randomizing keeps the server and client
 * markup identical.
 */
export function Doodle({ name, className }: DoodleProps) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997
  return (
    <Image
      src={doodleArt[name]}
      alt=""
      aria-hidden
      className={cn(
        "doodle-drift pointer-events-none absolute hidden select-none sm:block",
        className,
      )}
      style={
        {
          "--drift-duration": `${9 + (hash % 6)}s`,
          "--drift-delay": `-${hash % 9}s`,
        } as React.CSSProperties
      }
    />
  )
}
