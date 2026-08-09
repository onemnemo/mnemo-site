import { siteConfig } from "@/config/site"

/**
 * Structured data (JSON-LD) for search engines and AI crawlers.
 *
 * Two graphs:
 * - SiteJsonLd goes in the root layout: WebSite plus the Organization that
 *   publishes it.
 * - SoftwareAppJsonLd goes on the home page: the app itself, with the
 *   zero-price offer that makes "free" machine-readable.
 *
 * Rendered as inline scripts; JSON.stringify output contains no user input,
 * so there is nothing to escape.
 */

const organization = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#org`,
  name: siteConfig.name,
  url: siteConfig.url,
  sameAs: [siteConfig.links.org, siteConfig.links.github],
}

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#org` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function SoftwareAppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    downloadUrl: `${siteConfig.url}/download`,
    author: { "@id": `${siteConfig.url}/#org` },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
