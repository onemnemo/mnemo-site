/**
 * Single source of truth for site-wide constants.
 *
 * Anything that appears in more than one place (navigation, metadata, structured
 * data, footer links) is defined here, so the SEO layer and the UI layer cannot
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
 * The rebuild.
 *
 * Mnemo is mid-port from Avalonia to React + Photino, with a full visual
 * overhaul riding along, so the last shipped build is a step behind both the
 * screenshots and the app being written. Until the new one lands there is
 * nothing honest to hand someone, so `active` gates two things site-wide: the
 * banner above the header, and the coming-soon state that stands in for every
 * download CTA.
 *
 * Flip `active` to false when the first build of the new app ships. Nothing
 * else needs editing; the original download module is untouched behind it.
 */
export const rebuild = {
  active: true,

  /** Short all-caps tag at the head of the banner. */
  kicker: "Rebuilding",

  /** The part that has to survive at every width. */
  message:
    "Mnemo is being rebuilt, so downloads are paused until the new app ships.",

  /**
   * The why, dropped below the sm breakpoint: at phone widths the full text
   * costs a third of the fold, and /download carries the whole story anyway.
   */
  detail:
    "We are porting from Avalonia to React and Photino and redrawing every screen, so the screenshots here are a mix of the old app and the new one.",

  /** Label on the pills that replace the download buttons. */
  ctaLabel: "Downloads coming soon",
} as const

/**
 * Primary navigation.
 *
 * `Features` points at a section on the home page rather than its own route.
 *
 * Download is absent: the header's pill button is the only Download CTA at
 * desktop widths, and the mobile drawer supplies its own for the widths where
 * the pill is hidden. Routes are listed by hand in sitemap.ts, so membership
 * here never affects the sitemap.
 */
export const mainNav = [
  { title: "Features", href: "/#features" },
  { title: "Why it works", href: "/science" },
  { title: "Docs", href: "/docs" },
] as const

export type SiteConfig = typeof siteConfig
