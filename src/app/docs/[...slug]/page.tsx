import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsSearch } from "@/components/docs/docs-search"
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav"
import { SchedulingFigure } from "@/components/docs/scheduling-figure"
import { TocRail } from "@/components/docs/toc-rail"
import { siteConfig } from "@/config/site"
import {
  flattenAudience,
  getAllDocSlugs,
  getAudienceTree,
  getBreadcrumbs,
  resolveDocNode,
  type AudienceSlug,
  type DocFolder,
  type DocPage,
} from "@/lib/docs"
import { getDocSearchEntries } from "@/lib/docs-search"
import { compileDoc } from "@/lib/markdown"
import styles from "@/components/docs/reader.module.css"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }))
}

type Params = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const node = resolveDocNode(slug)
  if (!node) return {}
  const title = node.kind === "page" ? node.meta.title : node.title
  const description = (node.kind === "page" ? node.meta.description : node.description) ?? `Mnemo documentation: ${title}.`
  return { title: `${title} | Docs`, description, alternates: { canonical: `/docs/${slug.join("/")}` } }
}

const docHref = (slug: string[]) => `/docs/${slug.join("/")}`

function Breadcrumbs({ slug }: { slug: string[] }) {
  const crumbs = getBreadcrumbs(slug).filter((crumb) => crumb.slug.at(-1) !== "modules")
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol>
        <li><Link href="/docs">Documentation</Link></li>
        {crumbs.map((crumb) => (
          <li key={docHref(crumb.slug)}>
            <span aria-hidden>/</span>
            <Link href={docHref(crumb.slug)}>{crumb.slug.length === 1 ? (crumb.slug[0] === "users" ? "Use Mnemo" : "Build Mnemo") : crumb.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function PrevNext({ audience, slug }: { audience: AudienceSlug; slug: string[] }) {
  const flat = flattenAudience(getAudienceTree(audience))
  const here = flat.findIndex((entry) => entry.slug.join("/") === slug.join("/"))
  const prev = here > 0 ? flat[here - 1] : null
  const next = here >= 0 && here < flat.length - 1 ? flat[here + 1] : null
  if (!prev && !next) return null
  return (
    <nav aria-label="Article navigation" className={styles.prevNext}>
      {prev ? <Link href={docHref(prev.slug)}><ArrowLeft size={17} aria-hidden /><span><small>Previous</small>{prev.title}</span></Link> : <span />}
      {next && <Link href={docHref(next.slug)} className={styles.next}><span><small>Next</small>{next.title}</span><ArrowRight size={17} aria-hidden /></Link>}
    </nav>
  )
}

function FolderIndex({ folder }: { folder: DocFolder }) {
  return (
    <div className={styles.folderIndex}>
      {folder.children.map((child) => {
        const title = child.kind === "page" ? child.meta.title : child.title
        const description = child.kind === "page" ? child.meta.description : child.description
        return (
          <Link key={docHref(child.slug)} href={docHref(child.slug)}>
            <h2>{title}<ArrowRight size={17} aria-hidden /></h2>
            {description && <p>{description}</p>}
          </Link>
        )
      })}
    </div>
  )
}

function RelatedGuides({ slug }: { slug: string[] }) {
  const parent = resolveDocNode(slug.slice(0, -1))
  if (!parent || parent.kind !== "folder") return null
  const siblings = parent.children.filter((child) => child.kind === "page")
  const current = siblings.findIndex((child) => docHref(child.slug) === docHref(slug))
  const nearby = siblings.filter((child) => docHref(child.slug) !== docHref(slug))
    .sort((a, b) => Math.abs(siblings.indexOf(a) - current) - Math.abs(siblings.indexOf(b) - current)).slice(0, 3)
  if (!nearby.length) return null
  return (
    <nav aria-label="Related guides" className={styles.railSection}>
      <h2>Related guides</h2>
      {nearby.map((page) => <Link key={docHref(page.slug)} href={docHref(page.slug)}><ArrowRight size={13} aria-hidden />{page.meta.title}</Link>)}
    </nav>
  )
}

export default async function DocPage({ params }: Params) {
  const { slug } = await params
  const node = resolveDocNode(slug)
  if (!node) notFound()
  const audience = slug[0] as AudienceSlug
  const page: DocPage | undefined = node.kind === "page" ? node : node.index
  const compiled = page ? await compileDoc(page) : null
  const title = slug.length === 1 ? (audience === "users" ? "Use Mnemo" : "Build Mnemo") : node.kind === "page" ? node.meta.title : node.title
  const description = node.kind === "page" ? node.meta.description : node.description
  const feedbackHref = `${siteConfig.links.siteIssues}/new?${new URLSearchParams({ title: `Documentation: ${title}`, body: `Page: ${siteConfig.url}${docHref(slug)}\n\nSuggestion or correction:\n` })}`
  const isScheduling = slug.join("/") === "users/modules/flashcards/how-scheduling-works"

  return (
    <main id="main-content" className={styles.reader}>
      <aside className={styles.sidebar}>
        <DocsSearch entries={getDocSearchEntries()} />
        <div className={styles.desktopNav}><DocsSidebar key={slug.join("/")} audience={audience} activeSlug={slug} /></div>
        <MobileDocsNav label={audience === "users" ? "user" : "developer"}>
          <DocsSidebar audience={audience} activeSlug={slug} />
        </MobileDocsNav>
      </aside>
      <article className={styles.article}>
        <Breadcrumbs slug={slug} />
        <h1>{title}</h1>
        {description && <p className={styles.lead}>{description}</p>}
        {isScheduling && <SchedulingFigure />}
        {compiled && <div className={styles.prose} dangerouslySetInnerHTML={{ __html: compiled.html }} />}
        {node.kind === "folder" && <FolderIndex folder={node} />}
        <PrevNext audience={audience} slug={slug} />
      </article>
      <aside className={styles.rail}>
        {compiled && compiled.headings.length > 0 && <TocRail key={slug.join("/")} headings={compiled.headings} />}
        {node.kind === "page" && <RelatedGuides slug={slug} />}
        <div className={styles.railSection}>
          <h2>Help improve this guide</h2>
          <p>Something unclear or missing? We’d like to hear.</p>
          <a href={feedbackHref} target="_blank" rel="noreferrer">Share feedback<ArrowUpRight size={13} aria-hidden /></a>
        </div>
      </aside>
    </main>
  )
}
