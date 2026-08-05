import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * Robots policy, served at /robots.txt.
 *
 * Everything is crawlable except the internal brand sheet. AI crawlers are
 * welcome by design; llms.txt in /public gives them a curated summary.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/brand",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
