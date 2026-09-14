import terminal from "@public/story/01-cli.webp"
import early from "@public/story/03.webp"
import editor from "@public/story/11.webp"
import current from "@public/screenshots/notes.png"

export const editions = [
  {
    name: "The first quiz",
    title: "A quiz in the terminal",
    description: "Published at fourteen, the first version took a piece of text, extracted questions, and presented them as a quiz in the terminal. It was basic, but it gave the project somewhere to start.",
    image: terminal,
    alt: "The first terminal program presenting a question and checking an answer",
  },
  {
    name: "The early apps",
    title: "Adding more study tools",
    description: "The quiz grew into an app with flashcards and study goals. There were several attempts with different interfaces and code. Each one fixed some problems and revealed others.",
    image: early,
    alt: "An early study app with a flashcard dashboard and study goals",
  },
  {
    name: "The workspace",
    title: "Bringing the tools together",
    description: "Later versions gave notes more space and brought the study tools into one workspace. Some ideas stayed, others were dropped, and the app was rebuilt again.",
    image: editor,
    alt: "A later Mnemo notes editor with a note tree and a dedicated writing area",
  },
  {
    name: "Mnemo today",
    title: "The current beta",
    description: "Mnemo now brings notes, flashcards, and mind maps together. There are still bugs and things to improve. The beta is a chance to try it in real study sessions and help work out what needs attention.",
    image: current,
    alt: "Mnemo showing saved chemistry notes, subject folders, and an equilibrium graph",
  },
] as const
