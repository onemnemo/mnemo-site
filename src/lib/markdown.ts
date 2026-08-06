import fs from "node:fs"
import path from "node:path"

import rehypeShiki from "@shikijs/rehype"
import matter from "gray-matter"
import { toString as hastToString } from "hast-util-to-string"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

import { DOCS_CONTENT_ROOT, type DocPage } from "@/lib/docs"

import type { Element, Root } from "hast"

/**
 * Markdown to HTML for doc articles, at build time only.
 *
 * Authors write plain markdown (GitHub flavored, raw HTML allowed for
 * the rare embed) and refer to neighbours the way any editor would:
 * images as `./assets/foo.png`, other articles as `./other-page.md`.
 * This pipeline turns those file-relative references into live routes,
 * so the content tree works in a markdown preview AND on the site.
 *
 * Code blocks are highlighted with Shiki here on the server; the client
 * ships zero highlighting JavaScript. Headings get ids (rehype-slug)
 * and are collected for the "On this page" rail.
 */

export interface DocHeading {
  id: string
  text: string
  /** 2 or 3; deeper levels stay out of the rail on purpose. */
  depth: number
}

export interface CompiledDoc {
  html: string
  headings: DocHeading[]
}

/** File extensions the /docs-assets route will serve. */
export const DOC_ASSET_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".svg",
])

const isRelative = (url: string) => !/^([a-z]+:|\/|#)/i.test(url)

/**
 * Resolves a file-relative reference from inside an article, verifying
 * it stays within the content root and actually exists. A broken
 * reference throws so the build fails loudly instead of shipping a
 * dead link or image.
 */
function resolveContentFile(articleFile: string, ref: string): string {
  const resolved = path.resolve(path.dirname(articleFile), ref)
  if (!resolved.startsWith(DOCS_CONTENT_ROOT)) {
    throw new Error(
      `Doc reference escapes the content tree: ${ref} in ${articleFile}`,
    )
  }
  if (!fs.existsSync(resolved)) {
    throw new Error(
      `Doc reference points at a missing file: ${ref} in ${articleFile}`,
    )
  }
  return resolved
}

const toRoutePath = (file: string) =>
  path.relative(DOCS_CONTENT_ROOT, file).split(path.sep).join("/")

/**
 * Rewrites relative images and article links, and stamps every local
 * image with its intrinsic width and height (via sharp) so the page
 * never shifts while images load.
 */
function rehypeDocRefs(articleFile: string) {
  return async (tree: Root) => {
    const images: Element[] = []

    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        if (isRelative(node.properties.src)) images.push(node)
        return
      }
      if (node.tagName === "a" && typeof node.properties.href === "string") {
        const href = node.properties.href
        if (isRelative(href) && /\.md(#|$)/.test(href)) {
          const [file, hash] = href.split("#")
          const resolved = resolveContentFile(articleFile, file)
          const route = toRoutePath(resolved)
            .replace(/(^|\/)index\.md$/, "")
            .replace(/\.md$/, "")
            .replace(/\/$/, "")
          node.properties.href = `/docs/${route}${hash ? `#${hash}` : ""}`
        }
      }
    })

    // sharp is imported lazily so this module can load in contexts that
    // never touch images (the sitemap walks the tree through lib/docs,
    // but page rendering is the only image consumer).
    const sharp = images.length > 0 ? (await import("sharp")).default : null
    for (const node of images) {
      const resolved = resolveContentFile(
        articleFile,
        node.properties.src as string,
      )
      const ext = path.extname(resolved).toLowerCase()
      if (!DOC_ASSET_EXTENSIONS.has(ext)) {
        throw new Error(`Doc image has an unsupported extension: ${resolved}`)
      }
      const meta = await sharp!(resolved).metadata()
      node.properties.src = `/docs-assets/${toRoutePath(resolved)}`
      node.properties.width = meta.width
      node.properties.height = meta.height
      node.properties.loading = "lazy"
      node.properties.decoding = "async"
    }
  }
}

/** Collects h2/h3 ids and texts after rehype-slug has assigned the ids. */
function rehypeCollectHeadings(sink: DocHeading[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return
      if (typeof node.properties.id !== "string") return
      sink.push({
        id: node.properties.id,
        text: hastToString(node),
        depth: node.tagName === "h2" ? 2 : 3,
      })
    })
  }
}

export async function compileDoc(page: DocPage): Promise<CompiledDoc> {
  const { content } = matter(fs.readFileSync(page.file, "utf8"))
  const headings: DocHeading[] = []

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings, headings)
    .use(rehypeDocRefs, page.file)
    .use(rehypeShiki, {
      /* One light theme: the site has no dark mode. Shiki inlines the
         colors, so there is nothing to theme at runtime anyway. */
      theme: "github-light",
    })
    .use(rehypeStringify)
    .process(content)

  return { html: String(file), headings }
}
