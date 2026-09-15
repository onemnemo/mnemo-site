import { DocsSidebarClient, type DocsNavSection } from "@/components/docs/docs-sidebar-client"
import { getAudienceTree, type AudienceSlug, type DocFolder, type DocNode } from "@/lib/docs"

const docHref = (slug: string[]) => `/docs/${slug.join("/")}`

function toNavItem(node: DocNode) {
  return {
    href: docHref(node.slug),
    title: node.kind === "page" ? node.meta.title : node.title,
  }
}

function toSection(folder: DocFolder): DocsNavSection {
  return {
    id: folder.slug.join("-"),
    href: docHref(folder.slug),
    title: folder.title === "Mindmaps" ? "Mind maps" : folder.title,
    items: [
      { href: docHref(folder.slug), title: "Introduction" },
      ...folder.children.flatMap((child) =>
        child.kind === "folder"
          ? [toNavItem(child), ...child.children.map(toNavItem)]
          : [toNavItem(child)],
      ),
    ],
  }
}

export function DocsSidebar({ audience, activeSlug }: { audience: AudienceSlug; activeSlug: string[] }) {
  const tree = getAudienceTree(audience)
  const activeHref = docHref(activeSlug)
  const nodes = tree.children.flatMap((node) =>
    node.kind === "folder" && node.slug.at(-1) === "modules" ? node.children : [node],
  )
  const sections: DocsNavSection[] = nodes.map((node) =>
    node.kind === "folder" && node.children.length > 0
      ? toSection(node)
      : {
          id: node.slug.join("-"),
          href: docHref(node.slug),
          title: node.kind === "page" ? node.meta.title : node.title,
          items: [],
        },
  )

  return (
    <DocsSidebarClient
      key={activeHref}
      activeHref={activeHref}
      sections={sections}
    />
  )
}
