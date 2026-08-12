/**
 * Scene 3's self-test, styled as a real Mnemo quiz card: a slightly
 * tilted card on top of the rest of the deck, progress dashes, a mono
 * question label, and three radio answers in a row.
 *
 * The whole interaction is CSS. Each label wraps its radio and styles
 * itself with has-checked; the fieldset reveals the matching feedback
 * with group-has. Using :has() instead of peer selectors is what allows
 * the answers to sit in a flex row, since peer selectors require inputs,
 * labels, and feedback to be flat siblings. The check works with JS
 * disabled and there is nothing to hydrate. There is no reset: an answer
 * stays answered and a wrong pick keeps its feedback, which is the point
 * of the scene.
 *
 * The seven dashes are the page's journey spine (see StageMarker); the
 * third is lit because the card lives in stage 3, Retrieved.
 */

import { cn } from "@/lib/utils"

const option =
  "flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-xl border px-4 py-3 font-medium select-none transition-colors " +
  "before:size-4 before:shrink-0 before:rounded-full before:border-2 before:border-foreground/30 before:transition-all before:content-[''] " +
  "hover:bg-secondary/60 has-[:checked]:border-brand/45 has-[:checked]:bg-brand-wash has-[:checked]:before:border-[5px] has-[:checked]:before:border-brand " +
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring motion-reduce:transition-none motion-reduce:before:transition-none"

export function QuizCard({ className }: { className?: string }) {
  return (
    <div className={cn("relative max-w-xl", className)}>
      {/* The rest of the deck, peeking out behind the top card. */}
      <div
        aria-hidden
        className="bg-canvas/70 border-line absolute inset-0 translate-x-2 translate-y-3 rotate-[1.2deg] rounded-3xl border"
      />
      <fieldset className="group/quiz bg-canvas text-ink shadow-canvas relative rounded-3xl p-6 sm:rotate-[-0.9deg] sm:p-7">
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

        <p className="text-ink-2 mt-5 font-mono text-[11px] tracking-widest uppercase">
          Question 01 · Select one
        </p>
        <p className="font-heading mt-2 text-xl font-medium sm:text-2xl">
          How many hearts does an octopus have?
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <label className={option}>
            <input
              type="radio"
              name="octo-hearts"
              id="octo-one"
              className="sr-only"
            />
            One
          </label>
          <label className={option}>
            <input
              type="radio"
              name="octo-hearts"
              id="octo-two"
              className="sr-only"
            />
            Two
          </label>
          <label className={option}>
            <input
              type="radio"
              name="octo-hearts"
              id="octo-three"
              className="sr-only"
            />
            Three
          </label>
        </div>

        <div className="mt-5 hidden group-has-[#octo-one:checked]/quiz:block group-has-[#octo-two:checked]/quiz:block">
          <p className="text-ink-2 text-sm leading-relaxed">
            <span className="text-foreground font-medium">
              Three, actually.
            </span>{" "}
            Two pump blood to the gills, one pumps it everywhere else. A miss
            is fine: the correction sticks harder after the reach.
          </p>
        </div>
        <div className="mt-5 hidden group-has-[#octo-three:checked]/quiz:block">
          <p className="text-ink-2 text-sm leading-relaxed">
            <span className="text-foreground font-medium">Three it is.</span>{" "}
            Two pump blood to the gills, one pumps it everywhere else. And you
            just made the next recall easier.
          </p>
        </div>
      </fieldset>
    </div>
  )
}
