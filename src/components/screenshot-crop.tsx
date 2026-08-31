import Image, { type StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

type Crop = {
  /** Rendered image width as a percentage of the window width, e.g. "127.23%". */
  width: string
  /** Horizontal offset, percentage of the window width. Negative crops the left. */
  left: string
  /** Vertical offset, percentage of the window *height*. Negative crops the top. */
  top: string
}

type ScreenshotCropProps = {
  src: StaticImageData
  alt: string
  /** Aspect ratio of the window, e.g. "1131 / 560". */
  ratio: string
  crop: Crop
  /** Passed to next/image; the rendered width is `crop.width` of the window. */
  sizes: string
  /** Passed to next/image. Defaults to Next's standard 75 when omitted. */
  quality?: number
  priority?: boolean
  className?: string
}

/**
 * A window onto part of a screenshot.
 *
 * The module rows show one capture at two zooms: the wide shot that gives the
 * screen its context, and a tight detail lifted out of the same file and
 * floated over it. Cutting new image files for the details would mean three
 * more assets to re-export every time the app's UI moves; scaling and
 * offsetting the one capture inside a fixed-ratio window means a new
 * screenshot drops in and every crop follows it.
 *
 * The window sets the aspect ratio and clips; the image is absolutely
 * positioned inside it and sized in percentages, so the whole thing is
 * resolution-independent and the crop holds at every viewport width.
 *
 * `top` resolves against the window's *height* (CSS percentage rules for
 * absolutely positioned boxes), which is why the offsets look asymmetric
 * next to `left`.
 */
export function ScreenshotCrop({
  src,
  alt,
  ratio,
  crop,
  sizes,
  quality,
  priority,
  className,
}: ScreenshotCropProps) {
  return (
    <div
      className={cn("bg-canvas relative overflow-hidden", className)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className="absolute h-auto max-w-none"
        style={{ width: crop.width, left: crop.left, top: crop.top }}
      />
    </div>
  )
}
