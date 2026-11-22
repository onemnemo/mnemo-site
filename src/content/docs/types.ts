import type { IconName } from '../../components/Icon'
import type { FieldName } from '../../lib/webgl/palettes'

export type DocGroup = 'users' | 'developers'

export interface DocNavEntry {
  href: string
  title: string
  sections: { id: string; title: string }[]
}

export interface DocGroupNav {
  /** Accessible name of the sidebar, e.g. "User guide". */
  label: string
  /** Pages in order; `{ sep: true }` draws a divider. */
  entries: (DocNavEntry | { sep: true })[]
  /** Link to the other half of the docs. */
  other: { href: string; title: string }
}

export interface DocPageMeta {
  group: DocGroup
  slug: string
  title: string
  docTitle: string
  description: string
  sub: string
  field: FieldName
  seed: number
  icon: IconName
  help: string
  prev: { href: string; title: string } | null
  next: { href: string; title: string } | null
}

export interface SearchEntry {
  /** Page title. */
  p: string
  /** Guide name. */
  g: string
  /** Section heading, empty for the page itself. */
  h: string
  u: string
  x: string
}
