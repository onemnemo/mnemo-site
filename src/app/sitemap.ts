import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * Sitemap, served at /sitemap.xml.
 *
 * Routes are listed explicitly rather than crawled so nothing internal leaks
 * in by accident. /brand is deliberately absent (internal brand sheet).
 * When a route is added to the site, add it here; the list is short on
 * purpose so the diff is obvious in review.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/download", priority: 0.9 },
    { path: "/science", priority: 0.8 },
    { path: "/docs", priority: 0.7 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }))
}
