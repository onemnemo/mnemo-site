import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Docs live in src/content/docs/<section>/... where <section> is
 * "students" or "developers". Drop a .md file in and it appears in the
 * sidebar automatically. Files starting with an underscore are ignored.
 *
 * Frontmatter:
 *   title        required, the page heading and sidebar label
 *   description  optional, used for meta tags and the docs landing page
 *   category     optional, sidebar group label. Pages without one go to "Overview".
 *   order        optional number, sorts pages within a category (lower first).
 *                Groups are ordered by the lowest order value they contain,
 *                so give each category its own range (0-9, 10-19, ...).
 *   draft        optional, true hides the page entirely
 */
const docs = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    order: z.number().default(999),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
