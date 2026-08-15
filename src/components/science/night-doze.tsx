import nightSheet from "@public/illos/science/night-sprite-sheet.png"
import { cn } from "@/lib/utils"

/**
 * Scene 6's sleeper: Soma under the quilt, breathing, with z's stacking
 * up one per breath. A single-row 4-frame sprite sheet stepped by the
 * science-night-doze keyframes (x axis only). The frames' bodies shift a
 * few pixels between generations, which plays as hand-drawn boil under
 * the z animation.
 *
 * The sheet is drawn tight to its frames, so the box just takes the
 * sheet's own aspect ratio; no crop window needed.
 *
 * No JS, and with reduced motion the animation never starts, leaving the
 * one-z first frame as a still.
 */

const FRAMES = 4

export function NightDoze({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("science-night-doze bg-no-repeat", className)}
      style={{
        aspectRatio: `${nightSheet.width / FRAMES} / ${nightSheet.height}`,
        backgroundImage: `url(${nightSheet.src})`,
        backgroundSize: `${FRAMES * 100}% 100%`,
      }}
    />
  )
}
