"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "radix-ui"
import { ArrowRight, Search, X } from "lucide-react"

import type { DocSearchEntry } from "@/lib/docs-search"
import styles from "./search.module.css"

export function DocsSearch({ entries }: { entries: DocSearchEntry[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const resultsRef = useRef<HTMLUListElement>(null)
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const results = terms.length ? entries
    .map((entry) => {
      const title = entry.title.toLowerCase()
      const summary = `${title} ${entry.description} ${entry.section}`.toLowerCase()
      const matches = terms.every((term) => `${summary} ${entry.text}`.includes(term))
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 10 : summary.includes(term) ? 3 : 1), 0)
      return { entry, score: matches ? score : 0 }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(({ entry }) => entry) : []

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", shortcut)
    return () => window.removeEventListener("keydown", shortcut)
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={(value) => { setOpen(value); if (!value) setQuery("") }}>
      <Dialog.Trigger className={styles.trigger} aria-keyshortcuts="Control+k Meta+k">
        <Search size={14} aria-hidden /><span>Search documentation</span><kbd>Ctrl K</kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Dialog.Description className="sr-only">Search all user and developer guides. Press Tab to move through results.</Dialog.Description>
          <div className={styles.inputRow}>
            <Search size={19} aria-hidden />
            <input aria-label="Search documentation" placeholder="What would you like to know?" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
              if (event.key === "ArrowDown") { event.preventDefault(); resultsRef.current?.querySelector("a")?.focus() }
              if (event.key === "Enter") resultsRef.current?.querySelector("a")?.click()
            }} />
            <Dialog.Close className={styles.close} aria-label="Close search"><X size={18} /></Dialog.Close>
          </div>
          <div className={styles.results}>
            <p role="status" className={styles.status}>{!terms.length ? "Search by topic, feature, or question." : !results.length ? "No guides found. Try a different word or phrase." : `${results.length}${results.length === 15 ? "+" : ""} guides found`}</p>
            <ul ref={resultsRef}>
              {results.map((entry) => (
                <li key={entry.href}><Link href={entry.href} onClick={() => { setOpen(false); setQuery("") }}>
                  <span className={styles.section}>{entry.section}</span>
                  <span className={styles.title}>{entry.title}<ArrowRight size={16} aria-hidden /></span>
                  {entry.description && <span className={styles.description}>{entry.description}</span>}
                </Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.hint}>Searches all documentation<span>Esc to close</span></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
