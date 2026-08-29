import Image from "next/image"
import Link from "next/link"

// Swap for an overview capture once one exists, so the notes shot stays
// unique to its module row.
import notesShot from "@public/screenshots/notes.png"
import { ComingSoonPill } from "@/components/coming-soon-pill"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { rebuild } from "@/config/site"

/**
 * Landing page hero.
 *
 * Centred, and the screenshot runs wider than the text column.
 *
 * The left-aligned version this replaces had the copy and the screenshot
 * sharing a container edge, which made the product read as one more block in
 * the stack. Centring the copy and letting the capture break the container
 * puts the app itself at the middle of the fold.
 *
 * The capture used to hang off the bottom of the band into the one below.
 * That overhang and the torn edge underneath it cannot both exist: the card
 * crossed the tear, so the tear read as a graphic behind the screenshot
 * rather than as the boundary between two sheets. The screenshot now lands
 * clear of the band's bottom padding and the tear is the seam.
 */
export function Hero() {
  return (
    <Section className="relative pt-10 sm:pt-14">
      {/*
       * The doodles get their own clipping layer rather than the section
       * getting `overflow-hidden`, so nothing else in the band inherits a
       * clip it did not ask for. Both are positioned wholly inside the band
       * anyway; a doodle cut off by an invisible edge reads as a rendering
       * bug rather than as art.
       */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Doodle
          name="dark-04"
          className="top-2 left-[7%] w-20 -rotate-6 opacity-50 lg:w-24"
        />
        <Doodle
          name="dark-24"
          className="top-8 right-[7%] w-20 rotate-6 opacity-50 lg:w-24"
        />
      </div>

      <Container className="relative text-center">
        {/* Load entrance: everything rises in reading order. enter-rise is
            pure CSS, so visitors without JavaScript see the same welcome. */}
        <h1 className="type-display enter-rise mx-auto max-w-3xl sm:text-[4rem] lg:text-[4.5rem]">
          Learn anything.{" "}
          {/* Breaks after the first sentence once there is room for two full
              lines; below that the balance algorithm does better than a
              hard break would. */}
          <br className="max-sm:hidden" />
          Keep everything.
        </h1>
        <p
          className="type-lede text-ink-2 enter-rise mx-auto mt-6 max-w-xl text-pretty"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          Notes, flashcards, and mind maps in one private study workspace.
          No accounts, no tracking, no subscriptions.
        </p>
        <div
          className="enter-rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
        >
          {rebuild.active ? (
            <ComingSoonPill href="/download" className="px-6 py-3" />
          ) : (
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="/download">Download the beta</Link>
            </Button>
          )}
          <Button
            asChild
            size="lg"
            variant={rebuild.active ? "default" : "outline"}
            className="rounded-full px-7"
          >
            <Link href="/#features">See what&apos;s inside</Link>
          </Button>
        </div>
        <p
          className="text-ink-3 enter-rise mt-6 text-sm"
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
        >
          Free and open source for Windows, macOS, and Linux.
        </p>
      </Container>

      {/*
       * Its own container, wider than the text one, so the capture is the
       * widest thing on the page. Positioned because the doodle layer above
       * is absolute and would otherwise paint over it.
       */}
      <div
        className="enter-rise relative mx-auto mt-12 w-full max-w-[82rem] px-4 sm:mt-14 sm:px-6 lg:px-8"
        style={{ "--reveal-delay": "190ms" } as React.CSSProperties}
      >
        <div className="bg-canvas shadow-pop overflow-hidden rounded-2xl">
          <Image
            src={notesShot}
            alt="The Mnemo desktop app showing the block based notes editor with a note on Parkinson's disease"
            priority
            sizes="(min-width: 1360px) 1264px, 96vw"
            className="block w-full"
          />
        </div>
      </div>
    </Section>
  )
}
