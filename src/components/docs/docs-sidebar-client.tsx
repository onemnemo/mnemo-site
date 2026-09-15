"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

import styles from "./navigation.module.css"

export interface DocsNavSection {
  id: string
  href: string
  title: string
  items: { href: string; title: string }[]
}

export function DocsSidebarClient({
  activeHref,
  sections,
}: {
  activeHref: string
  sections: DocsNavSection[]
}) {
  const activeSection = sections.find((section) =>
    section.items.some((item) => item.href === activeHref),
  )
  const activeDirectLink = sections.some(
    (section) => section.items.length === 0 && section.href === activeHref,
  )
  const initialOpen = activeSection?.id ?? (
    activeDirectLink ? null : sections.find((section) => section.items.length > 0)?.id ?? null
  )
  const [openSection, setOpenSection] = useState<string | null>(initialOpen)

  return (
    <nav aria-label="Docs sections" className={styles.navigation}>
      <div className={styles.sections}>
        {sections.map((section) => {
          if (section.items.length === 0) {
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={section.href === activeHref ? "page" : undefined}
                className={styles.sectionLink}
              >
                {section.title}
              </Link>
            )
          }

          const isOpen = openSection === section.id
          const panelId = `${section.id}-panel`
          return (
            <section key={section.id} className={styles.group} data-open={isOpen}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenSection(isOpen ? null : section.id)}
              >
                {section.title}
                <ChevronDown size={13} aria-hidden />
              </button>
              <div
                id={panelId}
                className={styles.panel}
                aria-hidden={!isOpen}
                inert={!isOpen ? true : undefined}
                style={{ maxHeight: isOpen ? "32rem" : 0 }}
              >
                <ul>
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={item.href === activeHref ? "page" : undefined}
                        className={styles.link}
                        tabIndex={isOpen ? undefined : -1}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </div>
    </nav>
  )
}
