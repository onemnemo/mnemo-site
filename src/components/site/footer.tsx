import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

/**
 * Site footer.
 *
 * Sized for growth: the column list is data, so future sections (community,
 * blog, legal) are one entry each.
 *
 * The footer has no top border on purpose: a page ends with a TornEdge, and
 * a full-width rule under a torn edge reads as two competing seams. Soma
 * lives on that edge (see torn-edge.tsx) rather than here, because the
 * mascot needs a boundary to be cut off by.
 */

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Why it works", href: "/science" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Releases", href: siteConfig.links.releases, external: true },
      { label: "Source code", href: siteConfig.links.github, external: true },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Issues", href: siteConfig.links.issues, external: true },
      {
        label: "Contributing",
        href: `${siteConfig.links.github}/blob/main/CONTRIBUTING.md`,
        external: true,
      },
      {
        label: "Code of conduct",
        href: `${siteConfig.links.github}/blob/main/CODE_OF_CONDUCT.md`,
        external: true,
      },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer>
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logos/logo_full.svg"
                alt={`${siteConfig.name} home`}
                width={340}
                height={50}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
              Free, open-source studying. Built by learners, for learners.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-mono text-xs tracking-widest uppercase opacity-60">
                {column.heading}
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="text-muted-foreground mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-xs">
          <p>
            © {new Date().getFullYear()} Mnemo contributors · {siteConfig.license}
          </p>
          <p className="font-mono tracking-wide">
            Local-first. Your notes are nobody&apos;s business.
          </p>
        </div>
      </Container>
    </footer>
  )
}
