import flashcardsShot from "@public/screenshots/flashcards.png"
import mindmapsShot from "@public/screenshots/mindmaps.png"
import notesShot from "@public/screenshots/notes.png"
import { Annotation } from "@/components/annotation"
import { Container } from "@/components/layout/container"
import { ScreenshotCrop } from "@/components/screenshot-crop"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"

/**
 * The three modules, told once each, at full width.
 *
 * This replaces a two-column alternating layout in which the screenshot got a
 * 24rem-to-1fr split of the container. These are captures of a dense desktop
 * app; at that width the interface being described was unreadable, so the
 * proof shot was decoration. Each module now gets the full container: a
 * cropped wide shot of the screen, plus one detail lifted out of the same
 * capture and floated over it with a drawn note saying why it matters.
 *
 * The detail is the argument. "Serious spaced repetition" is a claim anyone
 * can print; the grading row pulled out of the real review screen is the
 * thing that makes it checkable.
 *
 * Both the section intro and the trailing "around the tools" cards are gone.
 * The intro said in three sentences what the three rows underneath it then
 * said properly, and the cards made three more claims with no proof attached
 * at the point where the reader had just been given three that had it.
 *
 * The top padding is the standard band rhythm again. It was outsized to clear
 * the hero screenshot hanging down into this band; the tear above now marks
 * the boundary instead (see hero.tsx).
 *
 * Section carries id="features" because the navbar's Features link targets
 * /#features.
 */

function ModuleIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="reveal-rise">
      <p className="type-eyebrow">{eyebrow}</p>
      <h2 className="type-h2 mt-3 max-w-2xl">{title}</h2>
      <p className="text-ink-2 mt-4 max-w-xl leading-relaxed">{body}</p>
    </div>
  )
}

/** Wraps the media so the crop and its floated detail rise together. */
const mediaDelay = { "--reveal-delay": "70ms" } as React.CSSProperties

export function Modules() {
  return (
    <Section
      id="features"
      canvas="sunken"
      className="relative"
    >
      <Container>
        <Reveal>
          <ModuleIntro
            eyebrow="Notes"
            title="Take notes your way."
            body="Write freely with blocks, then shape things as you go. Text, images, math, code, lists, tables, and more all live on the same page."
          />
          <div className="reveal-rise relative mt-14" style={mediaDelay}>
            <ScreenshotCrop
              src={notesShot}
              alt="Close crop of the Mnemo notes editor showing headings, highlights, and a callout block"
              ratio="1131 / 560"
              crop={{ width: "127.23%", left: "-27.23%", top: "-42.9%" }}
              sizes="(min-width: 1200px) 1384px, 118vw"
              className="shadow-canvas rounded-2xl"
            />
            {/*
             * The sidebar, at the zoom you would actually read it at.
             *
             * Below lg the detail drops out of the overlay and into flow
             * underneath, which is the same breakpoint the drawn asides
             * appear at: either the whole annotated composition, or a plain
             * screenshot with its detail beneath it, never half of one.
             *
             * The float is sized as a fraction of the shot it sits on, so as
             * the shot shrinks the detail takes more and more of it. By the
             * tablet range it covers about four fifths, and stops reading as
             * a detail lifted out of a screenshot at all.
             */}
            <ScreenshotCrop
              src={notesShot}
              alt="The sidebar notes tree with subjects like Medicine, Biology, and Physics"
              ratio="240 / 320"
              crop={{ width: "599.6%", left: "-25%", top: "-90.6%" }}
              sizes="(min-width: 1200px) 1248px, 45vw"
              className="shadow-pop relative mt-4 w-44 rounded-xl lg:absolute lg:mt-0 lg:bottom-[-2.5rem] lg:left-0 lg:w-52 lg:max-w-[45%]"
            />
            <Annotation
              points="left"
              className="bottom-[-3rem] left-[14.5rem] max-lg:hidden"
            >
              your whole library, one sidebar
            </Annotation>
          </div>
        </Reveal>

        <Reveal className="mt-36 sm:mt-44">
          <ModuleIntro
            eyebrow="Flashcards"
            title="Remember what you learn."
            body="Mnemo uses FSRS to bring cards back when you need them. Hard things appear sooner. Easy things wait."
          />
          <div className="reveal-rise relative mt-14" style={mediaDelay}>
            <ScreenshotCrop
              src={flashcardsShot}
              alt="A Mnemo flashcard with a medicine question, its answer, and an inline diagram"
              ratio="1130 / 565"
              crop={{ width: "127.2%", left: "-14.2%", top: "-29.2%" }}
              sizes="(min-width: 1200px) 1384px, 118vw"
              className="shadow-canvas rounded-2xl"
            />
            {/* Just the grading row: the whole scheduling claim in one strip. */}
            <ScreenshotCrop
              src={flashcardsShot}
              alt="The Again, Hard, Good, and Easy grading buttons"
              ratio="746 / 66"
              crop={{ width: "192.6%", left: "-49.9%", top: "-1178.8%" }}
              sizes="(min-width: 1200px) 740px, 135vw"
              className="shadow-pop relative mt-4 w-full rounded-xl lg:absolute lg:mt-0 lg:right-8 lg:bottom-[-2rem] lg:w-96 lg:max-w-[70%]"
            />
            <Annotation
              points="right"
              className="right-[27rem] bottom-[-2.75rem] max-lg:hidden"
            >
              grade the card, Mnemo handles the timing
            </Annotation>
          </div>
        </Reveal>

        <Reveal className="mt-36 sm:mt-44">
          <ModuleIntro
            eyebrow="Mind maps"
            title="Room to think."
            body="Spread ideas across a full canvas. Move them, connect them, group them, and make sense of the bigger picture."
          />
          <div className="reveal-rise relative mt-20" style={mediaDelay}>
            <ScreenshotCrop
              src={mindmapsShot}
              alt="A wide crop of a Mnemo mind map of cell respiration with colored branches"
              ratio="1380 / 690"
              crop={{ width: "103.99%", left: "-3.99%", top: "-24.6%" }}
              sizes="(min-width: 1200px) 1132px, 104vw"
              className="shadow-canvas rounded-2xl"
            />
            {/*
             * The canvas toolbar, which already has the pill shape this float
             * is drawn with. Sits above the crop's top edge rather than below
             * its bottom, so the three rows do not all resolve the same way.
             */}
            <ScreenshotCrop
              src={mindmapsShot}
              alt="The mind map canvas toolbar: select, add node, connect, frame, and zoom"
              ratio="299 / 32"
              crop={{ width: "479.6%", left: "-199.33%", top: "-2643.76%" }}
              sizes="(min-width: 1200px) 1843px, 336vw"
              className="shadow-pop relative mt-4 w-full rounded-full lg:absolute lg:mt-0 lg:top-[-1.25rem] lg:right-12 lg:w-96 lg:max-w-[70%]"
            />
            <Annotation
              points="right"
              tilt={20}
              className="top-[-2.5rem] right-[28rem] items-center max-lg:hidden"
            >
              move, connect, and think freely
            </Annotation>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
