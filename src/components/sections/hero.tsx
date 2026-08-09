import Image from "next/image"
import Link from "next/link"

// Swap for an overview capture once one exists, so the notes shot stays
// unique to its deep dive.
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
 * Typographic and centered: the serif headline carries the identity and the
 * screenshot puts the product above the fold. The screenshot frame overlaps
 * into the meadow band below, which takes z-10 here plus matching top padding
 * on the feature section.
 */
export function Hero() {
  return (
    <Section className="relative z-10 pt-14 pb-0 sm:pt-20 sm:pb-0">
      <Doodle name="dark-04" className="top-16 left-[14%] w-8 opacity-30" />
      <Doodle
        name="dark-17"
        className="top-40 right-[13%] w-7 rotate-12 opacity-30"
      />
      {/* Load entrance: everything rises in reading order. enter-rise is
          pure CSS, so visitors without JavaScript see the same welcome. */}
      <Container className="flex flex-col items-center text-center">
        <h1 className="enter-rise max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Learn anything. Keep everything.
        </h1>
        <p
          className="enter-rise text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed"
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
        >
          A real notes editor, flashcards that schedule themselves, and mind
          maps big enough to think in. One focused desktop app, and everything
          stays on your machine.
        </p>
        <div
          className="enter-rise mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ "--reveal-delay": "190ms" } as React.CSSProperties}
        >
          {rebuild.active ? (
            <ComingSoonPill href="/download" className="px-6 py-2.5" />
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
          className="enter-rise text-muted-foreground/80 mt-5 text-sm"
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          {rebuild.active
            ? "Free and open source, for Windows, macOS, and Linux. Being rebuilt right now."
            : "Free and open source, for Windows, macOS, and Linux."}
        </p>

        <AppFrame
          chrome={false}
          className="enter-rise mt-12 -mb-24 w-full max-w-5xl shadow-lg sm:mt-16 sm:-mb-32"
          style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
        >
          <Image
            src={notesShot}
            alt="The Mnemo desktop app showing the block based notes editor with a note on Parkinson's disease"
            priority
            sizes="(min-width: 1120px) 1024px, 92vw"
            className="w-full"
          />
        </AppFrame>
      </Container>
    </Section>
  )
}
