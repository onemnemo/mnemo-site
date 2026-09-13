import { ArrowDown } from "lucide-react"

import { DownloadLink } from "./download-link"
import { ToolCards } from "./tool-cards"
import styles from "./hero.module.css"

export function LandingHero() {
  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.intro}>
        <h1 id="landing-title">A home for<br />what you’re<br />learning.</h1>
        <p>
          Write your notes, practise with flashcards, and connect ideas on a mind
          map. All in the same desktop app.
        </p>
        <div className={styles.actions}>
          <DownloadLink />
          <a href="#features" className={styles.explore}>
            Look around <ArrowDown aria-hidden size={15} />
          </a>
        </div>
      </div>
      <ToolCards />
    </section>
  )
}
