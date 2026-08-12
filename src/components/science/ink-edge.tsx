import squidSheet from "@public/illos/science/squid-sprite-sheet.png"
import { cn } from "@/lib/utils"

/**
 * The paper-to-dark boundary of /science: the scene-1 squid hovers over
 * a sea of ink whose surface is the top of the dark band below.
 *
 * The squid runs off a 5x2 sprite sheet (10 frames of tentacle drift and
 * one blip of bubbles) stepped by the science-squid-swim keyframes, with a
 * slow vertical float on the wrapper (science-squid-float). Frame aspect
 * is derived from the sheet dimensions, so replacing the art keeps the box
 * proportions correct.
 *
 * Follows the TornEdge painting rule: the strip's own background is the
 * outgoing canvas (className carries bg-*) and the SVG paints the incoming
 * canvas below the ink line (className carries text-*). Each box edge then
 * meets a band of its own color, so subpixel rounding cannot flash a
 * hairline. The pool path overdraws the viewBox bottom for the same
 * reason.
 *
 * Decorative, so everything is aria-hidden.
 */

const SHEET_COLS = 5
const SHEET_ROWS = 2

/**
 * The pool: a long settled wash rising into a broad swell under the squid.
 * The swell is a wide plateau rather than a peak because the squid is
 * positioned in pixels while this path stretches with the page; the
 * plateau keeps the squid over the swell at every viewport width. The two
 * humps riding the swell stay attached to the surface, since detached
 * droplets read as rendering artifacts at page scale.
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

/**
 * The back wave: a second, lighter surface drifting behind the pool.
 * Eight identical relative cubic segments make the path exactly periodic
 * across two viewBox widths, which lets science-ink-drift slide it by one
 * period and loop without a seam. Its crests sit just above the settled
 * wash and below the swell.
 */
const BACK_WAVE =
  "M0 60 " + "c 90 -20, 270 20, 360 0 ".repeat(8) + "L2880 100 L0 100 Z"

export function InkEdge({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)}>
      <div className="science-squid-float absolute right-4 bottom-[60px] w-32 sm:right-8 sm:bottom-[110px] sm:w-44 lg:right-14 lg:w-52">
        <div
          className="science-squid-swim relative z-10 w-full bg-no-repeat"
          style={{
            aspectRatio: `${squidSheet.width / SHEET_COLS} / ${squidSheet.height / SHEET_ROWS}`,
            backgroundImage: `url(${squidSheet.src})`,
            backgroundSize: `${SHEET_COLS * 100}% ${SHEET_ROWS * 100}%`,
          }}
        />
      </div>

      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="none"
        className="block h-16 w-full sm:h-24"
      >
        <path
          d={BACK_WAVE}
          fill="currentColor"
          fillOpacity={0.4}
          className="science-ink-drift"
        />
        <path d={POOL} fill="currentColor" />
      </svg>
    </div>
  )
}
