import { cn } from "@/lib/utils"

type AnnotationProps = {
  /**
   * Which way the arrow points, and so which side of the caption it sits on.
   * "left" puts the arrow first, curving up and to the left; "right" mirrors
   * it and puts it after the caption.
   */
  points: "left" | "right"
  /** Extra rotation in degrees, for reaching a target that is not up-and-over. */
  tilt?: number
  /** Positioning, e.g. "bottom-[-3rem] left-56". */
  className?: string
  children: React.ReactNode
}

/**
 * A handwritten aside pointing at something in a screenshot.
 *
 * The module rows lift a detail out of the capture and float it over the wide
 * shot; the reader still has to be told which detail and why it matters. A
 * caption underneath would be read as a figure title for the whole row, so
 * the note is tied to its target with a drawn arrow instead.
 *
 * Mono, ink-2, no box: it should read as something pencilled onto the page
 * rather than as another card competing with the screenshot. The arrow is the
 * same two-stroke curve everywhere, mirrored rather than redrawn, so the
 * asides look like one hand made them.
 *
 * Decorative and absolutely positioned against rem offsets that only hold
 * once the row is wide enough, so callers hide it below `lg`.
 */
export function Annotation({
  points,
  tilt = 0,
  className,
  children,
}: AnnotationProps) {
  const arrow = (
    <svg
      aria-hidden
      viewBox="0 0 60 40"
      fill="none"
      /* 48x32 is the viewBox's own 3:2, so the drawing fills the box instead
         of being letterboxed inside it and floating away from the caption. */
      className="text-ink-2 h-8 w-12 flex-none"
      style={{
        transform: `${points === "right" ? "scaleX(-1)" : ""} rotate(${
          points === "right" ? -tilt : tilt
        }deg)`,
      }}
    >
      <path
        d="M54 36 Q 30 34 12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12 l0.5 9 M12 12 l8.5 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
  return (
    <div
      className={cn(
        "pointer-events-none absolute flex items-end gap-1.5",
        className
      )}
    >
      {points === "left" && arrow}
      <span className="text-ink-2 pb-0.5 font-mono text-[0.8125rem] whitespace-nowrap">
        {children}
      </span>
      {points === "right" && arrow}
    </div>
  )
}
