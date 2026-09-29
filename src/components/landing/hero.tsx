import { ArrowDown } from "lucide-react"

import { releasesUrl, type ReleaseResult } from "@/lib/beta-release"
import { DownloadLink } from "./download-link"
import { ToolCards } from "./tool-cards"
import styles from "./hero.module.css"

export function LandingHero({ release }: { release: ReleaseResult }) {
  const current = release.status === "ready" ? release.release : null
  const version = current
    ? `${current.channel === "beta" ? "Beta" : "Version"} ${current.tag.replace(/^v/, "")}`
    : "Beta"

  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.intro}>
        <h1 id="landing-title">A home for<br />what you’re<br />learning.</h1>
        <p>
          Write your notes, practise with flashcards, and connect ideas on a mind
          map. All in the same desktop app. It’s free, open source, and keeps
          your work on your computer.
        </p>
        <div className={styles.actions}>
          <DownloadLink />
          <a href="#features" className={styles.explore}>
            Look around <ArrowDown aria-hidden size={15} />
          </a>
        </div>
        <p className={styles.release}>
          {version} for Windows, macOS, and Linux
          <span aria-hidden className={styles.separator}> · </span>
          <a href={current?.url ?? releasesUrl} target="_blank" rel="noreferrer">
            Release notes
          </a>
        </p>
      </div>
      <ToolCards />
    </section>
  )
}
