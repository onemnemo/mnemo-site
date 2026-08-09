import Image from "next/image"

import dlIdle from "@public/soma/dl-idle.png"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/config/site"

/**
 * What the download module becomes while the rebuild is in flight.
 *
 * Deliberately a mirror of download-options.tsx rather than a flag inside it:
 * the real module's platform detection, release lookup, and asset permalinks
 * all stay intact and untouched behind the switch, and this file carries none
 * of them. Server component, because with nothing to download there is
 * nothing to react to.
 *
 * Where the live module puts a download button, this puts the reason there is
 * not one, and the "All builds" list becomes the shape of the work instead.
 */

const changes = [
  {
    label: "New shell",
    detail:
      "The desktop app is moving off Avalonia onto React and Photino, so the interface and the web work share one codebase.",
  },
  {
    label: "New look",
    detail:
      "Every screen is being redrawn. The screenshots on this site are a mix of the old app and the new one, so read them as a work in progress rather than a finished product.",
  },
  {
    label: "Same principles",
    detail: `Local-first, offline, no account, ${siteConfig.license} licensed. None of that is up for renegotiation.`,
  },
]

export function DownloadComingSoon({
  children,
  className,
}: {
  /** The page's kicker, heading, and lede, kept server-rendered upstream. */
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      {/* Same hero geometry as the live module: text left, tilted card right,
          Soma standing behind it with its feet under the card edge. */}
      <div className="grid items-center gap-x-16 gap-y-12 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>{children}</div>

        <div
          className="enter-rise w-full max-w-md sm:w-auto sm:justify-self-end"
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          <Image
            src={dlIdle}
            alt=""
            aria-hidden
            className="z-0 -mb-12 ml-auto h-36 w-auto sm:mr-6 sm:-mb-14 sm:h-44"
          />
          <div className="relative">
            <div
              aria-hidden
              className="bg-card/70 absolute inset-0 translate-x-2 translate-y-3 rotate-[1.4deg] rounded-3xl border"
            />
            <div className="bg-card relative rounded-3xl border p-6 shadow-sm sm:rotate-[-1deg] sm:p-7">
              {/* Not a disabled button: there is no action behind it to
                  disable, and a dead control only invites the click. */}
              <span className="text-muted-foreground inline-flex items-center rounded-full border border-dashed px-6 py-4 text-base font-medium sm:px-8 sm:text-lg">
                Downloads coming soon
              </span>
              <p className="text-muted-foreground mt-4 max-w-[36ch] text-sm leading-relaxed">
                Mnemo is built in public, so the rebuild is happening where you
                can watch it.{" "}
                <a
                  href={siteConfig.links.releases}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline underline-offset-2"
                >
                  Watch releases on GitHub
                </a>{" "}
                and the new build will show up there first.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Reveal className="mt-16 grid gap-x-12 gap-y-6 border-t pt-8 sm:mt-20 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div className="reveal-rise">
          <h2 className="font-sans text-sm font-semibold tracking-tight">
            What is changing
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            The port and the redesign are landing together, which is why there
            is a gap rather than a slow trickle of releases.
          </p>
        </div>
        <dl
          className="reveal-rise divide-y self-start"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {changes.map((change) => (
            <div
              key={change.label}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-3.5 first:pt-0"
            >
              <dt className="w-32 shrink-0 text-sm font-medium">
                {change.label}
              </dt>
              <dd className="text-muted-foreground max-w-prose flex-1 text-sm leading-relaxed">
                {change.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  )
}
