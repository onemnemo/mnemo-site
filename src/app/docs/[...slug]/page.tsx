import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { Container } from "@/components/layout/container"
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
import { compileDoc, type DocHeading } from "@/lib/markdown"

/**
 * Every documentation route below /docs: audience roots, category
 * pages, and articles. One catch-all so the content tree alone decides
 * what exists; adding a markdown file adds a route.
 *
 * All pages are prerendered at build time from the tree walk, and
 * unknown slugs 404 (dynamicParams=false), so no request ever touches
 * the filesystem in production.
 */

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
  const description =
    (node.kind === "page" ? node.meta.description : node.description) ??
    `Mnemo documentation: ${title}.`

  return {
    title: `${title} | Docs`,
    description,
    alternates: { canonical: `/docs/${slug.join("/")}` },
  }
}

const docHref = (slug: string[]) => `/docs/${slug.join("/")}`

function Breadcrumbs({ slug }: { slug: string[] }) {
  /* The trail starts at the audience ("For users"), not at a /docs
     root; /docs only redirects there. Audience roots have no trail. */
  const crumbs = getBreadcrumbs(slug)
  if (crumbs.length === 0) return null
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => (
          <li
            key={crumb.slug.join("/") || "root"}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <span aria-hidden className="text-border select-none">
                /
              </span>
            )}
            <Link
              href={docHref(crumb.slug)}
              className="hover:text-foreground transition-colors"
            >
              {crumb.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function TocRail({ headings }: { headings: DocHeading[] }) {
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="text-foreground/80 text-xs font-semibold tracking-wider uppercase">
        On this page
      </p>
      <ul className="border-border mt-3 space-y-2 border-l pl-4">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.depth === 3 ? "pl-3" : undefined}
          >
            <a
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-foreground block transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function PrevNext({
  audience,
  slug,
}: {
  audience: AudienceSlug
  slug: string[]
}) {
  const flat = flattenAudience(getAudienceTree(audience))
  const here = flat.findIndex(
    (entry) => entry.slug.join("/") === slug.join("/"),
  )
  const prev = here > 0 ? flat[here - 1] : null
  const next = here >= 0 && here < flat.length - 1 ? flat[here + 1] : null
  if (!prev && !next) return null

  return (
    <div className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={docHref(prev.slug)}
          className="group bg-card hover:border-foreground/25 rounded-2xl border p-4 transition-colors"
        >
          <span className="text-muted-foreground text-xs">Previous</span>
          <span className="group-hover:text-primary mt-1 block font-medium transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next && (
        <Link
          href={docHref(next.slug)}
          className="group bg-card hover:border-foreground/25 rounded-2xl border p-4 text-right transition-colors"
        >
          <span className="text-muted-foreground text-xs">Next</span>
          <span className="group-hover:text-primary mt-1 block font-medium transition-colors">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  )
}

/** Card list a category page shows for its children. */
function FolderIndex({ folder }: { folder: DocFolder }) {
  if (folder.children.length === 0) return null
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {folder.children.map((child) => {
        const title = child.kind === "page" ? child.meta.title : child.title
        const description =
          child.kind === "page" ? child.meta.description : child.description
        return (
          <Link
            key={child.slug.join("/")}
            href={docHref(child.slug)}
            className="group bg-card hover:border-foreground/25 rounded-2xl border p-5 transition-colors"
          >
            <h2 className="group-hover:text-primary font-sans text-base font-semibold transition-colors">
              {title}
              {child.kind === "folder" && (
                <span className="text-muted-foreground ml-2 text-xs font-normal">
                  {child.children.length}{" "}
                  {child.children.length === 1 ? "article" : "articles"}
                </span>
              )}
            </h2>
            {description && (
              <p className="text-muted-foreground mt-1.5 text-sm">
                {description}
              </p>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default async function DocPage({ params }: Params) {
  const { slug } = await params
  const node = resolveDocNode(slug)
  if (!node) notFound()

  const audience = slug[0] as AudienceSlug
  const page: DocPage | undefined = node.kind === "page" ? node : node.index
  const compiled = page ? await compileDoc(page) : null

  const title = node.kind === "page" ? node.meta.title : node.title
  const description =
    node.kind === "page" ? node.meta.description : node.description
  const showToc =
    node.kind === "page" && compiled !== null && compiled.headings.length >= 2

  return (
    <main id="main-content">
      <Container className="grid items-start gap-x-10 gap-y-8 py-10 sm:py-14 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_190px]">
        {/* Desktop rail. Sticky so long articles keep their map. */}
        <aside className="max-lg:hidden lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:pb-4">
          <DocsSidebar audience={audience} activeSlug={slug} />
        </aside>

        {/* Same nav as a disclosure at small widths. Plain details so it
            works before (and without) JavaScript. */}
        <details className="group rounded-2xl border lg:hidden">
          <summary className="text-foreground flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium select-none [&::-webkit-details-marker]:hidden">
            Browse docs
            <span
              aria-hidden
              className="text-muted-foreground transition-transform group-open:rotate-180"
            >
              &#9662;
            </span>
          </summary>
          <div className="border-t px-4 py-4">
            <DocsSidebar audience={audience} activeSlug={slug} />
          </div>
        </details>

        <article className="min-w-0">
          <Breadcrumbs slug={slug} />
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
              {description}
            </p>
          )}
          {compiled && (
            <div
              className="docs-prose mt-8"
              dangerouslySetInnerHTML={{ __html: compiled.html }}
            />
          )}
          {node.kind === "folder" && <FolderIndex folder={node} />}
          <PrevNext audience={audience} slug={slug} />
        </article>

        {showToc && (
          <aside className="max-xl:hidden xl:sticky xl:top-24">
            <TocRail headings={compiled.headings} />
          </aside>
        )}
      </Container>
    </main>
  )
}
