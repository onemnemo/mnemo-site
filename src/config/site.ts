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
  title: "Mnemo: Notes, flashcards, and mind maps for serious studying",

  /**
   * Used as the default meta description. Kept under 160 characters.
   */
  description:
    "A free, open-source study app with a Notion-style notes editor, FSRS flashcards, and flexible mind maps. Works offline and keeps your data on your machine.",

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
    "Mnemo is being rebuilt, so downloads are paused while we finish the new desktop app.",

  /**
   * The why, dropped below the sm breakpoint: at phone widths the full text
   * costs a third of the fold, and /download carries the whole story anyway.
   */
  detail:
    "We are moving Mnemo to a new interface and rebuilding every screen. Some screenshots on the site still show the current app while the new version takes shape.",

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
