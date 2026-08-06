import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

/**
 * Filesystem-driven documentation content.
 *
 * Articles are plain markdown files under src/content/docs. The folder
 * tree IS the information architecture: the first segment is the
 * audience (users or developers), every folder below it is a category,
 * and the file name is the article slug. Nothing here is registered
 * anywhere; drop a .md file in the tree and it ships with the next
 * build.
 *
 *   src/content/docs/
 *     users/
 *       modules/
 *         mindmaps/
 *           assets/          <- images for the articles beside it
 *           first-steps.md   <- /docs/users/modules/mindmaps/first-steps
 *
 * Rules of the tree:
 * - Folders named `assets` hold images and never become routes. Each
 *   category keeps its own, so screenshots live next to the articles
 *   that use them instead of piling up in one global folder.
 * - `index.md` in a folder is that folder's landing page and also
 *   supplies the folder's title and sort order. A folder without one
 *   still works: it takes a title-cased version of its directory name
 *   and the route renders a generated list of its children.
 * - Files and folders starting with `_` are drafts of the tree itself
 *   and are skipped, as is any article with `draft: true`.
 *
 * Everything is read synchronously and only on the server (page
 * components, sitemap, route handlers). The tree is tiny; no caching
 * layer is worth its complexity yet.
 */

export const DOCS_CONTENT_ROOT = path.join(process.cwd(), "src/content/docs")

/** Frontmatter every article may carry. Only `title` is required. */
export interface DocMeta {
  title: string
  description?: string
  /** Sort key within the folder, lowest first. Defaults to 999. */
  order: number
  draft?: boolean
}

export interface DocPage {
  kind: "page"
  /** Route segments after /docs, e.g. ["users", "modules", "mindmaps", "first-steps"]. */
  slug: string[]
  /** Absolute path to the markdown file. */
  file: string
  meta: DocMeta
}

export interface DocFolder {
  kind: "folder"
  slug: string[]
  title: string
  description?: string
  order: number
  /** The folder's index.md, when it has one. */
  index?: DocPage
  children: (DocFolder | DocPage)[]
}

export type DocNode = DocFolder | DocPage

export const audiences = [
  {
    slug: "users",
    title: "For users",
    lead: "Learn the app itself: modules, workflows, and how to make Mnemo yours.",
  },
  {
    slug: "developers",
    title: "For developers",
    lead: "Build, extend, and contribute: source setup, architecture, and conventions.",
  },
] as const

export type AudienceSlug = (typeof audiences)[number]["slug"]

/** "spaced-repetition" -> "Spaced repetition". Fallback for folders without index.md. */
function titleFromDirName(name: string): string {
  const spaced = name.replace(/-/g, " ")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

function readPage(file: string, slug: string[]): DocPage | null {
  const { data } = matter(fs.readFileSync(file, "utf8"))
  if (data.draft === true) return null
  return {
    kind: "page",
    slug,
    file,
    meta: {
      title:
        typeof data.title === "string"
          ? data.title
          : titleFromDirName(slug[slug.length - 1] ?? ""),
      description:
        typeof data.description === "string" ? data.description : undefined,
      order: typeof data.order === "number" ? data.order : 999,
      draft: data.draft === true,
    },
  }
}

function byOrderThenTitle(a: DocNode, b: DocNode): number {
  const orderA = a.kind === "page" ? a.meta.order : a.order
  const orderB = b.kind === "page" ? b.meta.order : b.order
  if (orderA !== orderB) return orderA - orderB
  const titleA = a.kind === "page" ? a.meta.title : a.title
  const titleB = b.kind === "page" ? b.meta.title : b.title
  return titleA.localeCompare(titleB)
}

function readFolder(dir: string, slug: string[]): DocFolder {
  const children: DocNode[] = []
  let index: DocPage | undefined

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name === "assets") continue
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      children.push(readFolder(full, [...slug, entry.name]))
      continue
    }
    if (!entry.name.endsWith(".md")) continue

    if (entry.name === "index.md") {
      index = readPage(full, slug) ?? undefined
      continue
    }
    const page = readPage(full, [...slug, entry.name.replace(/\.md$/, "")])
    if (page) children.push(page)
  }

  children.sort(byOrderThenTitle)

  return {
    kind: "folder",
    slug,
    title:
      index?.meta.title ?? titleFromDirName(slug[slug.length - 1] ?? "Docs"),
    description: index?.meta.description,
    order: index?.meta.order ?? 999,
    index,
    children,
  }
}

/** The whole tree for one audience. Throws if the folder is missing: that is a build error, not a 404. */
export function getAudienceTree(audience: AudienceSlug): DocFolder {
  return readFolder(path.join(DOCS_CONTENT_ROOT, audience), [audience])
}

/** Find the node (folder or page) a /docs/... slug points at, or null for a 404. */
export function resolveDocNode(slug: string[]): DocNode | null {
  const audience = audiences.find((a) => a.slug === slug[0])
  if (!audience) return null

  let node: DocNode = getAudienceTree(audience.slug)
  for (const segment of slug.slice(1)) {
    if (node.kind !== "folder") return null
    const next: DocNode | undefined = node.children.find(
      (child) => child.slug[child.slug.length - 1] === segment,
    )
    if (!next) return null
    node = next
  }
  return node
}

/**
 * Reading order for one audience: every route, depth first, in sidebar
 * order. Folder landings count as stops so prev/next can hand the
 * reader from a category page into its first article.
 */
export function flattenAudience(
  tree: DocFolder,
): { slug: string[]; title: string }[] {
  const out: { slug: string[]; title: string }[] = []
  const walk = (folder: DocFolder) => {
    out.push({ slug: folder.slug, title: folder.title })
    for (const child of folder.children) {
      if (child.kind === "folder") walk(child)
      else out.push({ slug: child.slug, title: child.meta.title })
    }
  }
  walk(tree)
  return out
}

/** Every /docs route that exists, for generateStaticParams and the sitemap. */
export function getAllDocSlugs(): string[][] {
  return audiences.flatMap((audience) =>
    flattenAudience(getAudienceTree(audience.slug)).map((entry) => entry.slug),
  )
}

/** Folder titles along a slug path, for breadcrumbs. Skips segments that resolve nowhere. */
export function getBreadcrumbs(
  slug: string[],
): { slug: string[]; title: string }[] {
  const crumbs: { slug: string[]; title: string }[] = []
  for (let depth = 1; depth < slug.length; depth++) {
    const node = resolveDocNode(slug.slice(0, depth))
    if (node && node.kind === "folder")
      crumbs.push({ slug: node.slug, title: node.title })
  }
  return crumbs
}
