import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Guides and documentation for installing, using, and extending Mnemo.",
  alternates: { canonical: "/docs" },
}

/**
 * Docs landing page.
 *
 * Wireframe stub: exists so navigation, typed routes, and the sitemap have a
 * real target. The docs information architecture is designed in a later pass.
 */
export default function DocsPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Docs
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg">
            Wireframe stub. The documentation hub lands here.
          </p>
        </Container>
      </Section>
    </main>
  )
}
