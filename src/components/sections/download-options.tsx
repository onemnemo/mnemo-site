"use client"

import Image from "next/image"
import { useEffect, useState, useSyncExternalStore } from "react"

import dlAlert from "@public/soma/dl-alert.png"
import dlIdle from "@public/soma/dl-idle.png"
import dlSent from "@public/soma/dl-sent.png"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * The download module: one oversized button for the visitor's detected
 * platform, and a compact list of every build below it. Deliberately not a
 * grid of per-platform cards; three identical cards with three identical
 * buttons read as template output, and almost every visitor only ever
 * needs the one button.
 *
 * Client component for three progressive touches: the detected platform,
 * the current version from the GitHub API, and the "on its way" state after
 * a click. With JS unavailable the fallback (three plain pills plus the
 * full list) renders complete and every link works.
 *
 * Download links use GitHub's releases/latest/download permalinks. The
 * release workflow names assets by channel and architecture with no version
 * stamp, so these URLs follow the newest stable release without the site
 * ever rebuilding.
 */

const LATEST = `${siteConfig.links.github}/releases/latest/download`

type PlatformKey = "windows" | "mac" | "linux"

type Build = {
  label: string
  file: string
}

type Platform = {
  key: PlatformKey
  name: string
  /** Arch note shown inside the big button, e.g. "x64 installer". */
  primaryArch: string
  /** Asset behind the big button; also the first entry in builds. */
  primaryFile: string
  builds: Build[]
}

const platforms: Platform[] = [
  {
    key: "windows",
    name: "Windows",
    primaryArch: "x64 installer",
    primaryFile: "Mnemo.Desktop-stable-win-x64-Setup.exe",
    builds: [
      {
        label: "Installer · x64 .exe",
        file: "Mnemo.Desktop-stable-win-x64-Setup.exe",
      },
      { label: "Portable · .zip", file: "Mnemo-Portable-win-x64.zip" },
    ],
  },
  {
    key: "mac",
    name: "macOS",
    primaryArch: "Apple Silicon",
    primaryFile: "Mnemo.Desktop-stable-osx-arm64-Setup.pkg",
    builds: [
      {
        label: "Apple Silicon · .pkg",
        file: "Mnemo.Desktop-stable-osx-arm64-Setup.pkg",
      },
      { label: "Intel · .pkg", file: "Mnemo.Desktop-stable-osx-x64-Setup.pkg" },
    ],
  },
  {
    key: "linux",
    name: "Linux",
    primaryArch: "x64 AppImage",
    primaryFile: "Mnemo.Desktop-stable-linux-x64.AppImage",
    builds: [
      {
        label: "AppImage · x64",
        file: "Mnemo.Desktop-stable-linux-x64.AppImage",
      },
      {
        label: "AppImage · arm64",
        file: "Mnemo.Desktop-stable-linux-arm64.AppImage",
      },
    ],
  },
]

/** Phones get no big button; the static copy already says desktop app. */
function detectPlatform(): PlatformKey | null {
  const ua = navigator.userAgent
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return null
  if (/Windows/i.test(ua)) return "windows"
  if (/Macintosh|Mac OS/i.test(ua)) return "mac"
  if (/Linux|X11/i.test(ua)) return "linux"
  return null
}

/**
 * The user agent never changes within a page's lifetime, so the store never
 * notifies; this exists to give the value distinct server and client
 * snapshots without an effect-and-setState render cascade.
 */
const emptySubscribe = () => () => {}

function useDetectedPlatform(): PlatformKey | null {
  return useSyncExternalStore(emptySubscribe, detectPlatform, () => null)
}

type ReleaseMeta = {
  version: string
  date: string
}

/**
 * Interaction states for the module, in document order of honesty: we know
 * the pointer is over the button, and we know the click happened. Download
 * progress and completion are invisible to the page, so no state pretends
 * to know them. These also drive the Soma reaction art once its poses land
 * (idle / alert / sent), via the data-state attribute.
 */
type Mood = "idle" | "alert" | "sent"

const moodArt = [
  { key: "idle", src: dlIdle },
  { key: "alert", src: dlAlert },
  { key: "sent", src: dlSent },
] as const

/**
 * Soma processing the download, standing behind the download card:
 * waiting, then noticing the hover, then filing the click on a clipboard.
 * All three poses stay mounted and crossfade, which works because the
 * pipeline crops them to one shared window so the character never shifts.
 * Purely decorative, hence hidden from assistive tech; the caption's
 * aria-live line carries the same information as the clipboard pose.
 */
function SomaMoods({ mood, className }: { mood: Mood; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative", className)}
      style={{ aspectRatio: `${dlIdle.width} / ${dlIdle.height}` }}
    >
      {moodArt.map((art) => (
        <Image
          key={art.key}
          src={art.src}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-auto transition-opacity duration-300 motion-reduce:transition-none",
            mood === art.key ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  )
}

export function DownloadOptions({
  children,
  className,
}: {
  /**
   * The hero text (kicker, heading, lede), passed through from the server
   * component so it stays server-rendered. It shares a grid with Soma and
   * the button, which is what makes the section read as one composition
   * instead of a stack of parts.
   */
  children: React.ReactNode
  className?: string
}) {
  const detected = useDetectedPlatform()
  const [release, setRelease] = useState<ReleaseMeta | null>(null)
  const [mood, setMood] = useState<Mood>("idle")

  useEffect(() => {
    const controller = new AbortController()
    fetch("https://api.github.com/repos/onemnemo/mnemo/releases/latest", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { tag_name?: string; published_at?: string } | null) => {
        if (!json?.tag_name) return
        const date = json.published_at
          ? new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(new Date(json.published_at))
          : ""
        setRelease({ version: json.tag_name, date })
      })
      .catch(() => {
        // Rate limited or offline: the fallback line is already accurate.
      })
    return () => controller.abort()
  }, [])

  const primary = platforms.find((platform) => platform.key === detected)
  const versionLine = release
    ? `${release.version}, released ${release.date}. ${siteConfig.license} licensed.`
    : `Latest stable release. ${siteConfig.license} licensed.`

  return (
    <div className={className} data-state={mood}>
      {/* Hero zone: text on the left; on the right, the download moment
          as a card dealt from the same deck as the fact and quiz cards
          on /science (offset back card, slight tilt). Soma stands BEHIND
          the card, feet hidden by its edge, watching the button: the
          negative bottom margin is what pulls the card up over the feet,
          the same peek trick as the footer and the OG image. */}
      <div className="grid items-center gap-x-16 gap-y-12 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>{children}</div>

        <div
          className="enter-rise w-full max-w-md sm:w-auto sm:justify-self-end"
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          <SomaMoods
            mood={mood}
            className="z-0 -mb-12 ml-auto h-36 w-fit sm:mr-6 sm:-mb-14 sm:h-44"
          />
          <div className="relative">
            <div
              aria-hidden
              className="bg-card/70 absolute inset-0 translate-x-2 translate-y-3 rotate-[1.4deg] rounded-3xl border"
            />
            <div className="bg-card relative rounded-3xl border p-6 shadow-sm sm:rotate-[-1deg] sm:p-7">
              {primary ? (
                <a
                  href={`${LATEST}/${primary.primaryFile}`}
                  onClick={() => setMood("sent")}
                  onMouseEnter={() =>
                    setMood((m) => (m === "sent" ? m : "alert"))
                  }
                  onMouseLeave={() =>
                    setMood((m) => (m === "sent" ? m : "idle"))
                  }
                  className="bg-primary text-primary-foreground inline-flex items-baseline gap-3 rounded-full px-6 py-4 text-base font-medium shadow-sm transition-transform hover:-translate-y-0.5 motion-reduce:transition-none sm:px-8 sm:text-lg"
                >
                  Download for {primary.name}
                  {/* The arch note yields on narrow screens: with it the
                      label wraps inside the card, and the builds list
                      below carries the same fact. */}
                  <span className="hidden font-mono text-xs opacity-80 sm:inline">
                    {primary.primaryArch}
                  </span>
                </a>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <a
                      key={platform.key}
                      href={`${LATEST}/${platform.primaryFile}`}
                      onClick={() => setMood("sent")}
                      className="bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              )}
              <p
                className="text-muted-foreground mt-4 max-w-[36ch] text-sm leading-relaxed"
                aria-live="polite"
              >
                {mood === "sent"
                  ? "On its way. Look for it in your browser's downloads."
                  : versionLine}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All builds: one framed block, with the provenance note as the
          list's own caption instead of a stray paragraph below it. */}
      <Reveal className="mt-16 grid gap-x-12 gap-y-6 border-t pt-8 sm:mt-20 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div className="reveal-rise">
          <h2 className="font-sans text-sm font-semibold tracking-tight">
            All builds
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Every build is compiled in public by GitHub Actions from source you
            can read.{" "}
            <a
              href={`${siteConfig.links.github}/releases`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              All versions and release notes
            </a>
            .
          </p>
        </div>
        <dl
          className="reveal-rise divide-y self-start"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {platforms.map((platform) => (
            <div
              key={platform.key}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-3.5 first:pt-0"
            >
              <dt className="w-24 shrink-0 text-sm font-medium">
                {platform.name}
                {detected === platform.key ? (
                  <span className="text-primary ml-2 font-mono text-[11px]">
                    yours
                  </span>
                ) : null}
              </dt>
              <dd className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
                {platform.builds.map((build) => (
                  <a
                    key={build.file}
                    href={`${LATEST}/${build.file}`}
                    onClick={() => setMood("sent")}
                    className={cn(
                      "hover:text-foreground underline underline-offset-4 transition-colors",
                      "decoration-border hover:decoration-current",
                    )}
                  >
                    {build.label}
                  </a>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  )
}
