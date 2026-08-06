import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import {
  FlashcardsFigure,
  MindmapFigure,
  NotesFigure,
} from "@/components/sections/feature-figures"
import { Reveal } from "@/components/reveal"

/**
 * The feature scan on the meadow band, as a two-tier bento: the three
 * product pillars get big illustrated cards, the three supporting features
 * get compact text cards. The hierarchy mirrors the product (notes,
 * flashcards, and mindmaps are full systems; the rest supports them).
 *
 * One Reveal wraps the pillar row; each figure takes a growing base delay,
 * so the three draw as a left-to-right wave.
 *
 * Section carries id="features" because the navbar's Features link targets
 * /#features. Top padding is oversized to receive the hero's overlapping
 * screenshot frame.
 */

const pillars = [
  {
    title: "A real notes editor",
    body: "Block based writing in the Notion tradition: text, images, code, and math. Drag anything anywhere, export to PDF when it counts.",
    Figure: NotesFigure,
  },
  {
    title: "Cards that time themselves",
    body: "Spaced repetition schedules every review right before you forget. Keyboard driven, with algorithms you can swap.",
    Figure: FlashcardsFigure,
  },
  {
    title: "A whole canvas for maps",
    body: "Mind mapping in the Miro spirit: shape, color, and connect nodes on an open canvas, then study from a clean preview.",
    Figure: MindmapFigure,
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

export function FeatureScan() {
  return (
    <Section
      canvas="meadow"
      id="features"
      className="relative overflow-hidden pt-40 sm:pt-56"
    >
      {/* Atmosphere layer: growth doodles at the band's edges. */}
      <Doodle name="dark-01" className="bottom-8 left-8 w-16 opacity-25" />
      <Doodle name="dark-03" className="top-44 right-12 w-10 opacity-25" />
      <Container className="relative">
        <p className="font-mono text-xs tracking-widest uppercase opacity-60">
          What&apos;s inside
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Everything you study, in one place.
        </h2>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="bg-background text-foreground flex flex-col rounded-2xl p-6"
            >
              <span className="text-muted-foreground font-mono text-xs tracking-widest">
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Decorative: the title states what the figure shows. */}
              <pillar.Figure
                base={index * 260}
                className="mx-auto my-4 h-36 w-auto"
              />
              <h3 className="text-lg font-semibold tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {pillar.body}
              </p>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-5 grid gap-5 sm:grid-cols-3">
          {supporting.map((feature, index) => (
            <article
              key={feature.title}
              className="reveal-rise bg-background/70 text-foreground rounded-2xl p-5"
              style={
                { "--reveal-delay": `${index * 100}ms` } as React.CSSProperties
              }
            >
              <span className="text-muted-foreground font-mono text-xs tracking-widest">
                {String(index + 4).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {feature.body}
              </p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
