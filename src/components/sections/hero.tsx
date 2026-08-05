import Image from "next/image"
import Link from "next/link"

import notesShot from "@public/screenshots/notes.png"
import { AppFrame } from "@/components/app-frame"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

/**
 * Landing page hero.
 *
 * Typographic and centered: the serif headline carries the identity, two
 * hand-drawn doodles season it, and the first real thing on the page is the
 * product itself. The screenshot frame deliberately overlaps into the meadow
 * band below (z-10 here, matching top padding on the feature section), so
 * the fold shows actual software instead of decoration.
 *
 * The screenshot is the notes editor for now; swap to an Overview/dashboard
 * capture (public/screenshots/overview.png) when one exists, so the notes
 * shot stays unique to its deep dive.
 */
export function Hero() {
  return (
    <Section className="relative z-10 pt-14 pb-0 sm:pt-20 sm:pb-0">
      <Doodle name="dark-04" className="top-16 left-[14%] w-8 opacity-30" />
      <Doodle
        name="dark-17"
        className="top-40 right-[13%] w-7 rotate-12 opacity-30"
      />
      <Container className="flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Learn anything. Keep everything.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          A real notes editor, flashcards that schedule themselves, and mind
          maps big enough to think in. One focused desktop app, and everything
          stays on your machine.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/download">Download Mnemo</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-6"
          >
            <Link href="/#features">See what&apos;s inside</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 font-mono text-xs tracking-wide">
          Free · Open source · Windows, macOS, and Linux
        </p>

        <AppFrame
          chrome={false}
          className="mt-12 -mb-24 w-full max-w-5xl shadow-lg sm:mt-16 sm:-mb-32"
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
