import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

/**
 * Site footer.
 *
 * Columns are data, so a new footer section is one entry.
 *
 * There is no top border: pages end with a TornEdge, and a full-width rule
 * under a torn edge reads as two competing seams. The mascot sits on that
 * edge (see torn-edge.tsx) rather than here, since it needs a boundary to be
 * cut off by.
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
            <p className="text-ink-2 mt-4 max-w-xs text-sm leading-relaxed">
              Notes, flashcards, and mind maps. Free and open source.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="type-eyebrow">
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
                        className="text-ink-2 hover:text-ink text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-ink-2 hover:text-ink text-sm transition-colors"
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

        <div className="text-ink-2 border-line mt-16 flex flex-wrap items-center gap-4 border-t pt-8 text-xs">
          <p>
            © {new Date().getFullYear()} Mnemo contributors · {siteConfig.license}
          </p>
        </div>
      </Container>
    </footer>
  )
}
