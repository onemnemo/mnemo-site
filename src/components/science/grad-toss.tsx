import { cn } from "@/lib/utils"

/**
 * Scene 7's payoff: Soma tossing the graduation cap with no visible
 * enthusiasm, as an 8-frame sprite strip driven entirely by CSS (the
 * science-grad-toss keyframes in globals.css).
 *
 * The strip is 2176x724, eight 272-wide frames, hand-keyed and registered
 * (see the note in scripts/process-assets.mjs). Frames leave 143px of
 * empty canvas below the feet, which would push the character off the
 * baseline of anything it sits next to, so the box is cropped to 600 of
 * the 724 rows: `auto` background height keeps the frames in proportion
 * while the shorter aspect ratio hides the dead rows. Only the x position
 * is animated, so the y stays pinned at the top.
 *
 * No JS: the animation is pure CSS, and with reduced motion it never
 * starts, leaving the standing first frame as a still image.
 */
export function GradToss({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "science-grad-toss bg-[url(/illos/science/grad-strip.png)] bg-no-repeat",
        className
      )}
      style={{ aspectRatio: "272 / 600", backgroundSize: "800% auto" }}
    />
  )
}
