export const releaseSeries = "v0.8.0-rc."
export const releasesUrl = "https://github.com/onemnemo/mnemo/releases"

export const platforms = {
  windows: {
    name: "Windows", architecture: "x64", status: "Most tested",
    notice: "Windows is the furthest along and has had the most testing. macOS has been verified on a Mac, and Linux has had limited testing so far.",
    requirement: "Windows 10 or 11, 64-bit Intel or AMD.",
    installer: "Mnemo.Desktop.V2-win-x64-beta-Setup.exe",
    portable: "Mnemo-Portable-win-x64.zip", format: "Installer (.exe)",
  },
  macos: {
    name: "macOS", architecture: "Apple silicon", status: "Verified",
    notice: "The macOS build has been installed and verified on an Apple silicon Mac, and it is notarized by Apple. It has had less testing than Windows, so expect a few more rough edges.",
    requirement: "Apple silicon (M1 or newer). No Intel Mac build. Notarized by Apple.",
    installer: "Mnemo.Desktop.V2-osx-arm64-beta-Setup.pkg",
    portable: "Mnemo-Portable-osx-arm64.tar.gz", format: "Installer (.pkg)",
  },
  linux: {
    name: "Linux", architecture: "x64", status: "Limited testing",
    notice: "Linux has had less development attention and only limited testing. Expect more rough edges than on Windows, including problems specific to your distribution.",
    requirement: "64-bit Intel or AMD. Targets Ubuntu 22.04 or newer; see the installation guide for dependencies.",
    installer: "Mnemo.Desktop.V2-linux-x64-beta.AppImage",
    portable: "Mnemo-Portable-linux-x64.tar.gz", format: "AppImage",
  },
} as const

export type Platform = keyof typeof platforms
export type DownloadAsset = { name: string; url: string; size: number }
export type BetaRelease = {
  tag: string
  channel: "beta" | "stable"
  url: string
  checksums?: DownloadAsset
  downloads: Partial<Record<Platform, { installer?: DownloadAsset; portable?: DownloadAsset }>>
}
export type ReleaseResult =
  | { status: "ready"; release: BetaRelease }
  | { status: "pending" | "unavailable" }

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function selectBetaRelease(data: unknown): BetaRelease | null {
  if (!Array.isArray(data)) throw new Error("Invalid release list")
  const candidates = data.filter((item): item is Record<string, unknown> =>
    record(item) && item.draft === false && typeof item.tag_name === "string" &&
    (/^v0\.8\.0-rc\.[1-9]\d*$/.test(item.tag_name) || (item.tag_name === "v0.8.0" && item.prerelease === false))
  ).sort((a, b) => {
    if (a.tag_name === "v0.8.0") return -1
    if (b.tag_name === "v0.8.0") return 1
    return Number(String(b.tag_name).slice(releaseSeries.length)) - Number(String(a.tag_name).slice(releaseSeries.length))
  })

  for (const candidate of candidates) {
    const tag = String(candidate.tag_name)
    const channel = tag === "v0.8.0" ? "stable" : "beta"
    const assets = new Map<string, DownloadAsset>()
    if (!Array.isArray(candidate.assets)) throw new Error("Invalid release assets")
    for (const asset of candidate.assets) {
      if (!record(asset) || typeof asset.name !== "string" || asset.state !== "uploaded" ||
        typeof asset.size !== "number" || asset.size <= 0) continue
      const url = asset.browser_download_url
      if (typeof url !== "string" || !url.startsWith(`${releasesUrl}/download/${tag}/`)) continue
      assets.set(asset.name, { name: asset.name, url, size: asset.size })
    }
    const checksums = assets.get("SHA256SUMS.txt")
    const downloads: BetaRelease["downloads"] = {}
    for (const platform of Object.keys(platforms) as Platform[]) {
      const installer = assets.get(platforms[platform].installer.replace("-beta", `-${channel}`))
      const portable = assets.get(platforms[platform].portable)
      if (installer || portable) downloads[platform] = { installer, portable }
    }
    return { tag, channel, url: `${releasesUrl}/tag/${tag}`, checksums, downloads }
  }
  return null
}

export function detectPlatform(userAgent: string, platform = "", maxTouchPoints = 0): Platform | "mobile" | "unknown" {
  if (/Android|iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform) && maxTouchPoints > 1)) return "mobile"
  if (/CrOS/i.test(userAgent)) return "unknown"
  if (/Windows/i.test(userAgent)) return "windows"
  if (/Macintosh|Mac OS X/i.test(userAgent)) return "macos"
  if (/Linux/i.test(userAgent)) return "linux"
  return "unknown"
}
