import fs from "node:fs"
import matter from "gray-matter"

import { audiences, getAudienceTree, type DocNode } from "@/lib/docs"

export interface DocSearchEntry {
  href: string
  title: string
  section: string
  description: string
  text: string
}

export function getDocSearchEntries(): DocSearchEntry[] {
  const entries: DocSearchEntry[] = []
  function walk(node: DocNode, section: string) {
    const page = node.kind === "page" ? node : node.index
    const title = node.kind === "page" ? node.meta.title : node.title
    entries.push({
      href: `/docs/${node.slug.join("/")}`,
      title,
      section,
      description: page?.meta.description ?? "",
      text: page ? matter(fs.readFileSync(page.file, "utf8")).content.toLowerCase() : "",
    })
    if (node.kind === "folder") {
      for (const child of node.children) walk(child, `${section} / ${title}`)
    }
  }
  for (const audience of audiences) {
    const tree = getAudienceTree(audience.slug)
    tree.title = audience.slug === "users" ? "Use Mnemo" : "Build Mnemo"
    if (audience.slug === "users") {
      for (const child of tree.children) walk(child, "Documentation")
    } else {
      walk(tree, "Documentation")
    }
  }
  return entries
}
