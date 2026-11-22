import { useEffect, useState } from 'react'
import { FALLBACK_VERSION, LATEST_RELEASE_API, LATEST_RELEASE_URL } from '../lib/site'

/**
 * The download buttons use GitHub's latest/download links, so they always fetch the newest
 * build. This only refreshes the version number and release notes link shown.
 */
export function useLatestRelease() {
  const [release, setRelease] = useState({
    version: FALLBACK_VERSION,
    notesUrl: LATEST_RELEASE_URL,
  })
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(LATEST_RELEASE_API, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ctrl.signal,
    })
      .then((r) =>
        r.ok ? (r.json() as Promise<{ tag_name?: string; html_url?: string }>) : Promise.reject(),
      )
      .then((rel) =>
        setRelease((prev) => ({
          version: rel.tag_name ? rel.tag_name.replace(/^v/i, '') : prev.version,
          notesUrl: rel.html_url ?? prev.notesUrl,
        })),
      )
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return release
}
