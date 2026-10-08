import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { platforms, type Platform, type ReleaseResult } from "@/lib/beta-release"

export function PlatformDownload({ selected, result }: { selected: Platform | null; result: ReleaseResult }) {
  const platform = selected ? platforms[selected] : null
  const release = result.status === "ready" ? result.release : null
  const files = selected ? release?.downloads[selected] : null

  return (
    <>
      {platform && (
        <>
          <p className="text-sm font-semibold">{platform.status}</p>
          <p className="text-ink-2 mt-2 text-sm leading-relaxed">{platform.notice}</p>
          <p className="text-ink-2 mt-3 text-xs leading-relaxed">{platform.requirement}</p>
        </>
      )}
      {release ? (
        selected && platform ? files?.installer ? (
          <>
            <Button asChild size="lg" className="mnemo-download mt-5 w-full">
              <a href={files.installer.url}>Download for {platform.name}<ArrowDown size={17} aria-hidden /></a>
            </Button>
            <p className="text-ink-2 mt-2 text-center text-xs">{platform.format} · {platform.architecture} · {Math.round(files.installer.size / 1024 / 1024)} MB</p>
          </>
        ) : <p className="mt-5 text-sm leading-relaxed">The {platform.name} installer is not available for this release.</p>
        : <p className="text-ink-2 text-sm">Choose a platform above to see its download and testing status.</p>
      ) : (
        <p className="mt-5 text-sm leading-relaxed">
          {result.status === "pending" ? "No release is published yet. Downloads will appear here when one is ready."
            : "We couldn’t check the current download. Try again shortly, or check GitHub for the release."}
        </p>
      )}
      {files?.portable && <a className="mt-4 block text-sm underline underline-offset-4" href={files.portable.url}>Portable {platform?.architecture} {selected === "windows" ? "(.zip)" : "(.tar.gz)"}</a>}
    </>
  )
}
