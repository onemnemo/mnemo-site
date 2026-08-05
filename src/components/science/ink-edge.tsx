import Image from "next/image"

import squidArt from "@public/illos/science/squid.png"
import { cn } from "@/lib/utils"

/**
 * The paper-to-cobalt boundary of /science, drawn as an event: the scene-1
 * squid dives toward a sea of ink whose surface IS the top of the cobalt
 * band. The fact about a sea creature literally sinks into the deep where
 * it starts to fade, which is what scene 2 is about. (An explicit ink jet
 * connecting squid to sea was tried and cut: the dive plus the swell
 * already tell the story, and the jet read as a stray mark.)
 *
 * Follows the TornEdge painting rule: the strip's own background is the
 * OUTGOING canvas (className carries bg-*), and the SVG paints the
 * INCOMING canvas below the ink line (className carries text-*). Each box
 * edge meets a band of its own color, so subpixel rounding can never
 * flash a hairline. The pool path overdraws the viewBox bottom for the
 * same reason.
 *
 * The swell in the sea rises under the squid's right-side position, like
 * the TornEdge valley under Soma.
 *
 * Decorative through and through, so everything is aria-hidden.
 */

/**
 * The pool: a long settled wash rising into a broad swell under the squid.
 * The swell is a wide plateau rather than a peak, so the stream lands on
 * it at every viewport width even though the squid is offset in pixels
 * while this path stretches with the page (same tolerance thinking as the
 * TornEdge valley under Soma). The two humps riding the swell are drips
 * ATTACHED to the surface; detached droplets floating in the paper read
 * as rendering mistakes at page scale, not as motion.
 */
const POOL =
  "M0 92 L0 58 " +
  "C 60 50, 120 66, 190 60 " +
  "C 260 54, 300 70, 380 64 " +
  "C 470 57, 520 72, 610 63 " +
  "C 700 54, 760 68, 850 60 " +
  "C 920 54, 990 56, 1040 44 " +
  "C 1075 35, 1090 22, 1120 19 " +
  "C 1132 18, 1136 8, 1146 8 " +
  "C 1156 8, 1160 17, 1175 16 " +
  "C 1195 15, 1210 6, 1222 7 " +
  "C 1234 8, 1238 18, 1255 21 " +
  "C 1290 27, 1320 44, 1360 52 " +
  "C 1390 57, 1420 55, 1440 58 " +
  "L1440 92 Z"

export function InkEdge({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)}>
      {/* The squid, diving toward the swell below it. */}
      <div className="absolute right-4 bottom-[60px] w-32 sm:right-8 sm:bottom-[110px] sm:w-44 lg:right-14 lg:w-52">
        <Image
          src={squidArt}
          alt=""
          className="relative z-10 h-auto w-full"
        />
      </div>

      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="none"
        className="block h-16 w-full sm:h-24"
      >
        <path d={POOL} fill="currentColor" />
      </svg>
    </div>
  )
}
