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
import { Button } from "@/components/ui/button"
import { rebuild } from "@/config/site"

export const metadata: Metadata = {
  title: "Why it works",
  description:
    "Follow one fact through forgetting, retrieval, spacing, connection, and sleep to see why Mnemo uses the study methods it does.",
  alternates: { canonical: "/science" },
}

/**
 * The science story, "the journey of one fact": seven scenes, one band each,
 * following a single fact from encoding to survival. Full storyboard and
 * interaction plan live in docs/science-storyboard.md.
 *
 * Every scene is a two-column row: prose in a measure narrow enough to read,
 * its figure beside it. The page used to stack a max-w-xl paragraph above a
 * max-w-2xl diagram inside a max-w-6xl container, which left the right-hand
 * third of every band empty and made the page far taller than the story it
 * tells. The columns close that gap without shortening a single sentence.
 *
 * Bands are surface depths except where colour is load-bearing: the fact
 * sinks into water in scene 2, so that band is the sea, and scene 6 is night,
 * so that one is the app's dark canvas. No two adjacent scenes match.
 *
 * The page is a complete semantic article on its own; nothing on it may
 * depend on scroll interaction.
 */

/** Shared column geometry: prose left, figure right, stacked below lg. */
const SCENE_GRID =
  "grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)]"

export default function SciencePage() {
  return (
    <main id="main-content">
      {/* Scene 1: a fact is born. The fact card comes from the same deck as
          the scene-3 quiz card. The extra mobile bottom padding is headroom
          for the InkEdge squid's sprite frames. */}
      <Section className="texture-rules pb-44 sm:pb-28">
        <Container>
          <p className="type-eyebrow">Why it works</p>
          <h1 className="type-display mt-3 max-w-2xl">Read this once.</h1>

          <StageMarker stage={1} className="mt-12" />
          <div className={`${SCENE_GRID} mt-6`}>
            <p className="type-lede text-ink-2 max-w-xl">
              You have just learned a small piece of information. Right now
              it is easy to recall, but without seeing or using it again,
              that memory will become harder to access. This page follows
              what happens next.
            </p>
            <Reveal className="justify-self-start lg:justify-self-center">
              <div className="reveal-rise relative inline-block">
                <div
                  aria-hidden
                  className="bg-canvas/70 border-line absolute inset-0 translate-x-2 translate-y-3 rotate-[1.8deg] rounded-3xl border"
                />
                <div className="bg-canvas shadow-canvas relative rounded-3xl p-6 sm:rotate-[-1.2deg] sm:p-8">
                  <p className="text-ink-3 font-mono text-[11px] tracking-widest uppercase">
                    Fact No. 001
                  </p>
                  <p className="font-heading mt-2 text-2xl font-medium sm:text-3xl">
                    Octopuses have three hearts.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The fact sinks into the deep: the squid's ink pool is the top
          edge of the water below. bg = outgoing canvas, text = incoming,
          same convention as TornEdge. */}
      <InkEdge className="bg-paper text-sea" />

      {/* Scene 2: the forgetting curve. */}
      <Section canvas="sea" className="texture-grid relative overflow-hidden">
        <Container className="relative">
          <StageMarker stage={2} className="mb-8" />
          <div className={SCENE_GRID}>
            <div>
              <h2 className="type-h2 max-w-xl">
                Without review, new memories fade.
              </h2>
              {/* Explicit secondary ink rather than opacity: dimming the
                  paper ink on this band is what put it at 3.4:1. */}
              <p className="text-sea-ink-2 mt-5 max-w-xl leading-relaxed">
                In 1885, Hermann Ebbinghaus studied how quickly newly learned
                information becomes harder to recall. His work gave us the
                forgetting curve, a pattern that has been studied repeatedly
                since: without review, memory tends to decline over time.
              </p>
              <p className="text-sea-ink-2 mt-4 max-w-xl leading-relaxed">
                That is a normal part of learning. Information that is not
                revisited or used becomes harder to retrieve, while material
                you return to has a better chance of sticking.
              </p>
            </div>
            <Reveal>
              <ForgettingCurve />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Scene 3: retrieval, in a real quiz card that works without JS. */}
      <Section canvas="sunken">
        <Container>
          <StageMarker stage={3} className="mb-8" />
          <h2 className="type-h2 max-w-xl">Retrieval makes a difference.</h2>
          <p className="type-lede mt-5 max-w-xl">
            Quick, without scrolling up:
          </p>

          {/* Card and rescue art share the row: the card is short and wide
              (answers in a row, see quiz-card.tsx) so the whole scene fits a
              laptop viewport. */}
          <div className="mt-10 grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,36rem)_minmax(0,1fr)]">
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
                className="reveal-rise h-auto w-full max-w-[280px] lg:max-w-[320px]"
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              />
            </Reveal>
          </div>

          <p className="text-ink-2 mt-12 max-w-2xl leading-relaxed">
            That effort to bring the answer back is retrieval. In 2006,
            Roediger and Karpicke found that students who practiced recalling
            material retained more of it later than students who spent the
            same time re-reading. Trying to retrieve an answer is not just a
            way to check what you know. It is part of the learning process.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed font-medium">
            A little effort during recall can be useful. If the answer does
            not come immediately, that does not make the review wasted.
          </p>
        </Container>
      </Section>

      {/* Scene 4: spacing. */}
      <Section className="texture-rules">
        <Container>
          <StageMarker stage={4} className="mb-8" />
          <div className={SCENE_GRID}>
            <div>
              <h2 className="type-h2 max-w-xl">Spacing matters.</h2>
              <p className="text-ink-2 mt-5 max-w-xl leading-relaxed">
                Reviewing something immediately can make it feel familiar, but
                familiarity is not the same as long-term recall. Spaced
                practice brings material back after some time has passed,
                then increases or shortens the next interval based on how
                well it was remembered.
              </p>
              <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">
                Psychologists call this the spacing effect. It is one of the
                best established findings in learning research: spreading
                practice over time generally supports longer-lasting memory
                better than concentrating the same practice into one session.
              </p>
            </div>
            <Reveal>
              <SpacedCurve className="text-ink" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Scene 5: connection. */}
      <Section canvas="sunken" className="relative overflow-hidden">
        <Doodle
          name="dark-16"
          className="bottom-10 left-[4%] w-20 -rotate-6 opacity-20"
        />
        <Container className="relative">
          <StageMarker stage={5} className="mb-8" />
          <div className={SCENE_GRID}>
            <div>
              <h2 className="type-h2 max-w-xl">
                Connections make recall easier.
              </h2>
              <p className="text-ink-2 mt-5 max-w-xl leading-relaxed">
                New information is easier to work with when it connects to
                ideas you already understand. Those relationships give you
                more context and more possible routes back to the same fact.
              </p>
              <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">
                Writing something in your own words, comparing it with
                related ideas, or mapping how concepts fit together can make
                the material easier to understand and easier to retrieve
                later.
              </p>
            </div>
            <Reveal>
              <Constellation />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Scene 6: sleep. The lamp sits beside the text rather than under
          it, so the scene does not cost a viewport of scrolling. */}
      <Section canvas="deep" className="relative overflow-hidden">
        <Doodle name="light-13" className="top-16 right-[12%] w-16 opacity-30" />
        <Container className="relative">
          <StageMarker stage={6} className="mb-8" />
          <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="type-h2 max-w-xl">
                Sleep helps consolidate what you learned.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed opacity-80">
                Sleep plays an important role in memory consolidation, the
                process through which newly learned information becomes more
                stable over time. Studying can give your brain something
                worth keeping, but sleep is part of what happens after the
                study session ends.
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
                  className="absolute -inset-x-10 -inset-y-16 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--brand)_0%,transparent_70%)] opacity-[0.15]"
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
          <StageMarker stage={7} className="mb-8" />

          {/* Two equal halves. The heading and lede sit with the mapping,
              since they are one thought (what you watched, and what maps to
              it), which leaves the ceremony a full half of the row. */}
          <div className="grid items-center gap-x-20 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="type-h2">One fact, remembered.</h2>
              <p className="type-lede mt-5">
                The same ideas shape how Mnemo approaches studying.
              </p>
              <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {[
                  { term: "Retrieval", tool: "Flashcards and quizzes." },
                  {
                    term: "Timing",
                    tool: "Spaced reviews that adjust over time.",
                  },
                  {
                    term: "Connections",
                    tool: "Notes in your own words and maps of how ideas fit together.",
                  },
                  { term: "Sleep", tool: "That's your job." },
                ].map((row) => (
                  <div key={row.term}>
                    <dt className="text-ink-2 font-mono text-[11px] tracking-widest uppercase">
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
                Mnemo brings retrieval, spacing, notes, and visual connections
                together because they support different parts of the same
                learning process.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                {rebuild.active ? (
                  <ComingSoonPill href="/download" className="px-7 py-3.5" />
                ) : (
                  <Button asChild size="lg" className="rounded-full px-7">
                    <Link href="/download">Download Mnemo</Link>
                  </Button>
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
          <p className="border-ink/15 text-ink-2 mx-auto mt-16 max-w-3xl border-t pt-6 text-center font-mono text-[11px] leading-relaxed sm:mt-20">
            Sources: Ebbinghaus (1885), Über das Gedächtnis · Murre and Dros
            (2015), replication of the forgetting curve · Roediger and Karpicke
            (2006), test-enhanced learning · Cepeda et al. (2006), distributed
            practice · Dunlosky et al. (2013), effective learning techniques ·
            Rasch and Born (2013), sleep and memory
          </p>
        </Container>
      </Section>

      <TornEdge mascot className="bg-butter text-paper" />
    </main>
  )
}
