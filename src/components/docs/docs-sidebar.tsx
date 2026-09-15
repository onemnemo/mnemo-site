import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"

import { getAudienceTree, type AudienceSlug, type DocFolder, type DocNode } from "@/lib/docs"
import styles from "./navigation.module.css"

const docHref = (slug: string[]) => `/docs/${slug.join("/")}`

function NavLink({ node, activeHref }: { node: DocNode; activeHref: string }) {
  const href = docHref(node.slug)
  return (
    <Link href={href} aria-current={href === activeHref ? "page" : undefined} className={styles.link}>
      {node.kind === "page" ? node.meta.title : node.title}
    </Link>
  )
}

function NavFolder({ folder, activeHref }: { folder: DocFolder; activeHref: string }) {
  const href = docHref(folder.slug)
  const active = activeHref === href || activeHref.startsWith(`${href}/`)
  return (
    <details className={styles.group} open={active || folder.slug.at(-1) === "getting-started"}>
      <summary>{folder.title}<ChevronDown size={13} aria-hidden /></summary>
      <ul>
        <li><Link href={href} className={styles.link} aria-current={href === activeHref ? "page" : undefined}>Introduction</Link></li>
        {folder.children.map((child) => (
          <li key={docHref(child.slug)}>
            {child.kind === "folder" ? <NavFolder folder={child} activeHref={activeHref} /> : <NavLink node={child} activeHref={activeHref} />}
          </li>
        ))}
      </ul>
    </details>
  )
}

export function DocsSidebar({ audience, activeSlug }: { audience: AudienceSlug; activeSlug: string[] }) {
  const tree = getAudienceTree(audience)
  const activeHref = docHref(activeSlug)
  const sections = tree.children.flatMap((node) =>
    node.kind === "folder" && node.slug.at(-1) === "modules" ? node.children : [node],
  )

  return (
    <nav aria-label="Docs sections" className={styles.navigation}>
      <Link href="/docs" className={styles.home}><ArrowLeft size={14} aria-hidden />Documentation</Link>
      <Link href={docHref(tree.slug)} className={styles.audience} aria-current={activeHref === docHref(tree.slug) ? "page" : undefined}>
        {audience === "users" ? "Use Mnemo" : "Build Mnemo"}
      </Link>
      {sections.map((node) => node.kind === "folder" && node.children.length > 0 ? (
        <NavFolder key={docHref(node.slug)} folder={node} activeHref={activeHref} />
      ) : (
        <div className={styles.standalone} key={docHref(node.slug)}><NavLink node={node} activeHref={activeHref} /></div>
      ))}
    </nav>
  )
}
