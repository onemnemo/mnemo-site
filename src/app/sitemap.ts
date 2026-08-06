import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getAllDocSlugs } from "@/lib/docs"

/**
 * Sitemap, served at /sitemap.xml.
 *
 * Static routes are listed explicitly rather than crawled so nothing
 * internal leaks in by accident. /brand is deliberately absent (internal
 * brand sheet). When a route is added to the site, add it here; the list
 * is short on purpose so the diff is obvious in review.
 *
 * Docs routes are the one exception: they come from the content tree
 * (see lib/docs.ts), because a markdown file IS the route and listing
 * them by hand would drift immediately.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/download", priority: 0.9 },
    { path: "/science", priority: 0.8 },
    /* /docs itself is a redirect to /docs/users and stays out. */
    ...getAllDocSlugs().map((slug) => ({
      path: `/docs/${slug.join("/")}`,
      priority: 0.6,
    })),
  ]

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }))
}
