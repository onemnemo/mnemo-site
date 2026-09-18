import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import notes from "@public/screenshots/notes.png"
import flashcards from "@public/screenshots/flashcards.png"
import mindmaps from "@public/screenshots/mindmaps.png"
import flourish from "@public/illos/doodles/dark-06.png"
import { ProductImage } from "./product-image"
import styles from "./product-tour.module.css"

export function ProductTour() {
  return (
    <div id="features" className={styles.tour}>
      <section id="notes" className={styles.notes} aria-labelledby="notes-title">
        <div className={styles.sectionHeading}>
          <h2 id="notes-title">From a quick note to a whole subject.</h2>
          <div>
            <p>
              Start with one thought or build out a whole curriculum. Mnemo
              is block based, unlike Word or Google Docs. Each paragraph,
              heading, image, equation, or table is a piece you can move and
              rearrange. Most formatting happens as you type, so you are not
              always reaching for the toolbar. Familiar if you know Notion,
              easy if you do not. It stays responsive as your notes grow,
              even on your old laptop.
            </p>
            <Link href="/docs/users/modules/notes">Explore notes <ArrowUpRight aria-hidden size={17} /></Link>
          </div>
        </div>
        <div className={styles.notesStage}>
          <Image src={flourish} alt="" aria-hidden className={styles.flourish} />
          <ProductImage
            src={notes}
            alt="Mnemo notes: a chemistry curriculum with subject folders, headings, and an equilibrium graph"
            label="Enlarge the notes screenshot"
            priority
          />
        </div>
      </section>

      <section id="flashcards" className={styles.flashcards} aria-labelledby="flashcards-title">
        <div className={styles.flashcardCopy}>
          <h2 id="flashcards-title">You’ve read it.<br />Now remember it.</h2>
          <p>
            In 1885, Hermann Ebbinghaus showed how quickly new memories fade
            without another encounter. Retrieval practice and spaced
            repetition remain among the best ways we have to fight that. It
            is why flashcards became a staple for students, including
            medicine, where one{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10403443/"
              target="_blank"
              rel="noreferrer"
              className={styles.inlineLink}
            >
              US medical student survey
            </a>{" "}
            found 68% of students using Anki.
          </p>
          <p>
            Mnemo uses FSRS-6, the same modern scheduling algorithm as Anki.
            It learns from your reviews and works out when each card should
            return, so you spend more time on what you are starting to
            forget and less on what you already know.
          </p>
          <Link href="/docs/users/modules/flashcards">Explore flashcards <ArrowUpRight aria-hidden size={17} /></Link>
          <Link href="/science" className={styles.scienceLink}>The science behind the practice</Link>
        </div>
        <div className={styles.flashcardStage}>
          <ProductImage
            src={flashcards}
            alt="A Mnemo review session with a medicine flashcard, its illustrated answer, and the Again, Hard, Good, and Easy controls"
            label="Enlarge the flashcards screenshot"
          />
        </div>
      </section>

      <section id="mindmaps" className={styles.mindmaps} aria-labelledby="mindmaps-title">
        <div className={styles.sectionHeading}>
          <h2 id="mindmaps-title">There’s a connection<br />in there somewhere.</h2>
          <div>
            <p>
              Give an idea a branch. Follow it into the details, then zoom
              out and see how they fit together. New facts stick better when
              they’re linked to something, not memorized on their own. Build
              mind maps alongside the notes and flashcards you already study
              with.
            </p>
            <Link href="/docs/users/modules/mindmaps">Explore mind maps <ArrowUpRight aria-hidden size={17} /></Link>
          </div>
        </div>
        <div className={styles.mindmapStage}>
          <ProductImage
            src={mindmaps}
            alt="Mnemo mind maps: branches connect glycolysis, the Krebs cycle, and electron transport to cell respiration"
            label="Enlarge the mind maps screenshot"
          />
        </div>
      </section>
    </div>
  )
}
