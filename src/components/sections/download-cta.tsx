import Link from "next/link"

import { ComingSoonPill } from "@/components/coming-soon-pill"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { rebuild } from "@/config/site"

/**
 * Closing call to action. The last thing before the footer, so it repeats the
 * one action that matters and nothing else.
 *
 * The one warm band on the page. Ink on butter measures 10.8 and ink-2
 * measures 5.4; the legibility problem this band used to have was opacity
 * muting, not the yellow. ink-3 is not cleared here.
 */
export function DownloadCta() {
  return (
    <Section canvas="butter" className="relative overflow-hidden">
      {/* Two doodles, big enough to read as drawings rather than as texture. */}
      <Doodle name="dark-24" className="top-12 left-[8%] w-24 opacity-25" />
      <Doodle
        name="dark-18"
        className="right-[10%] bottom-16 w-16 -rotate-12 opacity-20"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="type-h2 reveal-rise mx-auto max-w-2xl">
            {rebuild.active
              ? "A new Mnemo is on the way."
              : "Start studying with Mnemo."}
          </h2>
          <p
            className="type-lede text-ink-2 reveal-rise mx-auto mt-4 max-w-md"
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          >
            {rebuild.active
              ? "We are rebuilding the desktop app from the interface up. Downloads will return when the new version is ready to use every day."
              : "Download Mnemo, open it, and start studying. No account, no trial, and no subscription."}
          </p>
          <div
            className="reveal-rise mt-9 flex justify-center"
            style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          >
            {rebuild.active ? (
              <ComingSoonPill href="/download" className="px-7 py-3.5" />
            ) : (
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/download">Download Mnemo</Link>
              </Button>
            )}
          </div>
          <p
            className="text-ink-2 reveal-rise mt-6 text-sm"
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            {rebuild.active
              ? "Free and open source for Windows, macOS, and Linux when the new build ships."
              : "Free and open source for Windows, macOS, and Linux."}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
