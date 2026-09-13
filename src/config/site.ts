export const siteConfig = {
  name: "Mnemo",
  title: "Mnemo: A home for what you are learning",
  description:
    "Write notes, practise with flashcards, and connect ideas on a mind map. Mnemo brings your study tools together in one free, open-source desktop app.",
  url: "https://mnemo.one",
  license: "Apache-2.0",
  links: {
    github: "https://github.com/onemnemo/mnemo",
    releases: "https://github.com/onemnemo/mnemo/releases",
    issues: "https://github.com/onemnemo/mnemo/issues",
    org: "https://github.com/onemnemo",
  },
} as const

export const rebuild = {
  active: false,
  kicker: "Rebuilding",
  message: "Mnemo is being rebuilt. Downloads are paused and some screenshots are out of date.",
  ctaLabel: "Downloads coming soon",
} as const

export const mainNav = [
  { title: "The app", href: "/#features" },
  { title: "Science", href: "/science" },
  { title: "Our story", href: "/#story" },
  { title: "Docs", href: "/docs" },
] as const

export type SiteConfig = typeof siteConfig
