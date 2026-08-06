/**
 * Single source of truth for site-wide constants.
 *
 * Anything that appears in more than one place (navigation, metadata, structured
 * data, footer links) is defined here so a change lands everywhere at once.
 * Keeping this as plain data also means the SEO layer and the UI layer never
 * drift apart.
 */

export const siteConfig = {
  name: "Mnemo",

  /**
   * Used verbatim as the `<title>` on the home page and as the fallback
   * OpenGraph title. Kept under 60 characters so search engines do not truncate.
   */
  title: "Mnemo: Free, open-source, local-first learning platform",

  /**
   * Used as the default meta description. Kept under 160 characters.
   */
  description:
    "Flashcards, notes, mindmaps, and learning paths in one focused desktop app. Free and open source, runs offline, and your data never leaves your machine.",

  /**
   * Absolute origin, no trailing slash. Required by the Metadata API to resolve
   * relative URLs into absolute ones for OpenGraph and canonical tags.
   */
  url: "https://mnemo.one",

  /** Shown in structured data and the footer. */
  license: "Apache-2.0",

  links: {
    github: "https://github.com/onemnemo/mnemo",
    releases: "https://github.com/onemnemo/mnemo/releases/latest",
    issues: "https://github.com/onemnemo/mnemo/issues",
    org: "https://github.com/onemnemo",
  },
} as const

/**
 * Primary navigation.
 *
 * `Features` points at a section on the home page rather than its own route,
 * because the landing page already covers it. If that section ever outgrows the
 * home page, changing the href here is the only edit required.
 *
 * Download is deliberately absent: the header's pill button is the one
 * Download CTA at desktop widths, and a second copy in the center nav
 * read as noise. The mobile drawer supplies its own Download button for
 * the widths where the pill is hidden. (Routes are listed by hand in
 * sitemap.ts, so nav membership never affects the sitemap.)
 */
export const mainNav = [
  { title: "Features", href: "/#features" },
  { title: "Why it works", href: "/science" },
  { title: "Docs", href: "/docs" },
] as const

export type SiteConfig = typeof siteConfig
