import Image from "next/image"

import somaArt from "@public/soma/404-soma.png"
import tvArt from "@public/soma/404-tv.png"
import { cn } from "@/lib/utils"

/**
 * The 404 scene: a television stuck on a test pattern, and Soma unimpressed
 * by it.
 *
 * The drawing ships as three layers cut from the single illustration by
 * scripts/process-assets.mjs — the cabinet, the character, and a mask of the
 * screen glass. All three are written on the same 1254x1254 canvas, so they
 * stack with `inset-0` and need no offset arithmetic; the square wrapper is
 * what keeps them registered at every width.
 *
 * Splitting the layers is the whole point: the television has to hold
 * absolutely still while Soma breathes, and a flat composite cannot do that.
 *
 * The motion itself lives in globals.css, next to the keyframes.
 */
export function NotFoundScene({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Soma the axolotl frowning at an old television showing a 404 test pattern"
      className={cn("relative aspect-square", className)}
    >
      <Image
        src={tvArt}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />

      {/* Screen overlay. The mask is the glass's exact quadrilateral, so
          nothing inside can reach the cabinet however far it travels. */}
      <div aria-hidden className="scene-404-screen absolute inset-0">
        <div className="scene-404-scanlines" />
        <div className="scene-404-roll">
          <span />
        </div>
      </div>

      {/* Two nested transforms rather than one: the sway and the breath run
          on deliberately unrelated cycles, and a single element cannot hold
          two animations of the same property. */}
      <div className="scene-404-sway absolute inset-0">
        <Image
          src={somaArt}
          alt=""
          aria-hidden
          className="scene-404-breathe absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}
