import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
  title: "Why it works",
  description:
    "The memory science behind Mnemo: spaced repetition, active recall, and the forgetting curve, and how the app is built around them.",
  alternates: { canonical: "/science" },
}

/**
 * The science page.
 *
 * Wireframe stub. This page owns the "how memory actually behaves" story
 * (Ebbinghaus forgetting curve, spaced repetition, active recall) so the
 * landing page can stay focused on showing the product off. The landing page
 * links here from a slim teaser band.
 */
export default function SciencePage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Why it works
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg">
            Wireframe stub. The forgetting curve, spaced repetition, and
            active recall explainer lands here.
          </p>
        </Container>
      </Section>
    </main>
  )
}
