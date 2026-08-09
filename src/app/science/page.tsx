import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

/*
 * Art is imported, never referenced by URL string. Static imports carry
 * the file's real dimensions and resolve to a content-hashed URL, so
 * dropping in a replacement drawing updates the intrinsic size and busts
 * every cache between here and the browser. A string src does neither.
 */
import rescueArt from "@public/illos/science/rescue-well.png"

import { ComingSoonPill } from "@/components/coming-soon-pill"
import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import {
  Constellation,
  ForgettingCurve,
  SpacedCurve,
} from "@/components/science/figures"
import { GradToss } from "@/components/science/grad-toss"
import { InkEdge } from "@/components/science/ink-edge"
import { NightDoze } from "@/components/science/night-doze"
import { QuizCard } from "@/components/science/quiz-card"
import { StageMarker } from "@/components/science/stage-marker"
import { Reveal } from "@/components/reveal"
import { TornEdge } from "@/components/torn-edge"
import { rebuild } from "@/config/site"

export const metadata: Metadata = {
  title: "Why it works",
  description:
    "Follow one fact through forgetting, retrieval, spacing, connection, and sleep, and see why Mnemo is built the way it is.",
  alternates: { canonical: "/science" },
}

/**
 * The science story, "the journey of one fact": seven scenes, one canvas
 * band each, following a single fact from encoding to survival. Full
 * storyboard and interaction plan live in docs/science-storyboard.md.
 *
 * The diagrams (curve, spaced curve, network) are the primary visuals;
 * mascot art appears only as small accents. Every scene opens with the
 * same StageMarker journey spine, and the fact itself appears as a card
 * from the same deck in scenes 1 and 3, so the page reads as one system.
 *
 * The page is a complete semantic article on its own; nothing on it may
 * depend on scroll interaction.
 */

export default function SciencePage() {
  return (
    <main id="main-content">
      {/* Scene 1: a fact is born. The fact card comes from the same deck as
          the scene-3 quiz card. The extra mobile bottom padding is headroom
          for the InkEdge squid's sprite frames. */}
      <Section className="texture-rules pb-44 sm:pb-24">
        <Container>
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Why it works
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Read this once.
          </h1>

          <StageMarker stage={1} className="mt-10" />
          <Reveal>
            <div className="reveal-rise relative mt-5 inline-block">
              <div
                aria-hidden
                className="bg-card/70 absolute inset-0 translate-x-2 translate-y-3 rotate-[1.8deg] rounded-3xl border"
              />
              <div className="bg-card relative rounded-3xl border p-6 sm:rotate-[-1.2deg] sm:p-8">
                <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
                  Fact No. 001
                </p>
                <p className="font-heading mt-2 text-2xl font-medium sm:text-3xl">
                  Octopuses have three hearts.
                </p>
              </div>
            </div>
          </Reveal>

          <p className="text-muted-foreground mt-9 max-w-xl text-lg leading-relaxed">
            That tiny idea just changed your brain. A few neurons strengthened
            their connections to hold it: a fresh memory trace, and a fragile
            one. This page follows what happens to it next.
          </p>
        </Container>
      </Section>

      {/* The fact sinks into the deep: the squid's ink pool is the top
          edge of the cobalt band. bg = outgoing canvas, text = incoming,
          same convention as TornEdge. */}
      <InkEdge className="bg-background text-cobalt" />

      {/* Scene 2: the forgetting curve. */}
      <Section
        canvas="cobalt"
        className="texture-grid relative overflow-hidden"
      >
        <Container className="relative">
          <StageMarker stage={2} className="mb-6" />
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Left alone, it fades fast.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed opacity-80">
            In 1885, Hermann Ebbinghaus memorized thousands of nonsense
            syllables and tested himself on them for months. The curve he drew
            has been replicated ever since: without review, most of a new memory
            slips away within days.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed opacity-80">
            Not because your brain is broken. Forgetting is its filing policy.
            Anything it does not see again gets marked as probably not
            important.
          </p>

          <Reveal className="mt-12 max-w-2xl">
            <ForgettingCurve />
          </Reveal>
        </Container>
      </Section>

      {/* Scene 3: retrieval, in a real quiz card that works without JS. */}
      <Section canvas="blush">
        <Container>
          <StageMarker stage={3} className="mb-6" />
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Pulling it back is what saves it.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">
            Quick, without scrolling up:
          </p>

          {/* Card and rescue art share the row: the card is short and wide
              (answers in a row, see quiz-card.tsx) so the whole scene fits a
              laptop viewport. */}
          <div className="mt-8 grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)]">
            <Reveal>
              <QuizCard className="reveal-rise" />
            </Reveal>
            {/* Small accent: Soma hauls the fact back out of the well it
                was slipping into. */}
            <Reveal className="justify-self-center lg:justify-self-end">
              <Image
                src={rescueArt}
                alt=""
                aria-hidden
                className="reveal-rise h-auto w-full max-w-[260px] lg:max-w-[300px]"
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              />
            </Reveal>
          </div>

          <p className="mt-10 max-w-2xl leading-relaxed opacity-80">
            That small tug you felt is retrieval. In 2006, Roediger and Karpicke
            showed that students who tested themselves remembered far more a
            week later than students who spent the same time re-reading.
            Successful retrieval changes the memory itself and makes the next
            recall easier.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed font-medium">
            The effort is not a sign of failure. The effort is the treatment.
          </p>
        </Container>
      </Section>

      {/* Scene 4: spacing. */}
      <Section className="texture-rules">
        <Container>
          <StageMarker stage={4} className="mb-6" />
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Timing beats trying.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl leading-relaxed">
            Every successful recall flattens the curve. The unintuitive part:
            the best moment to review is not right after learning. It is just
            before the memory would disappear. Tomorrow, then in three days,
            then next week.
          </p>
          <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
            Psychologists call it the spacing effect, one of the most replicated
            findings in the field. Cramming buys you the exam. Spacing buys you
            the year.
          </p>

          <Reveal className="mt-12 max-w-2xl">
            <SpacedCurve className="text-foreground" />
          </Reveal>
        </Container>
      </Section>

      {/* Scene 5: connection. */}
      <Section canvas="meadow" className="relative overflow-hidden">
        <Doodle name="dark-02" className="top-10 right-10 w-12 opacity-25" />
        <Doodle
          name="dark-16"
          className="bottom-12 left-8 w-14 -rotate-6 opacity-20"
        />
        <Container className="relative">
          <StageMarker stage={5} className="mb-6" />
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Facts survive by making friends.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed opacity-80">
            Memory is a network. A fact wired to other facts has many roads
            leading back to it, and every extra road is another chance to find
            it.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed opacity-80">
            Write it in your own words and you lay one road. Map it against what
            you already know and the roads start laying themselves.
            Understanding something is mostly connecting it.
          </p>

          <Reveal className="mt-12 max-w-2xl">
            <Constellation />
          </Reveal>
        </Container>
      </Section>

      {/* Scene 6: sleep. The lamp sits beside the text rather than under
          it, so the scene does not cost a viewport of scrolling. */}
      <Section canvas="ink" className="relative overflow-hidden">
        <Doodle name="light-05" className="top-12 left-12 w-8 opacity-40" />
        <Doodle name="light-13" className="top-24 right-16 w-10 opacity-30" />
        <Doodle name="light-18" className="bottom-14 left-1/3 w-8 opacity-30" />
        <Container className="relative">
          <StageMarker stage={6} className="mb-6" />
          <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Then sleep files it away.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed opacity-80">
                Sleep is when much of the brain&apos;s memory consolidation
                happens. The hippocampus replays the day&apos;s keepers and
                hands them to long-term storage. An app can remind you to study.
                It cannot do this part for you.
              </p>
            </div>
            {/* Soma asleep and breathing under a quilt of everything it
                learned that day (see night-doze.tsx). The art is a cutout
                with dark outlines that would vanish into a near-black band,
                so the page puts it in its own soft pool of warm light. */}
            <Reveal className="justify-self-center">
              <div className="reveal-rise relative">
                <div
                  aria-hidden
                  className="absolute -inset-x-10 -inset-y-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--butter)_0%,transparent_70%)] opacity-[0.13]"
                />
                <NightDoze className="relative w-72 sm:w-80 lg:w-96" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Scene 7: the payoff. */}
      <Section canvas="butter">
        <Container>
          <StageMarker stage={7} className="mb-6" />

          {/* Two equal halves. The heading and lede sit with the mapping,
              since they are one thought (what you watched, and what maps to
              it), which leaves the ceremony a full half of the row. */}
          <div className="grid items-center gap-x-20 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                You just watched one fact survive.
              </h2>
              <p className="mt-5 text-lg leading-relaxed">
                Every tool in Mnemo exists to help that happen.
              </p>
              <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {[
                  { term: "Retrieval", tool: "Flashcards and quizzes." },
                  {
                    term: "Timing",
                    tool: "A scheduler that reviews right before you would forget.",
                  },
                  {
                    term: "Connections",
                    tool: "Notes in your own words. Maps of how it all fits.",
                  },
                  { term: "Sleep", tool: "That's your job." },
                ].map((row) => (
                  <div key={row.term}>
                    <dt className="font-mono text-[11px] tracking-widest uppercase opacity-60">
                      {row.term}
                    </dt>
                    <dd className="mt-1.5 leading-snug font-medium">
                      {row.tool}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The ceremony: graduate, thesis, act. Pure CSS sprite
                animation; stands still under reduced motion. */}
            <div className="flex flex-col items-center text-center">
              <GradToss className="hidden h-48 sm:block" />
              <p className="font-heading mt-6 max-w-md text-2xl leading-snug font-medium text-balance">
                Mnemo was not designed around features. It was designed around
                how memories survive.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                {rebuild.active ? (
                  <ComingSoonPill href="/download" className="px-7 py-3.5" />
                ) : (
                  <Link
                    href="/download"
                    className="bg-butter-ink text-butter rounded-full px-7 py-3.5 text-sm font-medium"
                  >
                    Download Mnemo
                  </Link>
                )}
                <Link
                  href="/#features"
                  className="text-sm font-medium underline underline-offset-4"
                >
                  See what&apos;s inside
                </Link>
              </div>
            </div>
          </div>

          {/* Sources, kept to one quiet line rather than a further content
              block. */}
          <p className="border-butter-ink/15 mx-auto mt-16 max-w-3xl border-t pt-6 text-center font-mono text-[11px] leading-relaxed opacity-50 sm:mt-20">
            Sources: Ebbinghaus (1885), Über das Gedächtnis · Murre and Dros
            (2015), replication of the forgetting curve · Roediger and Karpicke
            (2006), test-enhanced learning · Cepeda et al. (2006), distributed
            practice · Dunlosky et al. (2013), effective learning techniques ·
            Rasch and Born (2013), sleep and memory
          </p>
        </Container>
      </Section>

      <TornEdge mascot className="bg-butter text-background" />
    </main>
  )
}
