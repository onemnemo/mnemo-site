"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PlatformDownload } from "@/components/sections/platform-download"
import { detectPlatform, platforms, releasesUrl, type Platform, type ReleaseResult } from "@/lib/beta-release"

const subscribe = () => () => {}
const serverPlatform = () => "unknown" as const
const browserPlatform = () => detectPlatform(navigator.userAgent, navigator.platform, navigator.maxTouchPoints)
const platformOptions: (Platform | null)[] = [null, "windows", "macos", "linux"]

export function BetaDownloadPicker({ result }: { result: ReleaseResult }) {
  const detected = useSyncExternalStore(subscribe, browserPlatform, serverPlatform)
  const [chosen, setChosen] = useState<Platform | null>(null)
  const selected = chosen ?? (detected === "mobile" || detected === "unknown" ? null : detected)
  const release = result.status === "ready" ? result.release : null

  return (
    <div className="bg-canvas relative rounded-2xl border p-6 shadow-sm sm:p-7">
      <h2 className="font-sans text-2xl font-medium tracking-tight">{release?.channel === "stable" ? "Get Mnemo." : "Get the beta."}</h2>
      <p className="text-ink-2 mt-3 text-sm leading-relaxed">
        {detected === "mobile" ? "Mnemo runs on a desktop computer. Choose a platform to see its downloads."
          : "Choose the computer you’ll use Mnemo on."}
      </p>
      <fieldset className="mt-5">
        <legend className="sr-only">Operating system</legend>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(platforms) as Platform[]).map((key) => (
            <label key={key} className="cursor-pointer">
              <input className="peer sr-only" type="radio" name="platform" value={key} checked={selected === key} onChange={() => setChosen(key)} />
              <span className="block rounded-lg border px-2 py-2.5 text-center text-sm peer-checked:border-ink peer-checked:bg-sunken peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">{platforms[key].name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="mt-5 grid">
        {/* Overlapping panels reserve the tallest content at every viewport width. */}
        {platformOptions.map((key) => (
          <div key={key ?? "unknown"} className={`col-start-1 row-start-1 ${selected === key ? "visible" : "invisible"}`} aria-hidden={selected !== key} inert={selected !== key}>
            <PlatformDownload selected={key} result={result} />
          </div>
        ))}
      </div>
      <p className="text-ink-2 mt-5 border-t pt-4 text-xs leading-relaxed">
        {release?.channel !== "stable" && "All builds are beta software. Bugs may cause data loss. "}Keep a separate backup of anything important, especially before updating.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-xs">
        <a href={release?.url ?? releasesUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">{release ? `Release notes for ${release.tag.replace(/^v/, "")}` : "Check GitHub releases"}<ArrowUpRight size={13} aria-hidden /></a>
        {release?.checksums && <a href={release.checksums.url} className="underline underline-offset-4">Checksums</a>}
        <Link href="/docs/users/getting-started/installation" className="underline underline-offset-4">Installation help</Link>
      </div>
      <details className="mt-5 border-t pt-4">
        <summary className="cursor-pointer py-1 text-sm font-medium">All downloads</summary>
        <p className="text-ink-2 mt-3 text-xs leading-relaxed">Your browser can suggest an operating system, but not reliably identify your processor. Check the architecture before downloading.</p>
        {release ? <ul className="mt-3 divide-y">
          {(Object.keys(platforms) as Platform[]).map((key) => {
            const option = platforms[key]
            const downloads = release.downloads[key]
            return <li key={key} className="py-4 text-sm">
              <p className="font-medium">{option.name} · {option.architecture}</p>
              <p className="text-ink-2 mt-1 text-xs leading-relaxed">{option.status}. {option.notice}</p>
              <div className="mt-3 flex flex-wrap gap-4">
                {downloads?.installer && <a className="underline underline-offset-4" href={downloads.installer.url}>{option.format}</a>}
                {downloads?.portable && <a className="underline underline-offset-4" href={downloads.portable.url}>Portable archive</a>}
                {!downloads && <span className="text-ink-2">Not available for this release.</span>}
              </div>
            </li>
          })}
        </ul> : <a href={releasesUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">All releases on GitHub</a>}
      </details>
    </div>
  )
}
