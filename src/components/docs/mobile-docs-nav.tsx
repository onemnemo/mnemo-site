"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

import styles from "./reader.module.css"

export function MobileDocsNav({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.mobileNav} data-open={open}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-docs-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Browse {label} docs
        <ChevronDown size={16} aria-hidden />
      </button>
      <div
        id="mobile-docs-navigation"
        className={styles.mobileNavPanel}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className={styles.mobileNavContent}>{children}</div>
      </div>
    </div>
  )
}
