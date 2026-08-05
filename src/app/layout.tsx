import type { Metadata, Viewport } from "next"
import { Fraunces, Geist, Geist_Mono } from "next/font/google"

import { SiteJsonLd } from "@/components/seo/json-ld"
import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { OverscrollBand } from "@/components/site/overscroll-band"
import { siteConfig } from "@/config/site"

import "./globals.css"

/**
 * next/font downloads and self-hosts these at build time, so there is no
 * request to a third-party font CDN at runtime. The CSS variable names match
 * the ones globals.css maps into Tailwind's `font-sans`, `font-mono`, and
 * `font-heading` utilities.
 */
const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})

/**
 * Display serif for headlines. Variable weight, with the optical size axis
 * enabled so large sizes render with the tighter, more characterful cut.
 */
const fontHeading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
})

export const metadata: Metadata = {
  /**
   * Resolves every relative URL below (and in child routes) into an absolute
   * one. Without this, OpenGraph and canonical tags emit relative paths, which
   * most crawlers and social scrapers reject.
   */
  metadataBase: new URL(siteConfig.url),

  /**
   * Child routes set only their own `title`, and it gets slotted into the
   * template. The home page overrides this with `absolute` so it does not read
   * as "Mnemo | Mnemo".
   */
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  /**
   * Drives the browser chrome colour on mobile. Two entries let it track the
   * active colour scheme instead of forcing one.
   */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable}`}
    >
      <body className="bg-background text-foreground min-h-svh antialiased">
        {/* Keyboard users can jump past the header. Every page's <main> must
            carry id="main-content" for this to land somewhere. */}
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <OverscrollBand />
        {/* The opaque z-0 wrapper is what keeps the overscroll band
            invisible under every page; only the gap the elastic pull opens
            beyond the document exposes it. The data attribute is how
            overscroll-band.tsx finds this element to translate it. See
            palette-band.tsx before touching background or stacking here. */}
        <div data-overscroll-page className="bg-background relative z-0 min-h-svh">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <SiteJsonLd />
      </body>
    </html>
  )
}
