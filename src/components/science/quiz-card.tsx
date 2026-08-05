/**
 * Scene 3's self-test, styled as a real Mnemo quiz card: a slightly
 * tilted card on top of the rest of the deck, progress dashes, a mono
 * question label, and three radio answers.
 *
 * The whole interaction is CSS. The radios are visually hidden peers;
 * picking one restyles its own label and reveals the matching feedback
 * block, so the check works with JS disabled and there is nothing to
 * hydrate. There is deliberately no reset: like a real quiz, an answer
 * stays answered, and a wrong pick keeps its feedback (the correction
 * sticking is the point of the scene).
 *
 * The seven dashes are the page's journey spine (see StageMarker); the
 * third is lit because the card lives in stage 3, Retrieved.
 */

import { cn } from "@/lib/utils"

const optionLabel =
  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 font-medium select-none transition-colors " +
  "before:size-4 before:shrink-0 before:rounded-full before:border-2 before:border-foreground/30 before:transition-all before:content-[''] " +
  "hover:bg-secondary/60 motion-reduce:transition-none motion-reduce:before:transition-none"

/* Written out literally per peer: Tailwind only generates classes it can
   see as full strings in the source. */
const optionChecked = {
  one: "peer-checked/one:border-primary/40 peer-checked/one:bg-secondary/60 peer-checked/one:before:border-[5px] peer-checked/one:before:border-primary peer-focus-visible/one:ring-2 peer-focus-visible/one:ring-ring",
  two: "peer-checked/two:border-primary/40 peer-checked/two:bg-secondary/60 peer-checked/two:before:border-[5px] peer-checked/two:before:border-primary peer-focus-visible/two:ring-2 peer-focus-visible/two:ring-ring",
  three:
    "peer-checked/three:border-primary/40 peer-checked/three:bg-secondary/60 peer-checked/three:before:border-[5px] peer-checked/three:before:border-primary peer-focus-visible/three:ring-2 peer-focus-visible/three:ring-ring",
} as const

export function QuizCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative max-w-md", className)}>
      {/* The rest of the deck, peeking out behind the top card. */}
      <div
        aria-hidden
        className="bg-card/70 absolute inset-0 translate-x-2 translate-y-3 rotate-[1.8deg] rounded-3xl border"
      />
      <fieldset className="bg-card text-card-foreground relative rounded-3xl border p-6 shadow-sm sm:rotate-[-1.2deg] sm:p-8">
        <legend className="sr-only">
          Quick check: how many hearts does an octopus have?
        </legend>

        <div aria-hidden className="flex items-center gap-1.5">
          {Array.from({ length: 7 }, (_, index) => (
            <span
              key={index}
              className={cn(
                "h-[3px] w-6 rounded-full bg-current",
                index === 2 ? "opacity-90" : "opacity-20"
              )}
            />
          ))}
        </div>

        <p className="text-muted-foreground mt-6 font-mono text-[11px] tracking-widest uppercase">
          Question 01
        </p>
        <p className="font-heading mt-2 text-xl font-medium sm:text-2xl">
          How many hearts does an octopus have?
        </p>
        <p className="text-muted-foreground/80 mt-6 font-mono text-[11px] tracking-widest uppercase">
          Select one
        </p>

        {/* All radios first, then their labels, then the feedback: peers
            only reach siblings, so everything stays in one flat list. */}
        <input
          type="radio"
          name="octo-hearts"
          id="octo-one"
          className="peer/one sr-only"
        />
        <input
          type="radio"
          name="octo-hearts"
          id="octo-two"
          className="peer/two sr-only"
        />
        <input
          type="radio"
          name="octo-hearts"
          id="octo-three"
          className="peer/three sr-only"
        />

        <label
          htmlFor="octo-one"
          className={cn(optionLabel, "mt-3", optionChecked.one)}
        >
          One
        </label>
        <label
          htmlFor="octo-two"
          className={cn(optionLabel, "mt-2.5", optionChecked.two)}
        >
          Two
        </label>
        <label
          htmlFor="octo-three"
          className={cn(optionLabel, "mt-2.5", optionChecked.three)}
        >
          Three
        </label>

        <div className="peer-checked/one:block peer-checked/two:block mt-5 hidden">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="text-foreground font-medium">
              Three, actually.
            </span>{" "}
            Two pump blood to the gills, one pumps it everywhere else. A
            miss is fine: the correction sticks harder after the reach.
          </p>
        </div>
        <div className="peer-checked/three:block mt-5 hidden">
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="text-foreground font-medium">Three it is.</span>{" "}
            Two pump blood to the gills, one pumps it everywhere else. And
            you just made the next recall easier.
          </p>
        </div>
      </fieldset>
    </div>
  )
}
