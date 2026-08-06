import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/config/site"

/**
 * The ink band, carrying the open-source and privacy values at the loudest
 * typographic volume on the page. They live here rather than in the hero so
 * they read as conviction instead of a feature list.
 */
export function Manifesto() {
  return (
    <Section canvas="ink" className="relative overflow-hidden py-24 sm:py-32">
      {/* Atmosphere layer: sparse constellation, quieter than the words. */}
      <Doodle name="light-22" className="top-10 right-12 w-20 opacity-20" />
      <Doodle name="light-25" className="bottom-12 left-1/3 w-9 opacity-20" />
      <Doodle name="light-21" className="top-1/3 right-1/3 w-5 opacity-15" />
      <Container className="relative">
        <Reveal>
          <h2 className="reveal-rise max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            No subscriptions. No ads. No tracking. Ever.
          </h2>
          <p
            className="reveal-rise mt-6 max-w-xl text-lg leading-relaxed opacity-70"
            style={{ "--reveal-delay": "130ms" } as React.CSSProperties}
          >
            Mnemo is free and open source. There is no account to create and no
            server watching you study. Your notes live on your machine, and the
            code is public so you can hold us to every word.
          </p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="reveal-rise mt-8 inline-block font-mono text-sm underline underline-offset-4 opacity-70 hover:opacity-100"
            style={{ "--reveal-delay": "230ms" } as React.CSSProperties}
          >
            Read the source
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
