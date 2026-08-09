import { Container } from "@/components/layout/container"
import { rebuild, siteConfig } from "@/config/site"

/**
 * Status band above the header, explaining that the app is between the old
 * Avalonia build and the rebuilt one.
 *
 * Sits outside the sticky header rather than inside it: the notice is worth
 * reading once, not worth a permanent sixteenth of the viewport, so it
 * scrolls away and leaves the header to stick on its own. Cobalt because it
 * is the one canvas that reads as a system band against the paper header.
 */
export function RebuildBanner() {
  if (!rebuild.active) return null

  return (
    <div className="bg-cobalt text-cobalt-ink">
      <Container className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <span className="font-mono text-[11px] tracking-widest uppercase opacity-70">
          {rebuild.kicker}
        </span>
        <p className="max-w-3xl text-sm leading-snug text-balance opacity-90">
          {rebuild.message}{" "}
          <span className="max-sm:hidden">{rebuild.detail}</span>
        </p>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium whitespace-nowrap underline underline-offset-4"
        >
          Follow along
        </a>
      </Container>
    </div>
  )
}
