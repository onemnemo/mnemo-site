import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Horizontal content constraint used inside every Section.
 *
 * Kept as its own component (rather than repeating utility classes) so the
 * site-wide content width can change in exactly one place.
 */
export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
