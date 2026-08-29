import Link from "next/link"

import { ComingSoonPill } from "@/components/coming-soon-pill"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { rebuild, siteConfig } from "@/config/site"

/**
 * Closing call to action. The last thing before the footer, so it repeats the
 * one action that matters and nothing else.
 *
 * The one warm band on the page. Ink on butter measures 10.8 and ink-2
 * measures 5.4; the legibility problem this band used to have was opacity
 * muting, not the yellow. ink-3 is not cleared here.
 *
 * The secondary action is a text link rather than a second button. Two pills
 * side by side made the reader choose between them; the download is the only
 * thing being asked for, and the repository is where someone who is not going
 * to download goes instead.
 */
export function DownloadCta() {
  return (
    <Section canvas="butter" className="relative overflow-hidden">
      {/* Two doodles, big enough to read as drawings rather than as texture. */}
      <Doodle name="dark-24" className="top-12 left-[8%] w-24 opacity-30" />
      <Doodle
        name="dark-18"
        className="right-[10%] bottom-16 w-16 -rotate-12 opacity-25"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="type-h2 reveal-rise mx-auto max-w-2xl sm:text-[3.25rem]">
            {rebuild.active
              ? "A new Mnemo is on the way."
              : "Built for your next study session."}
          </h2>
          <p
            className="type-lede text-ink-2 reveal-rise mx-auto mt-5 max-w-md text-pretty"
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          >
            {rebuild.active
              ? "We're rebuilding the desktop app from the interface up. Downloads will return when the new version is ready to use every day."
              : "Download it, explore the source, and help shape what comes next."}
          </p>
          <div
            className="reveal-rise mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          >
            {rebuild.active ? (
              <ComingSoonPill
                label="See what's coming"
                href="/download"
                className="px-7 py-3.5"
              />
            ) : (
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/download">Download Mnemo</Link>
              </Button>
            )}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink-2 font-mono text-sm font-medium underline underline-offset-4 transition-colors"
            >
              View on GitHub
            </a>
          </div>
          <p
            className="text-ink-2 reveal-rise mt-6 text-sm"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            Free and open source for Windows, macOS, and Linux.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
