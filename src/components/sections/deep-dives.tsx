import Image from "next/image"

import flashcardsShot from "@public/screenshots/flashcards.png"
import mindmapsShot from "@public/screenshots/mindmaps.png"
import notesShot from "@public/screenshots/notes.png"
import { AppFrame } from "@/components/app-frame"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"

/**
 * Alternating text-and-media rows for the three flagship flows. Screenshots
 * are real captures of the app, so AppFrame's synthetic chrome is off
 * (chrome={false}): the app's own window controls are already in the shot.
 * Swapping in new captures after an app redesign is the only edit this
 * section should ever need; captures are imported statically per the
 * house rule (real dimensions, content-hashed URLs, no stale caches).
 *
 * Each row is its own Reveal: text rises first, the frame follows a
 * beat later, and rows far down the page wait for their own scroll-in.
 */

const dives = [
  {
    eyebrow: "Notes",
    title: "A real editor, not a text box",
    body: "Block based writing like you know it from Notion: headings, images, code, and math, rearranged by drag. Local AI assistance is in the works, running on your machine instead of in someone's cloud.",
    screenshot: {
      src: notesShot,
      alt: "The Mnemo notes editor showing a block based note on Parkinson's disease, with headings, bullet lists, and an inline diagram",
    },
  },
  {
    eyebrow: "Mindmaps",
    title: "Room to think",
    body: "A full mapping canvas, not a widget. Shape, color, and connect nodes and edges like on a whiteboard, then flip to a clean preview when it is time to study.",
    screenshot: {
      src: mindmapsShot,
      alt: "A Mnemo mind map of photosynthesis, with colored nodes for inputs, reactions, and outputs connected by labeled edges",
    },
  },
  {
    eyebrow: "Review",
    title: "Reviews that respect your time",
    body: "No cramming marathons. Mnemo asks for a handful of cards at the right moments, and the daily pile stays small enough to actually finish.",
    screenshot: {
      src: flashcardsShot,
      alt: "A Mnemo flashcard review session showing a medicine question with an answer, an inline image, and grading buttons",
    },
  },
]

export function DeepDives() {
  return (
    <Section className="py-8 sm:py-12">
      <Container className="grid gap-20 sm:gap-28">
        {dives.map((dive, index) => (
          <Reveal
            key={dive.eyebrow}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* Alternate media left/right per row at desktop widths. */}
            <div
              className={
                index % 2 === 1 ? "reveal-rise lg:order-last" : "reveal-rise"
              }
            >
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                {dive.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {dive.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
                {dive.body}
              </p>
            </div>
            <AppFrame
              chrome={false}
              className="reveal-rise"
              style={{ "--reveal-delay": "130ms" } as React.CSSProperties}
            >
              <Image
                src={dive.screenshot.src}
                alt={dive.screenshot.alt}
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="w-full"
              />
            </AppFrame>
          </Reveal>
        ))}
      </Container>
    </Section>
  )
}
