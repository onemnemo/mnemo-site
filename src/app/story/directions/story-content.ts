import type { StaticImageData } from "next/image"
import terminal from "@public/story/01-cli.webp"
import quiz from "@public/story/02.webp"
import early from "@public/story/03.webp"
import notes from "@public/story/04.webp"
import dark from "@public/story/05.webp"
import lesson from "@public/story/06.webp"
import dashboard from "@public/story/07.webp"
import gradient from "@public/story/08.webp"
import warm from "@public/story/09.webp"
import night from "@public/story/10.webp"
import editor from "@public/story/11.webp"
import current from "@public/screenshots/notes.png"

export type StoryScreen = {
  id: string
  image: StaticImageData
  alt: string
  label: string
}

export const editions = [
  {
    id: "terminal",
    title: "The first one actually shipped.",
    copy: [
      "I was fourteen. I published a terminal program that turned notes into a quiz.",
      "In this screenshot, it decides the missing word is ‘what’, marks my answer wrong, and ends with ‘maybe study more lol’. The product voice was finished before the product.",
    ],
    image: terminal,
    alt: "The terminal quiz choosing what as the missing word, marking powerhouse wrong, and ending with maybe study more lol",
    label: "terminal quiz",
  },
  {
    id: "sidebars",
    title: "Then I discovered sidebars.",
    copy: [
      "The quiz became flashcards. Then I added study goals, notes, and dashboards. I kept adding things I’d wanted in the apps I was using.",
      "The quizzes were still listed as ‘Comming soon’. Somewhere in all of this, it became Mnemo.",
    ],
    image: early,
    alt: "An early flashcard dashboard with study goals and a sidebar entry reading Quizzes (Comming soon)",
    label: "early flashcard dashboard",
  },
  {
    id: "restarts",
    title: "I kept restarting.",
    copy: [
      "I’d redesign it, rewrite it, get annoyed with it, and start again. Some versions barely got past the interface. Others got much further before I abandoned them.",
      "This was one of the later notes editors. I was still rebuilding it.",
    ],
    image: editor,
    alt: "A later Mnemo editor showing notes on Parkinson’s disease, with Issues & Annoyance in the favourites list",
    label: "later notes editor",
  },
] as const

export const archiveScreens: readonly StoryScreen[] = [
  { id: "quiz", image: quiz, alt: "Study AI quiz maker with question type switches and a large empty text box", label: "quiz maker" },
  { id: "notes", image: notes, alt: "Two early Mnemo notes layouts side by side, both showing a respiratory system lesson", label: "early notes layouts" },
  { id: "dark", image: dark, alt: "A dark Mnemo dashboard with a long sidebar and an almost empty main area", label: "empty dark dashboard" },
  { id: "lesson", image: lesson, alt: "A respiratory system lesson with Theory, Quiz, Flashcards and Adaptive tabs", label: "respiratory lesson" },
  { id: "dashboard", image: dashboard, alt: "A dark dashboard with study statistics, recent work, games and extensions", label: "statistics dashboard" },
  { id: "gradient", image: gradient, alt: "A dashboard with a blue Mnemo wordmark and repeated Biology entries", label: "gradient dashboard" },
  { id: "warm", image: warm, alt: "A light Mnemo design showing a lesson on the Pythagorean theorem", label: "light lesson design" },
  { id: "night", image: night, alt: "The same Pythagorean theorem lesson in a dark Mnemo design", label: "dark lesson design" },
]

export const currentScreen: StoryScreen = {
  id: "today",
  image: current,
  alt: "Current Mnemo showing chemistry notes, subject folders and an equilibrium graph",
  label: "current Mnemo notes editor",
}
