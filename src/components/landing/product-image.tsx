"use client"

import type { CSSProperties } from "react"
import Image, { type StaticImageData } from "next/image"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"

import styles from "./product-tour.module.css"

type Crop = {
  /** Aspect ratio of the visible window, e.g. "1120 / 890". */
  ratio: string
  /** Rendered image width as a percentage of the window width. */
  width: string
  /** Offsets as percentages of the window's width and height. */
  left: string
  top: string
}

export function ProductImage({ src, alt, label, priority = false, crop }: {
  src: StaticImageData
  alt: string
  label: string
  priority?: boolean
  crop?: Crop
}) {
  const cropStyle = crop && ({
    "--crop-ratio": crop.ratio,
    "--crop-width": crop.width,
    "--crop-left": crop.left,
    "--crop-top": crop.top,
  } as CSSProperties)
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.imageTrigger} aria-label={label} data-crop={crop ? "" : undefined} style={cropStyle}>
        <Image
          src={src}
          alt={alt}
          sizes={crop ? "(max-width: 650px) 180vw, 1500px" : "(max-width: 650px) 100vw, (max-width: 1150px) 90vw, 1240px"}
          quality={90}
          priority={priority}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.imageOverlay} />
        <Dialog.Content className={styles.imageDialog}>
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <Dialog.Description className="sr-only">{alt}</Dialog.Description>
          <div className={styles.imageScroll}>
            <Image src={src} alt={alt} sizes="100vw" quality={90} />
          </div>
          <Dialog.Close className={styles.closeImage} aria-label="Close screenshot"><X size={22} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
