import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/config/site"

/**
 * The one dark moment on the page, carrying the open-source and privacy
 * values at the loudest typographic volume. They live here rather than in the
 * hero so they read as conviction instead of a feature list.
 *
 * The surface is the app's own dark canvas rather than a marketing colour, so
 * the page's single high-contrast band is a material the product actually
 * has. This is also the only band that keeps the display size: it is the
 * loudest thing said, and nothing else on the page competes with it.
 */
export function Manifesto() {
  return (
    <Section canvas="deep" className="relative overflow-hidden py-28 sm:py-36">
      {/* One constellation, larger and quieter than the old scatter of three. */}
      <Doodle name="light-22" className="top-12 right-[10%] w-28 opacity-[0.16]" />
      <Container className="relative">
        <Reveal>
          <h2 className="type-display reveal-rise max-w-3xl">
            No subscriptions. No ads. No tracking. Ever.
          </h2>
          {/* Muted by ink step, not opacity: reveal-rise's forwards fill
              pins opacity at 1, so opacity-* utilities here silently lose. */}
          <p
            className="type-lede text-deep-ink-2 reveal-rise mt-7 max-w-xl"
            style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
          >
            Mnemo is free and open source. There is no account to create, no
            telemetry watching how you study, and no cloud service required to
            use the app. Your notes and study data stay on your machine.
          </p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-deep-ink-2 hover:text-deep-ink reveal-rise mt-7 inline-block font-mono text-sm underline underline-offset-4 transition-colors"
            style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          >
            Read the source
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
