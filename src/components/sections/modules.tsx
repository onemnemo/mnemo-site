import Image from "next/image"

import flashcardsShot from "@public/screenshots/flashcards.png"
import mindmapsShot from "@public/screenshots/mindmaps.png"
import notesShot from "@public/screenshots/notes.png"
import { AppFrame } from "@/components/app-frame"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import {
  FlashcardsFigure,
  MindmapFigure,
  NotesFigure,
} from "@/components/sections/feature-figures"
import { Reveal } from "@/components/reveal"

/**
 * The three modules, told once each.
 *
 * This replaces two sections — a bento of illustrated pillar cards and a set
 * of alternating screenshot rows — that made the same three claims in nearly
 * the same words a screen apart. Merged, each module gets one row carrying
 * everything it had across both: the drawn figure, the full pitch, and the
 * real screenshot as proof.
 *
 * Hierarchy on the recessed band follows the app's elevation rule: the
 * screenshots float (canvas surface, shadow), the supporting cards at the end
 * sit flat with a border. Importance is depth, never a louder colour.
 *
 * Rows run capture → retain → connect (notes, flashcards, mindmaps), which is
 * the order the tools appear in a real study session.
 *
 * Screenshots are real captures with the app's own window chrome, so
 * AppFrame's synthetic chrome is off. Each row is its own Reveal: text rises
 * first, the frame follows a beat later.
 *
 * Section carries id="features" because the navbar's Features link targets
 * /#features.
 */

const modules = [
  {
    eyebrow: "Notes",
    title: "A real editor, not a text box",
    body: "Block based writing in the Notion tradition: headings, images, code, and math, rearranged by drag and exported to PDF when it counts. Local AI assistance is in the works, running on your machine, not in someone's cloud.",
    Figure: NotesFigure,
    screenshot: {
      src: notesShot,
      alt: "The Mnemo notes editor showing a block based note on Parkinson's disease, with headings, bullet lists, and an inline diagram",
    },
  },
  {
    eyebrow: "Flashcards",
    title: "Reviews that respect your time",
    body: "Spaced repetition schedules every card for the moment just before you would forget it, so the daily pile stays small enough to actually finish. Keyboard driven end to end, with scheduling algorithms you can swap.",
    Figure: FlashcardsFigure,
    screenshot: {
      src: flashcardsShot,
      alt: "A Mnemo flashcard review session showing a medicine question with an answer, an inline image, and grading buttons",
    },
  },
  {
    eyebrow: "Mindmaps",
    title: "Room to think",
    body: "A full mapping canvas in the Miro spirit, not a widget: shape, color, and connect nodes like on a whiteboard, then flip to a clean preview when it is time to study.",
    Figure: MindmapFigure,
    screenshot: {
      src: mindmapsShot,
      alt: "A Mnemo mind map of photosynthesis, with colored nodes for inputs, reactions, and outputs connected by labeled edges",
    },
  },
]

const supporting = [
  {
    title: "Everything one keystroke away",
    body: "Ctrl K jumps to any note, deck, or map. Quick Actions keep your hands on the keyboard.",
  },
  {
    title: "Your studying at a glance",
    body: "A dashboard of review stats, recent decks, and goals, so you know where you stand.",
  },
  {
    title: "Make it feel like home",
    body: "Themes, custom keybinds, and multiple languages. It is your desk, after all.",
  },
]

export function Modules() {
  return (
    <Section canvas="sunken" id="features">
      <Container>
        <p className="type-eyebrow">What&apos;s inside</p>
        <h2 className="type-h2 mt-3 max-w-2xl">
          Three tools, each built like it&apos;s the only one.
        </h2>
        <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">
          Most study apps do one thing properly and bolt the rest on. Mnemo
          doesn&apos;t: notes, flashcards, and mind maps are each a full
          system, sharing one library and one desk.
        </p>

        <div className="mt-16 grid gap-24 sm:mt-20 sm:gap-32">
          {modules.map((module, index) => (
            <Reveal
              key={module.eyebrow}
              /*
               * The media column is the wider of the two. These are
               * screenshots of a dense desktop app: at an even split they
               * render small enough that the interface being described is
               * unreadable, which defeats the point of showing it.
               */
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16"
            >
              {/* Alternate media left/right per row at desktop widths. */}
              <div
                className={
                  index % 2 === 1 ? "reveal-rise lg:order-last" : "reveal-rise"
                }
              >
                {/* Decorative: the eyebrow and title state what it shows. */}
                <module.Figure base={60} className="mb-6 h-24 w-auto" />
                <p className="type-eyebrow">{module.eyebrow}</p>
                <h3 className="type-h3 mt-3">{module.title}</h3>
                <p className="text-ink-2 mt-4 max-w-lg leading-relaxed">
                  {module.body}
                </p>
              </div>
              <AppFrame
                chrome={false}
                className="reveal-rise"
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              >
                <Image
                  src={module.screenshot.src}
                  alt={module.screenshot.alt}
                  sizes="(min-width: 1024px) 58vw, 90vw"
                  className="w-full"
                />
              </AppFrame>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 sm:mt-32">
          <p className="type-eyebrow reveal-rise">Around the tools</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {supporting.map((feature, index) => (
              <article
                key={feature.title}
                /* line-soft is lighter than the sunken band it sits on, so it
                   read as no border at all; line is the visible one. */
                className="reveal-rise border-line rounded-2xl border p-5"
                style={
                  { "--reveal-delay": `${index * 70}ms` } as React.CSSProperties
                }
              >
                <h3 className="text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-ink-2 mt-1.5 text-sm leading-relaxed">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
