import { Fragment } from "react"

import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import {
  FlashcardsFigure,
  MindmapFigure,
  NotesFigure,
} from "@/components/sections/feature-figures"

/**
 * The claim the three module rows cannot make on their own.
 *
 * Each row above argues that one tool is good. None of them argues the thing
 * that actually separates Mnemo from running three apps: that it is the same
 * fact moving between them. This band says it once, as a sequence, and then
 * hands off to /science for why the sequence works.
 *
 * It stands where a "why it works" teaser used to. That teaser restated the
 * science page's own opening in the science page's own words and gave the
 * reader nothing to look at, so the link at the end of it was doing all the
 * work. The link survives; the restatement does not.
 *
 * The figures are the same three drawn for the module pillars, reused rather
 * than redrawn — they are already the site's picture of a note, a deck, and a
 * map, and a second set would just be a second visual language.
 */

const steps = [
  { Figure: NotesFigure, label: "Write the note" },
  { Figure: FlashcardsFigure, label: "Remember it" },
  { Figure: MindmapFigure, label: "Connect the ideas" },
] as const

/** The hop between two steps. Mirrored vertically on the second one so the
    sequence dips and rises rather than repeating one arc. */
function FlowArrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 40"
      fill="none"
      className="text-ink-3 h-8 w-12 max-md:hidden"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M4 28 Q 28 12 52 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Barbs at +-28 degrees off the shaft's own tangent at the tip. Struck
          from the design's drawing, where one barb sat 8 degrees off and lay
          along the shaft, so the head read as a stray mark beside the line
          rather than as a point. */}
      <path
        d="M52 20 l-8.9 1.5 M52 20 l-6.2 -6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function OneWorkspace() {
  return (
    <Section className="relative overflow-hidden">
      <Doodle
        name="dark-03"
        className="top-12 right-[7%] w-16 rotate-6 opacity-35"
      />
      <Container className="relative text-center">
        <Reveal>
          <p className="type-eyebrow reveal-rise">One workspace, not three apps</p>
          <h2 className="type-h2 reveal-rise mx-auto mt-3 max-w-[38rem]">
            What you learn in one place stays connected everywhere.
          </h2>
          <p
            className="text-ink-2 reveal-rise mx-auto mt-4 max-w-lg text-pretty"
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          >
            Write the note. Turn it into something worth remembering.
            Connect it to everything around it. It all stays in the same
            library.
          </p>
        </Reveal>

        {/* Its own Reveal so the figures start drawing when the row is in
            view, not when the heading above it was. */}
        <Reveal className="mx-auto mt-16 grid max-w-4xl items-center justify-items-center gap-x-4 gap-y-12 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-y-0">
          {steps.map(({ Figure, label }, index) => (
            <Fragment key={label}>
              {index > 0 && <FlowArrow flip={index === 2} />}
              <div className="reveal-rise grid justify-items-center gap-3">
                {/* Decorative: the label underneath names the step. */}
                <Figure base={index * 140} className="h-28 w-auto" />
                <p className="text-base font-semibold tracking-tight">
                  {label}
                </p>
              </div>
            </Fragment>
          ))}
        </Reveal>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-6">
            <Link href="/science">See why it works</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
