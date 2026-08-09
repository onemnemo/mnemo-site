import fs from "node:fs"
import path from "node:path"

import { DOCS_CONTENT_ROOT } from "@/lib/docs"
import { DOC_ASSET_EXTENSIONS } from "@/lib/markdown"

/**
 * Serves images that live inside the docs content tree.
 *
 * Doc articles keep their screenshots in an `assets` folder next to the
 * markdown that uses them (src/content/docs/users/modules/mindmaps/assets/...),
 * which public/ cannot reach. The markdown pipeline rewrites those
 * relative references to /docs-assets/<path-inside-content-tree>, and
 * this handler streams the file back. Only known image extensions are
 * served, and the resolved path must stay inside the content root, so
 * the route cannot be used to read anything else.
 */

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params
  const resolved = path.resolve(DOCS_CONTENT_ROOT, ...segments)
  const ext = path.extname(resolved).toLowerCase()

  if (
    !resolved.startsWith(DOCS_CONTENT_ROOT) ||
    !DOC_ASSET_EXTENSIONS.has(ext) ||
    !fs.existsSync(resolved)
  ) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(new Uint8Array(fs.readFileSync(resolved)), {
    headers: {
      "Content-Type": MIME[ext],
      /* Content changes only with deploys; an hour keeps navigation
         snappy without pinning stale screenshots for days. */
      "Cache-Control": "public, max-age=3600",
    },
  })
}
