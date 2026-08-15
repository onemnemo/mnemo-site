import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

/**
 * Slim band pointing at /science. The full memory-science story lives on its
 * own page as an interactive scroll journey; the landing page only plants the
 * hook.
 *
 * Plain paper between the recessed modules band and the dark manifesto, so
 * the page surfaces again before its loud moment. The band used to be
 * saturated cobalt with body copy at 70% opacity, which measured 3.4:1 — the
 * blue-on-white legibility complaint was correct, and it was a symptom of
 * treating colour as decoration rather than as information.
 */
export function ScienceTeaser() {
  return (
    <Section className="relative overflow-hidden py-16 sm:py-20">
      {/* One doodle, sized to read as a drawing. */}
      <Doodle
        name="dark-03"
        className="top-10 right-[8%] w-16 rotate-6 opacity-20"
      />
      <Container className="relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div className="reveal-rise">
            <p className="type-eyebrow">Why it works</p>
            <h2 className="type-h3 mt-3 max-w-2xl">
              Built around how memory actually works.
            </h2>
            <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">
              Good studying is not just about doing more. Mnemo uses ideas like
              active recall and spaced repetition to help you review at the
              right time and strengthen what you are learning.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="reveal-rise rounded-full px-6"
            style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
          >
            <Link href="/science">See the science</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  )
}
