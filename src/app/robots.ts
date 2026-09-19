import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * Robots policy, served at /robots.txt.
 *
 * Everything is crawlable. llms.txt in /public carries a curated summary
 * for crawlers that look for it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
