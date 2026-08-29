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
 *
 * Two columns rather than a single paragraph under the headline. "No
 * subscriptions. No ads. No tracking." is three separate promises, and a
 * prose paragraph restating all three made the reader take the slogan on
 * trust and then read it again in longhand. Split out, the headline is the
 * claim and the column beside it is the receipt for each part of it.
 */

const promises = [
  {
    title: "Your notes are yours.",
    body: "Stored locally by default. No cloud service required.",
  },
  {
    title: "No account required.",
    body: "Open Mnemo and start studying. No sign-up, telemetry, or profiling.",
  },
  {
    title: "Open source.",
    body: "Inspect it, change it, build on it. Licensed under Apache 2.0.",
  },
]

export function Manifesto() {
  return (
    <Section canvas="deep" className="relative overflow-hidden py-28 sm:py-36">
      {/* One constellation, larger and quieter than the old scatter of three. */}
      <Doodle
        name="light-22"
        className="right-[6%] bottom-12 w-28 opacity-[0.16]"
      />
      <Container className="relative">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="reveal-rise">
            <h2 className="type-display">
              No subscriptions. No ads. No tracking. Ever.
            </h2>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-deep-ink-2 hover:text-deep-ink mt-8 inline-block font-mono text-sm underline underline-offset-4 transition-colors"
            >
              Read the source
            </a>
          </div>
          {/*
           * Hairline rules rather than cards. A card on the dark canvas would
           * be a second surface, and the app's rule is that depth is shadow;
           * there is no shadow to spend at this contrast.
           */}
          <div className="grid gap-9">
            {promises.map((promise, index) => (
              <div
                key={promise.title}
                className="reveal-rise border-deep-ink/15 border-t pt-6"
                style={
                  {
                    "--reveal-delay": `${70 + index * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <h3 className="font-heading text-2xl font-semibold tracking-tight">
                  {promise.title}
                </h3>
                {/* Muted by ink step, not opacity: reveal-rise's forwards fill
                    pins opacity at 1, so opacity-* utilities here silently
                    lose. */}
                <p className="text-deep-ink-2 mt-2 leading-relaxed">
                  {promise.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
