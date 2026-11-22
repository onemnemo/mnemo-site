import type { ReactNode } from 'react'
import type { LongExposureName, SilkName } from '../lib/webgl/palettes'
import { GITHUB_URL } from '../lib/site'

export const STATEMENT_LINES = [
  "Your notes don't belong on a billionaire's server.",
  "You shouldn't need Wi-Fi to revise on the bus, or wonder if an app is training AI on your homework.",
  'We got tired of watching good tools get ruined, so we spent five years building our own.',
  "And now we're building it with you.",
]

export interface ToolTab {
  title: string
  body: string
  field: LongExposureName
  /** Screenshot names in /shots-v2, without extension. */
  light: string
  dark: string
  alt: string
}

/** Each tab is on screen for this long before the next one takes over. */
export const TOOL_TAB_MS = 7000

export const TOOL_TABS: ToolTab[] = [
  {
    title: 'Notes',
    body: 'Mix text, equations, code, tables and diagrams on one clean page, and link related ideas straight together.',
    field: 'slate',
    light: 'note-light',
    dark: 'note',
    alt: 'A Biology 101 note on cellular respiration with a table, two columns and a diagram.',
  },
  {
    title: 'Mind maps',
    body: 'See the big picture at a glance. Lay out a topic visually, link ideas across branches and export anytime.',
    field: 'rose',
    light: 'mindmap-light',
    dark: 'mindmap',
    alt: 'A mind map titled How memory works.',
  },
  {
    title: 'Flashcards',
    body: 'Anki-grade spaced repetition that works out of the box. No pile of extensions, and still instant with tens of thousands of cards.',
    field: 'ember',
    light: 'decks-light',
    dark: 'decks',
    alt: 'The deck list with folders and the number of cards due today.',
  },
  {
    title: 'Search',
    body: 'Find any note, card or map as you type, across your whole library.',
    field: 'lilac',
    light: 'search-light',
    dark: 'search-dark',
    alt: 'Search across notes, decks and maps.',
  },
  {
    title: 'Home',
    body: 'Build your own homepage with widgets for recent notes, streaks and due cards. You are in charge!',
    field: 'amber',
    light: 'home-light',
    dark: 'home',
    alt: "The Home page with today's cards, streak, retention and forecast.",
  },
]

export const NOTE_POINTS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />,
    title: 'Fast from the first keystroke',
    body: "No sluggish web wrappers, no formatting jumping around, and full keyboard control when you're moving quick.",
  },
  {
    icon: <path d="M17 5H7l5 7-5 7h10" />,
    title: 'Ready for whatever the world throws at you',
    body: "Drop in math, side-by-side tables, diagrams and tags cleanly, whether it's organic chemistry, an essay or your grocery list.",
  },
  {
    icon: (
      <>
        <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
        <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
      </>
    ),
    title: 'Connected across your whole course',
    body: 'Link concepts between notes, organize by subject, and keep every lecture right beside its decks and mind maps without switching apps.',
  },
]

export const SCIENCE_CARDS: { field: SilkName; seed: number; title: string; body: string }[] = [
  {
    field: 'sea',
    seed: 61,
    title: 'The forgetting curve',
    body: 'Memories fade fast. A review at the right moment resets the clock.',
  },
  {
    field: 'sunset',
    seed: 62,
    title: 'Spacing',
    body: 'Short sessions spread over days beat one long night before the exam.',
  },
  {
    field: 'meadow',
    seed: 63,
    title: 'Retrieval',
    body: 'Pulling an answer from memory makes it stronger than reading it again.',
  },
  {
    field: 'rose',
    seed: 64,
    title: 'Connections',
    body: "Linked ideas are easier to recall. That's what mind maps do.",
  },
  {
    field: 'sky',
    seed: 65,
    title: 'Mixed practice',
    body: 'Switching between topics teaches you to tell them apart.',
  },
]

export const WORD_BAND: { field: SilkName; seed: number; word: string }[] = [
  { field: 'sunset', seed: 51, word: 'Remember more' },
  { field: 'sky', seed: 52, word: 'Forget less' },
  { field: 'meadow', seed: 53, word: 'Study calmer' },
]

export const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "What's the catch? How do you stay free?",
    a: "The whole desktop app is free and open source, for good. Later updates add optional cloud sync, with a free starter tier and cheap paid upgrades if you want the convenience. If you'd rather not pay a cent, you can host your own sync server with our step by step guides.",
  },
  {
    q: 'Which devices does Mnemo run on?',
    a: "Windows, macOS and Linux. Android tablets are next and getting close, with phones planned after that. We're a small team, so mobile takes a little longer, but it's actively in the works.",
  },
  {
    q: 'Can I import from Anki, Markdown or Notion?',
    a: 'Yes. Mnemo has a built in importer for Anki decks and Markdown, from a single note to a whole folder. Notion exports are trickier, so we made a small separate converter that brings them over with your formatting intact.',
  },
  {
    q: 'Will you force AI or paywalls into the app?',
    a: "Never. No ads, no paywalls on the app or its tools, and no AI sidebar pushed in your face. If AI or MCP integrations ever arrive, they'll come as optional extensions and stay fully opt in, so the core app stays lean. Once extensions launch, take care with unofficial ones from outside sources.",
  },
  {
    q: 'Who is behind Mnemo, and how can I help?',
    a: (
      <>
        We're a small team of students who have spent the past five years building Mnemo. To help,
        read the code, report bugs or translate the app <a href={GITHUB_URL}>on GitHub</a>.
      </>
    ),
  },
]
