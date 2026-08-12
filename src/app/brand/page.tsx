import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Section, type Canvas } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

/**
 * Internal brand sheet.
 *
 * A living reference for the site's visual direction, rendered with the real
 * tokens so decisions are made against real output instead of mockups. Not
 * linked from anywhere and excluded from indexing.
 *
 * This sheet used to document a separate marketing palette: a yellow-green
 * paper, a coral primary, and four saturated canvas colours. None of them
 * existed in the product. The site now runs the app's tokens, so the sheet
 * documents those.
 */

export const metadata: Metadata = {
  title: "Brand sheet (internal)",
  robots: { index: false, follow: false },
}

/** One entry per surface, rendered as a full-width specimen band below. */
const surfaces: {
  canvas: Canvas
  name: string
  value: string
  role: string
}[] = [
  {
    canvas: "paper",
    name: "Paper",
    value: "oklch(0.971 0.005 40)",
    role: "The page. Most of any page stays here.",
  },
  {
    canvas: "sunken",
    name: "Sunken",
    value: "oklch(0.932 0.008 40)",
    role: "The same material, one step back. Marks a band as recessed without changing what it is made of.",
  },
  {
    canvas: "sea",
    name: "Sea",
    value: "oklch(0.46 0.17 262)",
    role: "/science's water, and nothing else. Blue because the fact sinks into it, the squid inks it, and the wave drifts across it.",
  },
  {
    canvas: "butter",
    name: "Butter",
    value: "oklch(0.88 0.12 92)",
    role: "The closing call to action, once per page. Ink measures 10.8 here and ink-2 measures 5.4; ink-3 is not cleared.",
  },
  {
    canvas: "deep",
    name: "Deep",
    value: "oklch(0.218 0.006 40)",
    role: "The app's own dark canvas. The loudest thing a page can say, so it says it once.",
  },
]

/** The colour that is allowed to mean something, and where. */
const informationalColour = [
  {
    label: "Brand",
    swatch: "bg-brand",
    note: "oklch(0.63 0.185 40), the wordmark orange, identical to the app's accent. Focus rings, the tint band, and brand marks. Not buttons.",
  },
  {
    label: "Due",
    swatch: "bg-state-due",
    note: "A card is due now. Shares the brand hue because the app's sidebar badge already speaks it.",
  },
  {
    label: "Learning",
    swatch: "bg-state-learn",
    note: "A card is mid-schedule.",
  },
  {
    label: "New",
    swatch: "bg-state-new",
    note: "A card has never been seen.",
  },
]

const branches = [
  "bg-branch-1",
  "bg-branch-2",
  "bg-branch-3",
  "bg-branch-4",
  "bg-branch-5",
  "bg-branch-6",
  "bg-branch-7",
  "bg-branch-8",
]

/** Numbered section label, small and monospaced, editorial-magazine style. */
function SheetLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="type-eyebrow mb-8">
      {number} / {title}
    </p>
  )
}

export default function BrandPage() {
  return (
    <main id="main-content">
      {/* 01: What this direction is */}
      <Section>
        <Container>
          <SheetLabel number="01" title="Direction" />
          <h1 className="type-display max-w-3xl">
            The site is made of the same material as the app.
          </h1>
          <p className="text-ink-2 type-lede mt-6 max-w-xl">
            Mnemo&apos;s site is a disciplined typographic tool that spends
            colour the way the product does: almost never, and only when the
            colour is carrying information. Warmth comes from the paper, the
            drawing, and the writing, not from wallpaper.
          </p>
          <ol className="text-ink-2 mt-8 grid max-w-2xl gap-2.5 text-sm">
            <li>
              1. One material. Surfaces differ in depth, not in hue, and every
              grey is built on the brand hue.
            </li>
            <li>2. Depth is shadow. Borders are a last resort.</li>
            <li>
              3. One accent, spent sparingly. Buttons that matter are
              near-black; the orange belongs to the brand and nothing else.
            </li>
            <li>
              4. Colour is information. Outside the single tint band, it
              appears only inside figures, using the app&apos;s branch and
              review-state hues.
            </li>
            <li>
              5. Muted text is a step down the ink ramp, never the ink at
              reduced opacity.
            </li>
            <li>
              6. Motion is under 300ms. A page that eases things in over three
              quarters of a second feels slow, not polished.
            </li>
            <li>
              7. The mascot appears where delight is free: 404, footer, empty
              states. Fewer and larger beats scattered and faint.
            </li>
          </ol>
        </Container>
      </Section>

      {/* 02: Surfaces, each band rendered for real */}
      {surfaces.map((spec, index) => (
        <Section key={spec.canvas} canvas={spec.canvas} className="py-14 sm:py-16">
          <Container>
            {index === 0 && <SheetLabel number="02" title="Surfaces" />}
            <p
              className={`font-mono text-xs tracking-widest uppercase ${
                spec.canvas === "deep" || spec.canvas === "sea"
                  ? "opacity-70"
                  : "text-ink-2"
              }`}
            >
              {spec.name} · {spec.value}
            </p>
            <h2 className="type-h3 mt-4">Learn anything. Keep everything.</h2>
            <p
              className={`mt-3 max-w-xl leading-relaxed ${
                spec.canvas === "deep"
                  ? "opacity-80"
                  : spec.canvas === "sea"
                    ? "text-sea-ink-2"
                    : "text-ink-2"
              }`}
            >
              {spec.role}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-5">
                Download Mnemo
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-5">
                View on GitHub
              </Button>
            </div>
          </Container>
        </Section>
      ))}

      {/* 03: Where colour is allowed */}
      <Section canvas="sunken">
        <Container>
          <SheetLabel number="03" title="Colour" />
          <h2 className="type-h2 max-w-2xl">
            Colour is information, not decoration.
          </h2>
          <p className="text-ink-2 mt-5 max-w-xl leading-relaxed">
            The application stays monochrome. Colour only appears inside
            something the user themselves grouped, or to name a state they
            already understand. The site follows the same rule, which is why it
            has no green band and no blue band.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {informationalColour.map((entry) => (
              <div key={entry.label}>
                <div
                  className={`h-14 rounded-xl ${entry.swatch}`}
                  aria-hidden
                />
                <p className="mt-3 text-sm font-semibold">{entry.label}</p>
                <p className="text-ink-2 mt-1 text-sm leading-relaxed">
                  {entry.note}
                </p>
              </div>
            ))}
          </div>

          <p className="type-eyebrow mt-14">Branch hues</p>
          <p className="text-ink-2 mt-3 max-w-xl text-sm leading-relaxed">
            Eight hues walked around the wheel and pulled to a similar
            lightness, so no branch shouts louder than its siblings.
            Deliberately off the brand hue at both ends, so a red branch never
            reads as a Mnemo button. Used in mindmap figures and in the
            overscroll band, nowhere else.
          </p>
          <div className="mt-5 flex flex-wrap gap-2" aria-hidden>
            {branches.map((swatch) => (
              <div key={swatch} className={`size-12 rounded-lg ${swatch}`} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 04: Typography */}
      <Section>
        <Container>
          <SheetLabel number="04" title="Typography" />
          <p className="text-ink-2 max-w-xl text-sm leading-relaxed">
            Five roles, and a section picks a role rather than a number. The
            old sheet listed sizes but enforced nothing, so adjacent bands ran
            headings two steps apart.
          </p>
          <div className="mt-12 grid gap-8 border-t pt-10">
            <div>
              <p className="type-eyebrow mb-3">.type-display · h1, and the manifesto</p>
              <p className="type-display">The art of remembering</p>
            </div>
            <div>
              <p className="type-eyebrow mb-3">.type-h2 · band heading</p>
              <p className="type-h2">The art of remembering</p>
            </div>
            <div>
              <p className="type-eyebrow mb-3">.type-h3 · row and sub-band heading</p>
              <p className="type-h3">The art of remembering</p>
            </div>
            <div>
              <p className="type-eyebrow mb-3">.type-h4 · card heading, sans</p>
              <p className="type-h4">The art of remembering</p>
            </div>
            <div>
              <p className="type-eyebrow mb-3">.type-lede · opening paragraph</p>
              <p className="type-lede max-w-2xl">
                Body copy stays on the sans so the serif keeps its impact at
                display sizes.
              </p>
            </div>
            <div>
              <p className="type-eyebrow mb-3">Body · 16, and the ink ramp</p>
              <p className="max-w-prose leading-relaxed">
                Primary text is ink.{" "}
                <span className="text-ink-2">
                  Secondary text is ink-2, a real step down the ramp.
                </span>{" "}
                <span className="text-ink-3">
                  Ink-3 is for labels and captions only.
                </span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 05: Page rhythm, a miniature of how a real page flows */}
      <Section canvas="sunken">
        <Container>
          <SheetLabel number="05" title="Page rhythm" />
          <p className="text-ink-2 max-w-xl text-sm leading-relaxed">
            A miniature of the landing page. Paper dominates, no two adjacent
            bands share a depth, and the loud moments (the dark band and
            the butter band) happen once each.
          </p>
          <div className="border-line mt-8 grid gap-1 overflow-hidden rounded-xl border font-mono text-[10px] tracking-widest uppercase">
            <div className="bg-paper text-ink px-4 py-5">Hero · paper</div>
            <div className="bg-sunken text-ink px-4 py-4">
              The three modules · sunken
            </div>
            <div className="bg-paper text-ink px-4 py-3">
              Science teaser · paper
            </div>
            <div className="bg-deep text-deep-ink px-4 py-4">
              Manifesto · deep
            </div>
            <div className="bg-butter text-ink px-4 py-3">
              Download CTA · butter
            </div>
            <div className="bg-paper text-ink px-4 py-5">
              Footer · paper, mascot peeking over the tear
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
