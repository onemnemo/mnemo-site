import type { SearchEntry } from '../../content/docs/types'

let index: Promise<SearchEntry[]> | undefined

/** The search index loads the first time search opens. */
export const loadSearchIndex = () =>
  (index ??= fetch('/docs/search.json')
    .then((r) =>
      r.ok ? (r.json() as Promise<SearchEntry[]>) : Promise.reject(new Error(String(r.status))),
    )
    .catch((e: unknown) => {
      index = undefined
      throw e
    }))

export const terms = (q: string) => q.toLowerCase().split(/\s+/).filter(Boolean)

export function search(entries: SearchEntry[], ts: string[]): SearchEntry[] {
  if (!ts.length) return entries.filter((e) => !e.h)
  return entries
    .map((e) => {
      const h = e.h.toLowerCase()
      const p = e.p.toLowerCase()
      const x = e.x.toLowerCase()
      let score = 0
      for (const t of ts) {
        if (h.includes(t)) score += h.startsWith(t) ? 8 : 6
        else if (p.includes(t)) score += 4
        else if (x.includes(t)) score += 1
        else return null
      }
      return { e, score }
    })
    .filter((r): r is { e: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((r) => r.e)
}

export function snippet(x: string, ts: string[]) {
  const low = x.toLowerCase()
  let at = -1
  for (const t of ts) {
    const i = low.indexOf(t)
    if (i >= 0 && (at < 0 || i < at)) at = i
  }
  if (at < 0) return x.slice(0, 150)
  const start = at > 50 ? x.lastIndexOf(' ', at - 40) + 1 : 0
  return (start ? '…' : '') + x.slice(start, start + 170)
}

/** Splits text into plain and matched parts, for <mark> highlighting. */
export function highlight(text: string, ts: string[]): { text: string; hit: boolean }[] {
  if (!ts.length) return [{ text, hit: false }]
  const re = new RegExp(
    `(${ts.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  )
  return text
    .split(re)
    .filter(Boolean)
    .map((part) => ({ text: part, hit: ts.some((t) => part.toLowerCase() === t) }))
}
