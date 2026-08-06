import Link from "next/link"

import {
  audiences,
  getAudienceTree,
  type AudienceSlug,
  type DocFolder,
  type DocNode,
} from "@/lib/docs"
import { cn } from "@/lib/utils"

/**
 * Docs navigation: audience switcher on top, then the category tree.
 *
 * Entirely server-rendered. The page passes in its own slug, so active
 * states need no client pathname hook; every docs navigation re-renders
 * the sidebar anyway. The active article carries a vertical cut of the
 * journey-spine dash (the site's "you are here" marker).
 */

const docHref = (slug: string[]) => `/docs/${slug.join("/")}`

function NavLink({ node, activeHref }: { node: DocNode; activeHref: string }) {
  const href = docHref(node.slug)
  const title = node.kind === "page" ? node.meta.title : node.title
  const isActive = href === activeHref

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative block rounded-lg py-1.5 pr-2 pl-3 text-sm transition-colors",
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
      )}
    >
      {isActive && (
        <span
          aria-hidden
          className="bg-primary absolute top-1/2 left-0 h-4 w-[3px] -translate-y-1/2 rounded-full"
        />
      )}
      {title}
    </Link>
  )
}

function NavFolder({
  folder,
  activeHref,
  depth,
}: {
  folder: DocFolder
  activeHref: string
  depth: number
}) {
  const href = docHref(folder.slug)

  return (
    <div>
      <Link
        href={href}
        aria-current={href === activeHref ? "page" : undefined}
        className={cn(
          "hover:text-foreground block transition-colors",
          depth === 0
            ? "text-foreground/80 text-xs font-semibold tracking-wider uppercase"
            : "text-foreground/90 pl-3 text-sm font-medium",
          href === activeHref && "text-primary",
        )}
      >
        {folder.title}
      </Link>
      <ul
        className={cn(
          "mt-2 space-y-0.5",
          depth > 0 && "border-border ml-3 border-l pl-1",
        )}
      >
        {folder.children.map((child) => (
          <li key={child.slug.join("/")}>
            {child.kind === "folder" ? (
              <div className="pt-2 pb-1">
                <NavFolder
                  folder={child}
                  activeHref={activeHref}
                  depth={depth + 1}
                />
              </div>
            ) : (
              <NavLink node={child} activeHref={activeHref} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DocsSidebar({
  audience,
  activeSlug,
}: {
  audience: AudienceSlug
  activeSlug: string[]
}) {
  const tree = getAudienceTree(audience)
  const activeHref = docHref(activeSlug)

  /* Articles sitting directly at the audience root (no category folder)
     get grouped under the audience landing link so they never float
     unlabeled. */
  const loosePages = tree.children.filter((child) => child.kind === "page")
  const folders = tree.children.filter((child) => child.kind === "folder")

  return (
    <nav aria-label="Docs sections" className="text-sm">
      {/* Audience tabs, in the header nav's language: quiet labels with
          the lit journey-spine dash under the one you are reading. */}
      <div className="flex gap-5 border-b">
        {audiences.map((entry) => {
          const isCurrent = entry.slug === audience
          return (
            <Link
              key={entry.slug}
              href={docHref([entry.slug])}
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "relative pb-2.5 text-sm font-medium transition-colors",
                isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.slug === "users" ? "Users" : "Developers"}
              {isCurrent && (
                <span
                  aria-hidden
                  className="bg-primary absolute -bottom-[1.5px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>

      <div className="mt-6 space-y-7">
        {loosePages.length > 0 && (
          <div>
            <Link
              href={docHref(tree.slug)}
              className="text-foreground/80 hover:text-foreground block text-xs font-semibold tracking-wider uppercase"
            >
              Overview
            </Link>
            <ul className="mt-2 space-y-0.5">
              {loosePages.map((page) => (
                <li key={page.slug.join("/")}>
                  <NavLink node={page} activeHref={activeHref} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {folders.map((folder) => (
          <NavFolder
            key={folder.slug.join("/")}
            folder={folder}
            activeHref={activeHref}
            depth={0}
          />
        ))}
      </div>
    </nav>
  )
}
