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
          <h2 id="notes-title">Long notes.<br />Room to think.</h2>
          <div>
            <p>
              A quick thought or an entire chemistry curriculum. Write with
              headings, images, equations, and the space to put it all together.
              Your subjects stay within reach in the sidebar.
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
            Make cards from what you’re learning, then practise recalling it.
            Mnemo schedules your next review with FSRS, bringing difficult cards
            back sooner and giving familiar ones more time.
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
              Give an idea a branch. Follow it into the details, then zoom out
              and see how they fit. Build mind maps alongside the notes and
              flashcards you already study with.
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
