import Link from "next/link"

import { rebuild } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * Stand-in for a download CTA while the rebuild is in flight.
 *
 * Shaped like the pill it replaces so the layouts hold, outlined and dashed
 * so it reads as "not yet" before the label is read. Colours come from
 * currentColor, so it sits on any canvas without knowing which one. The
 * dimming stops at 75%, which is where ink stays above 4.5:1 on both the
 * paper and the wash band; at 60% it measured 4.07 and 3.77.
 *
 * Pass `href` on the CTAs that were only ever navigation (header, hero,
 * closing bands): they still lead to /download, which now carries the full
 * explanation, and nothing becomes a dead end. Leave it off where the button
 * really did start a file download; there is nothing behind it to click, and
 * a disabled control there would just invite the click.
 */
export function ComingSoonPill({
  label = rebuild.ctaLabel,
  href,
  className,
}: {
  label?: string
  href?: string
  className?: string
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border border-current border-dashed px-6 py-3 text-sm font-medium opacity-75",
    href && "transition-opacity hover:opacity-100",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return <span className={classes}>{label}</span>
}
