"use client"

import Image, { type StaticImageData } from "next/image"
import { Dialog } from "radix-ui"
import { Expand, X } from "lucide-react"

import styles from "./product-tour.module.css"

export function ProductImage({ src, alt, label, priority = false }: {
  src: StaticImageData
  alt: string
  label: string
  priority?: boolean
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.imageTrigger} aria-label={label}>
        <Image
          src={src}
          alt={alt}
          sizes="(max-width: 650px) 100vw, (max-width: 1150px) 90vw, 1240px"
          quality={90}
          priority={priority}
        />
        <span className={styles.expandIcon} aria-hidden><Expand size={18} /></span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.imageOverlay} />
        <Dialog.Content className={styles.imageDialog}>
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <Dialog.Description className="sr-only">{alt}</Dialog.Description>
          <div className={styles.imageScroll}>
            <Image src={src} alt={alt} sizes="(max-width: 650px) 900px, 100vw" quality={90} />
          </div>
          <Dialog.Close className={styles.closeImage} aria-label="Close screenshot"><X size={22} /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
