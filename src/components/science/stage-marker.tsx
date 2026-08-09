import { cn } from "@/lib/utils"

/**
 * The journey spine of /science: every scene opens with the same row of
 * seven dashes, one lit per scene, plus the stage name. Keeping one
 * element in one position across all scenes is what makes the stage words
 * read as a progress system rather than seven disconnected labels. The
 * quiz card repeats the dash motif.
 */

const STAGES = [
  "New",
  "Fading",
  "Retrieved",
  "Strengthening",
  "Connected",
  "Consolidating",
  "Remembered",
] as const

export function StageMarker({
  stage,
  className,
}: {
  /** 1-based scene number; lights that dash and prints that stage name. */
  stage: number
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 font-mono text-[11px] tracking-widest uppercase",
        className
      )}
    >
      <span aria-hidden className="flex items-center gap-1.5">
        {STAGES.map((name, index) => (
          <span
            key={name}
            className={cn(
              "h-[3px] w-5 rounded-full bg-current",
              index === stage - 1 ? "opacity-90" : "opacity-25"
            )}
          />
        ))}
      </span>
      <span className="opacity-70">
        {String(stage).padStart(2, "0")} · {STAGES[stage - 1]}
      </span>
    </p>
  )
}
