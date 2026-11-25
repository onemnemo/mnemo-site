import type { FieldName } from '../../lib/webgl/palettes'

export interface Release {
  id: string
  version: string
  title: string
  body: string
  items: string[]
  field: FieldName
  seed: number
  /** The release being built now: pulsing dot and ticked items. */
  now?: boolean
}

export const RELEASES: Release[] = [
  {
    id: 'r09',
    version: '0.9',
    title: 'The Overhaul',
    body: 'A complete redesign of how Mnemo looks and feels. New navigation, and one set of tabs shared by your notes, flashcards and mind maps. It is almost ready to ship.',
    items: [
      'A redesigned interface, top to bottom',
      'New navigation',
      'Unified tabs for notes, flashcards and mind maps',
    ],
    field: 'silk-sunset',
    seed: 19,
    now: true,
  },
  {
    id: 'r010',
    version: '0.10',
    title: 'Performance',
    body: 'A release just for speed. We clear the optimization backlog so everything you already use feels lighter. It might ship as 0.9.5 instead.',
    items: [
      'Faster startup',
      'Smoother tab switching',
      'Large documents that stay quick',
      'Lower memory use',
    ],
    field: 'silk-sky',
    seed: 33,
  },
  {
    id: 'r011',
    version: '0.11',
    title: 'Expansion',
    body: 'Mnemo grows outward. Some of this may land across several releases, so treat the number as a rough guide.',
    items: [
      'Custom sync and extensions',
      'Databases in the style of Notion',
      'New editor blocks',
      'Layouts with three or four columns',
    ],
    field: 'silk-meadow',
    seed: 58,
  },
  {
    id: 'r1',
    version: '1.0',
    title: 'Stable',
    body: 'A mature Mnemo you can lean on every day. This is also where hosted sync may arrive as an optional paid service. The app itself stays free and open source.',
    items: ['A mature, stable app', 'Optional hosted sync'],
    field: 'silk-dawn',
    seed: 76,
  },
]
