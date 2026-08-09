import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getAllDocSlugs } from "@/lib/docs"

/**
 * Sitemap, served at /sitemap.xml.
 *
 * Static routes are listed explicitly rather than crawled, so nothing
 * internal leaks in; /brand (the internal brand sheet) stays out. A new
 * site route needs a new entry here.
 *
 * Docs routes are the exception: they come from the content tree (see
 * lib/docs.ts), because a markdown file is the route, and a hand-written
 * list would drift.
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
