import terminal from "@public/story/01-cli.webp"
import quiz from "@public/story/02.webp"
import flashcards from "@public/story/03.webp"
import notes from "@public/story/04.webp"
import dark from "@public/story/05.webp"
import lesson from "@public/story/06.webp"
import dashboard from "@public/story/07.webp"
import gradient from "@public/story/08.webp"
import warm from "@public/story/09.webp"
import night from "@public/story/10.webp"
import editor from "@public/story/11.webp"
import today from "@public/screenshots/notes.png"

export const archive = [
  {
    id: "terminal", label: "The terminal", image: terminal, color: "lilac",
    title: "A terminal. An attitude problem.",
    copy: "At fourteen, I published a little program that turned notes into questions. In this screenshot, it picks ‘what’ as the answer, marks my attempt wrong, and tells me to study more. A bold position for software in its condition.",
    aside: "The actual closing feedback: ‘maybe study more lol’.",
    alt: "An early terminal quiz maker extracting a missing word from notes, marking an answer wrong, and ending with ‘maybe study more lol’",
  },
  {
    id: "quiz-maker", label: "Actual buttons", image: quiz, color: "yellow",
    title: "We have buttons. This is not a drill.",
    copy: "A box for notes, a handful of quiz settings, and an actual interface. The idea was still simple: put in what you’re learning and get something useful to practise with.",
    aside: "The Generate Quiz button is down there somewhere.",
    alt: "An early Study AI design with a large notes input and quiz customization controls",
  },
  {
    id: "flashcards", label: "Flashcards", image: flashcards, color: "peach",
    title: "A dashboard was clearly essential.",
    copy: "Decks, progress bars, study goals. I was getting better at arranging an interface. Also increasingly good at finding things to put in a sidebar.",
    aside: "Quizzes were ‘Comming soon’. So was the second spelling pass.",
    alt: "An early flashcard dashboard with a daily study goal, deck progress, and a ‘Quizzes (Comming soon)’ menu entry",
  },
  {
    id: "notes", label: "Notes move in", image: notes, color: "lilac",
    title: "The notes moved in.",
    copy: "This was the idea getting bigger: a place to write, alongside a place to practise. Here are two approaches to the note list and editor. The same problem, rearranged until it started making more sense.",
    aside: "Apparently one unresolved sidebar wasn’t enough.",
    alt: "Two early Mnemo notes layouts side by side, both showing a lesson on the respiratory system",
  },
  {
    id: "dark-mode", label: "Dark grey", image: dark, color: "peach",
    title: "Now available in dark grey.",
    copy: "Notes, flashcards, quizzes, mind maps, learning paths. I wanted the tools to belong together. The menu was doing a very thorough job of documenting that ambition.",
    aside: "‘Good morning!’ And then quite a lot of space to think about it.",
    alt: "A dark Mnemo dashboard with an extensive sidebar, a Good morning heading, and a mostly empty workspace",
  },
  {
    id: "lessons", label: "Room for a lesson", image: lesson, color: "yellow",
    title: "The subject got some space.",
    copy: "A lesson with headings, a diagram, and different ways to practise. Less attention on the dashboard. More on the thing someone had actually come here to learn.",
    aside: "The respiratory system was getting a lot of screen time.",
    alt: "A Mnemo learning path showing a respiratory system lesson, an anatomical diagram, and practice tabs",
  },
  {
    id: "dashboard", label: "More dashboard", image: dashboard, color: "lilac",
    title: "The dashboard found its furniture.",
    copy: "Streaks, statistics, recent work. A lot more going on. I was working out what should greet you when you opened a study app, and how much of it actually helped.",
    aside: "There was no longer a shortage of things to look at.",
    alt: "A later dark dashboard with statistics cards and a table of recent notes, decks, quizzes, and mind maps",
  },
  {
    id: "gradient", label: "The gradient phase", image: gradient, color: "yellow",
    title: "There was a gradient phase.",
    copy: "I will not be taking questions about the logo. There is a useful idea in here, though: getting back to your notes and flashcards without hunting for them.",
    aside: "The logo has since had time to reflect.",
    alt: "An older Mnemo design with a blue gradient wordmark, statistics widgets, and columns of learning content",
  },
  {
    id: "warm", label: "Warmer, quieter", image: warm, color: "peach",
    title: "Something familiar starts to appear.",
    copy: "Warmer colors. A quieter sidebar. A clearer place for the content. You can see the app beginning to look like the Mnemo I wanted to use.",
    aside: "Orange made itself at home.",
    alt: "A warm light Mnemo design displaying a Pythagorean theorem lesson with an orange logo and a table of contents",
  },
  {
    id: "night", label: "Lights off", image: night, color: "lilac",
    title: "Same idea. Lights off.",
    copy: "The same lesson in a dark interface. The structure was starting to settle, which left more room to care about the smaller things: contrast, spacing, and what deserved your attention.",
    aside: "Still a considerable number of things in that sidebar.",
    alt: "A dark version of the Pythagorean theorem lesson with a warm orange accent and grouped sidebar navigation",
  },
  {
    id: "editor", label: "Room to read", image: editor, color: "peach",
    title: "The notes get the room.",
    copy: "A narrower app rail. A dedicated note tree. Much more room for writing. The changes were becoming less about adding another panel and more about making the ones already there earn their space.",
    aside: "The note called ‘Issues & Annoyance’ feels appropriate.",
    alt: "A more recent Mnemo notes editor showing Parkinson’s disease notes, a narrow app rail, and a dedicated note tree",
  },
  {
    id: "today", label: "Mnemo today", image: today, color: "yellow",
    title: "Still here. Still working on it.",
    copy: "This is the Mnemo I study with now. It still has things to fix. But every attempt left me with a better idea of what I wanted to build, and how to keep improving it.",
    aside: "Same enormous chemistry notes. A much better home for them.",
    alt: "Mnemo today, showing the chemistry notes editor with subject folders, formatting tools, and an equilibrium graph",
  },
] as const
