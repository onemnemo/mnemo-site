import nightSheet from "@public/illos/science/night-sprite-sheet.png"
import { cn } from "@/lib/utils"

/**
 * Scene 6's sleeper: Soma under the quilt, breathing, with z's stacking
 * up one per breath. A single-row 4-frame sprite sheet stepped by the
 * science-night-doze keyframes (x axis only). The frames' bodies shift a
 * few pixels between generations, which plays as hand-drawn boil on top
 * of the deliberate z animation.
 *
 * The sheet's frames are mostly dead canvas: the drawn content lives in
 * rows 276..604 of the 1024-row sheet (measured opaque bounds plus
 * padding). The box therefore gets the aspect ratio of that 328-row
 * window, and a constant background-position-y hides the rest. The
 * constant works at every rendered size because offset, box height, and
 * scaled image height all grow with the same width: the percentage is
 * cropTop / (sheetH - windowH) = 276 / (1024 - 328).
 *
 * No JS, and with reduced motion the animation never starts, leaving the
 * one-z first frame as a still.
 */

const FRAMES = 4
const SHEET_H = 1024
const CROP_TOP = 276
const WINDOW_H = 328

export function NightDoze({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("science-night-doze bg-no-repeat", className)}
      style={{
        aspectRatio: `${nightSheet.width / FRAMES} / ${WINDOW_H}`,
        backgroundImage: `url(${nightSheet.src})`,
        backgroundSize: `${FRAMES * 100}% auto`,
        backgroundPosition: `0% ${(100 * CROP_TOP) / (SHEET_H - WINDOW_H)}%`,
      }}
    />
  )
}
