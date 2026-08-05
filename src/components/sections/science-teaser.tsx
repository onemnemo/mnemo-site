import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/**
 * Slim cobalt band pointing at /science. The full memory-science story lives
 * on its own page as an interactive scroll journey; the landing page only
 * plants the hook.
 */
export function ScienceTeaser() {
  return (
    <Section canvas="cobalt" className="relative overflow-hidden py-14 sm:py-20">
      {/* Atmosphere layer: night-sky doodles for the focus band. */}
      <Doodle name="light-08" className="top-8 right-16 w-12 opacity-35" />
      <Doodle name="light-01" className="top-1/2 left-[45%] w-8 opacity-25" />
      <Doodle name="light-14" className="right-1/3 bottom-8 w-14 opacity-30" />
      <Container className="relative flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase opacity-60">
            Why it works
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Built on a century of memory research.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed opacity-70">
            Forgetting has a shape, and studying with it beats studying
            against it. Follow one fact through your memory and see why
            flashcards, spacing, and connection actually work.
          </p>
        </div>
        <Link
          href="/science"
          className="bg-cobalt-ink text-cobalt rounded-full px-6 py-3 text-sm font-medium"
        >
          Take the tour
        </Link>
      </Container>
    </Section>
  )
}
