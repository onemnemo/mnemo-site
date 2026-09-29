import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { NotFoundScene } from "@/components/not-found-scene"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
}

/** 404 page. One of the mascot's habitats: Soma and a test-pattern TV. */
export default function NotFound() {
  return (
    <main id="main-content">
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="type-eyebrow">
              404
            </p>
            <h1 className="mt-3 font-sans text-5xl leading-[1.08] font-medium tracking-[-0.055em] sm:text-6xl">
              This page forgot to exist.
            </h1>
            <p className="text-ink-2 mt-5 max-w-md text-base leading-relaxed">
              Ironic, for a memory app. Soma is looking into it, with limited
              enthusiasm.
            </p>
            <div className="mt-8">
              <Button asChild className="mnemo-download">
                <Link href="/">Back to the homepage</Link>
              </Button>
            </div>
          </div>
          {/* Background-keyed cut, so the scene sits directly on the page
              canvas with no box around it. */}
          <NotFoundScene className="mx-auto w-full max-w-md" />
        </Container>
      </Section>
    </main>
  )
}
