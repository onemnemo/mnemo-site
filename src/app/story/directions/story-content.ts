import terminal from "@public/story/01-cli.webp"
import early from "@public/story/03.webp"
import editor from "@public/story/11.webp"
import current from "@public/screenshots/notes.png"

export const editions = [
  {
    name: "The first quiz",
    period: "AGE 14",
    title: "A small program. A useful question.",
    description: "The first published version took a piece of text, extracted questions, and presented them as a quiz in the terminal. It was a simple attempt to make studying more active.",
    image: terminal,
    alt: "The first terminal program presenting a question and checking an answer",
  },
  {
    name: "The early apps",
    period: "EARLY BUILDS",
    title: "An idea became an application.",
    description: "A quiz grew into a study app. New interfaces, architectures, and features followed. Each version exposed something that could work better, and became the starting point for another attempt.",
    image: early,
    alt: "An early study app with a flashcard dashboard and study goals",
  },
  {
    name: "The workspace",
    period: "LATER BUILDS",
    title: "More room for the subject.",
    description: "Later versions brought notes and study tools into a more focused workspace. The project kept changing as its developer learned more about both programming and studying.",
    image: editor,
    alt: "A later Mnemo notes editor with a note tree and a dedicated writing area",
  },
  {
    name: "Mnemo today",
    period: "THE BETA",
    title: "Ready for more perspectives.",
    description: "Mnemo now brings notes, flashcards, and mind maps together. The beta is an invitation to use it in real study sessions, report what gets in the way, and help decide what comes next.",
    image: current,
    alt: "Mnemo showing saved chemistry notes, subject folders, and an equilibrium graph",
  },
] as const

export const directions = [
  { id: "editorial", name: "01 Editorial", note: "Bold type, warm pink, and real pieces of the project. A story with some presence." },
  { id: "journal", name: "02 Journal", note: "Paper, serif typography, and quieter pacing. A personal story with an editorial finish." },
  { id: "archive", name: "03 Archive", note: "Dark surfaces, precise labels, and a larger product canvas. The work takes the foreground." },
] as const
