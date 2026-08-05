import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"

import { Container } from "@/components/layout/container"
import { Section, type Canvas } from "@/components/layout/section"
import { Placeholder } from "@/components/placeholder"

/**
 * Internal brand sheet.
 *
 * A living reference for the site's visual direction: canvases, type, and the
 * rules that keep the multi-color editorial system coherent. Not linked from
 * anywhere and excluded from indexing; it exists so design decisions are made
 * against real rendered output instead of static mockups.
 */

/** Loaded here only, as a candidate to compare against Fraunces. */
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Brand sheet (internal)",
  robots: { index: false, follow: false },
}

/**
 * One entry per canvas, rendered as a full-width specimen band below.
 *
 * pillClass is the inverted primary CTA for that canvas (pairing rule 3).
 * The classes are written out literally because Tailwind only generates
 * styles for class names it can find as complete strings in the source.
 */
const canvasSpecimens: {
  canvas: Canvas
  name: string
  value: string
  role: string
  pillClass: string
}[] = [
  {
    canvas: "paper",
    name: "Paper",
    value: "oklch(0.972 0.01 85)",
    role: "Default canvas. Roughly two thirds of any page stays on paper.",
    pillClass: "bg-primary text-primary-foreground",
  },
  {
    canvas: "meadow",
    name: "Meadow",
    value: "oklch(0.76 0.13 125)",
    role: "Growth and learning. Hero moments and the flagship feature band.",
    pillClass: "bg-meadow-ink text-meadow",
  },
  {
    canvas: "cobalt",
    name: "Cobalt",
    value: "oklch(0.52 0.17 262)",
    role: "Depth and focus. Storytelling and feature deep dives.",
    pillClass: "bg-cobalt-ink text-cobalt",
  },
  {
    canvas: "butter",
    name: "Butter",
    value: "oklch(0.88 0.12 92)",
    role: "Optimism. Community, downloads, and calls to action.",
    pillClass: "bg-butter-ink text-butter",
  },
  {
    canvas: "blush",
    name: "Blush",
    value: "oklch(0.9 0.05 25)",
    role: "Warmth. Testimonials and human moments.",
    pillClass: "bg-blush-ink text-blush",
  },
  {
    canvas: "ink",
    name: "Ink",
    value: "oklch(0.245 0.018 55)",
    role: "Authority. The manifesto band and the footer.",
    pillClass: "bg-paper text-ink",
  },
]

/** Numbered section label, small and monospaced, editorial-magazine style. */
function SheetLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="mb-8 font-mono text-xs tracking-widest uppercase opacity-60">
      {number} / {title}
    </p>
  )
}

export default function BrandPage() {
  return (
    <main id="main-content">
      {/* 01: What this direction is */}
      <Section className="border-b">
        <Container>
          <SheetLabel number="01" title="Direction" />
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
            Serious spine, playful edges.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            Mnemo&apos;s site is a disciplined typographic tool that is not
            afraid of color. Structure, spacing, and copy stay rigorous so the
            project reads as a serious competitor. Color, illustration, and the
            mascot carry the warmth, and they live at the edges, never in the
            way of scanning.
          </p>
          <ul className="text-muted-foreground mt-8 grid max-w-2xl gap-2 text-sm">
            <li>1. Paper is home. Colored canvases are punctuation.</li>
            <li>2. Every canvas has exactly one ink. No exceptions.</li>
            <li>3. Serif for display, sans for everything else.</li>
            <li>4. The mascot appears where delight is free: 404, footer, empty states.</li>
            <li>5. App screenshots always sit in neutral frames, so the site outlives app redesigns.</li>
          </ul>
        </Container>
      </Section>

      {/* 02: Canvas system, each band rendered for real */}
      {canvasSpecimens.map((spec, index) => (
        <Section key={spec.canvas} canvas={spec.canvas} className="py-14 sm:py-16">
          <Container>
            {index === 0 && <SheetLabel number="02" title="Canvases" />}
            <p className="font-mono text-xs tracking-widest uppercase opacity-60">
              {spec.name} · {spec.value}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Learn anything. Keep everything.
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed opacity-70">
              {spec.role} Body text on this canvas is its ink at 70 percent
              opacity, which is what this paragraph is rendered in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {/* Rule 3: primary CTA on a canvas is the inverted pill. */}
              <span
                className={`rounded-full px-5 py-2.5 text-sm font-medium ${spec.pillClass}`}
              >
                Download Mnemo
              </span>
              <span className="rounded-full border border-current/40 px-5 py-2.5 text-sm font-medium">
                View on GitHub
              </span>
            </div>
          </Container>
        </Section>
      ))}

      {/* 03: Typography */}
      <Section className="border-b">
        <Container>
          <SheetLabel number="03" title="Typography" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                Candidate A · Fraunces (variable)
              </p>
              <p className="font-heading mt-4 text-5xl font-semibold tracking-tight">
                The art of remembering
              </p>
              <p className="font-heading mt-2 text-5xl font-light tracking-tight">
                The art of remembering
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                Candidate B · Instrument Serif (single weight)
              </p>
              <p
                className={`${instrumentSerif.className} mt-4 text-5xl tracking-tight`}
              >
                The art of remembering
              </p>
              <p className="text-muted-foreground mt-6 max-w-md text-sm leading-relaxed">
                Instrument is lighter and trendier; Fraunces has more range
                (full variable weight plus optical sizing) and will age better
                across docs, blog, and marketing. Recommendation: Fraunces.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t pt-10">
            <p className="font-heading text-6xl font-semibold tracking-tight">
              Display / 60
            </p>
            <p className="font-heading text-4xl font-semibold tracking-tight">
              Headline / 36
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              Title / 24 (sans takes over below headline level)
            </p>
            <p className="max-w-prose text-base leading-relaxed">
              Body / 16. Geist at a relaxed line height. Long-form copy stays on
              the sans so the serif keeps its impact at display sizes.
            </p>
            <p className="text-muted-foreground font-mono text-sm">
              Mono / 14. Geist Mono for labels, versions, and code.
            </p>
          </div>
        </Container>
      </Section>

      {/* 04: Mascot */}
      <Section canvas="blush">
        <Container>
          <SheetLabel number="04" title="Mascot" />
          <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
            <Placeholder
              label="Soma"
              className="size-40 shrink-0 rounded-full"
            />
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                An axolotl named Soma.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed opacity-70">
                A neuron is an axon plus a soma, and this one is an AXOlotl,
                so the name completes the neuron. Axolotls also regenerate
                their own brain cells, which is the best mascot story a
                learning app could ask for. Flat 2D, simple shapes, drawable
                in many poses. Appears at the edges of the site only: the 404
                page, the footer, empty states, and loading moments. Never
                inside content sections.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 05: Page rhythm, a miniature of how a real page flows */}
      <Section className="border-b">
        <Container>
          <SheetLabel number="05" title="Page rhythm" />
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            A miniature of the landing page flow. Paper dominates; each colored
            band marks one major moment, and no two adjacent bands share a
            canvas.
          </p>
          <div className="mt-8 grid gap-1 overflow-hidden rounded-xl border font-mono text-[10px] tracking-widest uppercase">
            <div className="bg-background px-4 py-5">Hero · paper</div>
            <div className="bg-meadow text-meadow-ink px-4 py-3">Feature scan · meadow</div>
            <div className="bg-background px-4 py-5">Deep dive · paper</div>
            <div className="bg-cobalt text-cobalt-ink px-4 py-3">Story moment · cobalt</div>
            <div className="bg-background px-4 py-5">Deep dive · paper</div>
            <div className="bg-ink text-paper px-4 py-4">Manifesto · ink</div>
            <div className="bg-butter text-butter-ink px-4 py-3">Download CTA · butter</div>
            <div className="bg-background px-4 py-5">Footer · paper, mascot peeking</div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
