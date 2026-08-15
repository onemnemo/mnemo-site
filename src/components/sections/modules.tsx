import Image from "next/image"

import flashcardsShot from "@public/screenshots/flashcards.png"
import mindmapsShot from "@public/screenshots/mindmaps.png"
import notesShot from "@public/screenshots/notes.png"
import { AppFrame } from "@/components/app-frame"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { cn } from "@/lib/utils"
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
    title: "The flexibility of a Notion-style editor, built for studying.",
    body: "If you have used Notion, the basics will feel familiar. Write with blocks, move content around freely, use slash commands, and mix text with images, code, math, lists, and more. When you need to share or hand something in, export your notes to PDF.",
    Figure: NotesFigure,
    screenshot: {
      src: notesShot,
      alt: "The Mnemo notes editor showing a block based note on Parkinson's disease, with headings, bullet lists, and an inline diagram",
    },
  },
  {
    eyebrow: "Flashcards",
    title: "Serious spaced repetition, without the friction.",
    body: "Mnemo uses FSRS, the modern scheduling system also used by Anki. Reviews adapt to how well you remember each card, helping you spend less time repeating what you already know and more time on what still needs work. The whole review flow is fast and keyboard-friendly.",
    Figure: FlashcardsFigure,
    screenshot: {
      src: flashcardsShot,
      alt: "A Mnemo flashcard review session showing a medicine question with an answer, an inline image, and grading buttons",
    },
  },
  {
    eyebrow: "Mind maps",
    title: "Room to think",
    body: "Build mind maps without squeezing your ideas into a tiny widget. Move, connect, color, and organize nodes freely on a full canvas, then switch to a clean preview when you want to study from it.",
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
    body: "Jump straight to a note, deck, map, or action without digging through menus. Mnemo is designed to stay quick when your library gets big.",
  },
  {
    title: "Your studying at a glance",
    body: "See recent decks, review activity, goals, and what needs your attention next, all from one place.",
  },
  {
    title: "Make Mnemo yours",
    body: "Choose your theme, change keybinds, switch languages, and tune the app to fit how you study.",
  },
]

export function Modules() {
  return (
    <Section canvas="sunken" id="features">
      <Container>
        <p className="type-eyebrow">What&apos;s inside</p>
        <h2 className="type-h2 mt-3 max-w-2xl">
          Three study tools, built to stand on their own.
        </h2>
        <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">
          Mnemo brings notes, flashcards, and mind maps together without
          turning any of them into a side feature. Use one, use all three, and
          keep everything in the same library.
        </p>

        <div className="mt-16 grid gap-24 sm:mt-20 sm:gap-32">
          {modules.map((module, index) => {
            const text = (
              <div className="reveal-rise">
                {/* Decorative: the eyebrow and title state what it shows. */}
                <module.Figure base={60} className="mb-6 h-24 w-auto" />
                <p className="type-eyebrow">{module.eyebrow}</p>
                <h3 className="type-h3 mt-3">{module.title}</h3>
                <p className="text-ink-2 mt-4 max-w-lg leading-relaxed">
                  {module.body}
                </p>
              </div>
            )
            const media = (
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
            )
            const flipped = index % 2 === 1
            return (
              <Reveal
                key={module.eyebrow}
                /*
                 * The media column is the wider of the two. These are
                 * screenshots of a dense desktop app: at an even split they
                 * render small enough that the interface being described is
                 * unreadable, which defeats the point of showing it.
                 *
                 * The alternation is done by swapping DOM order (and the
                 * matching column-size order) rather than with CSS `order`,
                 * because `order` only changes visual position — grid
                 * auto-placement still assigns items to tracks by DOM order,
                 * so a reordered item would land in the wrong-sized track.
                 */
                className={cn(
                  "grid items-center gap-10 lg:gap-16",
                  flipped
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
                    : "lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
                )}
              >
                {flipped ? (
                  <>
                    {media}
                    {text}
                  </>
                ) : (
                  <>
                    {text}
                    {media}
                  </>
                )}
              </Reveal>
            )
          })}
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
