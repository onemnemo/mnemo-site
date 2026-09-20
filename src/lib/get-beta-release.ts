import { selectBetaRelease, type ReleaseResult } from "@/lib/beta-release"

export async function getBetaRelease(): Promise<ReleaseResult> {
  try {
    const releases: unknown[] = []
    const signal = AbortSignal.timeout(8000)
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(`https://api.github.com/repos/onemnemo/mnemo/releases?per_page=100&page=${page}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
        signal,
      })
      if (!response.ok) throw new Error(`Release lookup returned ${response.status}`)
      const data: unknown = await response.json()
      if (!Array.isArray(data)) throw new Error("Invalid release list")
      releases.push(...data)
      if (data.length < 100) {
        const release = selectBetaRelease(releases)
        return release ? { status: "ready", release } : { status: "pending" }
      }
    }
    return { status: "unavailable" }
  } catch {
    return { status: "unavailable" }
  }
}
