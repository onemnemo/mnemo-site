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
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              404
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              This page forgot to exist.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md text-lg leading-relaxed">
              Ironic, for a memory app. Soma is looking into it, with limited
              enthusiasm.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-6">
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
