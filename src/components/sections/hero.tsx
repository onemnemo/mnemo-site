import Image from "next/image"
import Link from "next/link"

// Swap for an overview capture once one exists, so the notes shot stays
// unique to its module row.
import notesShot from "@public/screenshots/notes.png"
import { AppFrame } from "@/components/app-frame"
import { ComingSoonPill } from "@/components/coming-soon-pill"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { rebuild } from "@/config/site"

/**
 * Landing page hero.
 *
 * Left-aligned rather than centered, and stacked rather than columned.
 *
 * The two-column version this replaces put a 60px display headline in a 27rem
 * column, where "Keep everything." measured 511px against 432px of space and
 * broke across two lines mid-phrase. Widening the column would have taken the
 * width back out of the screenshot, and the screenshot is a dense desktop
 * interface that stops being readable somewhere around 500px. There was no
 * split of 1088px that served both.
 *
 * Stacking gives the copy a comfortable measure and the product the full
 * container. Keeping the text left-aligned is what stops it collapsing into
 * the centered-headline-over-centered-screenshot shape every product page
 * already has.
 */
export function Hero() {
  return (
    <Section className="relative overflow-hidden pt-10 sm:pt-14">
      {/*
       * Positioned wholly inside the band. Anything with a negative offset
       * gets sliced by the section's overflow-hidden, and a doodle cut off by
       * an invisible edge reads as a rendering bug rather than as art.
       */}
      <Doodle
        name="dark-04"
        className="top-6 right-[6%] w-20 -rotate-6 opacity-[0.18] lg:w-24"
      />

      <Container className="relative">
        {/* Load entrance: everything rises in reading order. enter-rise is
            pure CSS, so visitors without JavaScript see the same welcome. */}
        <h1 className="type-display enter-rise max-w-3xl">
          Learn anything. Keep everything.
        </h1>
        <p
          className="type-lede text-ink-2 enter-rise mt-6 max-w-xl"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          A real notes editor, flashcards that schedule themselves, and mind
          maps big enough to think in. One focused desktop app, and everything
          stays on your machine.
        </p>
        <div
          className="enter-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
        >
          {rebuild.active ? (
            <ComingSoonPill href="/download" className="px-6 py-3" />
          ) : (
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/download">Download Mnemo</Link>
            </Button>
          )}
          <Button
            asChild
            size="lg"
            variant={rebuild.active ? "default" : "outline"}
            className="rounded-full px-6"
          >
            <Link href="/#features">See what&apos;s inside</Link>
          </Button>
        </div>
        <p
          className="text-ink-3 enter-rise mt-6 text-sm"
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          {rebuild.active
            ? "Free and open source, for Windows, macOS, and Linux. Being rebuilt right now."
            : "Free and open source, for Windows, macOS, and Linux."}
        </p>

        <AppFrame
          chrome={false}
          className="enter-rise mt-14 sm:mt-16"
          style={{ "--reveal-delay": "190ms" } as React.CSSProperties}
        >
          <Image
            src={notesShot}
            alt="The Mnemo desktop app showing the block based notes editor with a note on Parkinson's disease"
            priority
            sizes="(min-width: 1200px) 1088px, 92vw"
            className="w-full"
          />
        </AppFrame>
      </Container>
    </Section>
  )
}
