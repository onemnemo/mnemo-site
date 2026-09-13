import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Heart } from "lucide-react"

import notes from "@public/screenshots/notes.png"
import restingSoma from "@public/illos/science/soma-resting.webp"
import { DownloadLink } from "@/components/landing/download-link"
import { ProductImage } from "@/components/landing/product-image"
import { GradToss } from "@/components/science/grad-toss"
import { Octopus } from "@/components/science/octopus"
import { QuizCard } from "@/components/science/quiz-card"
import { MemoryChart } from "@/components/science/memory-chart"
import { HeartMap } from "@/components/science/heart-map"
import { TornEdge } from "@/components/torn-edge"
import styles from "./science.module.css"

export const metadata: Metadata = {
  title: "The science of remembering",
  description:
    "Try recalling a fact, watch what spaced reviews change, and see how notes and flashcards in Mnemo put learning research into practice.",
  alternates: { canonical: "/science" },
}

const research = [
  { topic: "Recalling", authors: "Roediger & Karpicke, 2006", title: "Test-enhanced learning", href: "https://doi.org/10.1111/j.1467-9280.2006.01693.x" },
  { topic: "Spacing", authors: "Cepeda et al., 2006", title: "Distributed practice in verbal recall tasks", href: "https://pubmed.ncbi.nlm.nih.gov/16719566/" },
  { topic: "Forgetting", authors: "Murre & Dros, 2015", title: "Replication and analysis of Ebbinghaus’ forgetting curve", href: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644" },
  { topic: "Understanding", authors: "Dunlosky et al., 2013", title: "Improving students’ learning with effective learning techniques", href: "https://doi.org/10.1177/1529100612453266" },
  { topic: "Sleep", authors: "Rasch & Born, 2013", title: "About sleep’s role in memory", href: "https://pubmed.ncbi.nlm.nih.gov/23589831/" },
  { topic: "And the octopus", authors: "Natural History Museum", title: "Eight ways octopuses keep surprising us", href: "https://www.nhm.ac.uk/discover/octopuses-keep-surprising-us-here-are-eight-examples-how.html" },
]

export default function SciencePage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="science-title">
          <div className={styles.heroCopy}>
            <h1 id="science-title">Learning takes<br />more than<br />reading.</h1>
            <p>You can know a page almost by heart and still draw a blank when you need it. What you do after reading makes a difference.</p>
            <a className={styles.textLink} href="#recall">Try a little experiment <ArrowDown size={18} aria-hidden /></a>
          </div>
          <div className={styles.fact}>
            <p className={styles.factTitle}>An octopus has<br /><span>three hearts.</span></p>
            <div className={styles.hearts} aria-hidden><Heart /><Heart /><Heart /></div>
            <p className={styles.factAside}>Keep that in mind.<br />We’ll come back to it.</p>
            <Octopus className={styles.octopus} />
            <svg className={styles.water} viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden>
              <path d="M0 50 Q90 25 190 62 T400 60 T600 40 V130 H0Z" fill="currentColor" opacity=".35" />
              <path d="M0 75 Q100 100 240 75 T450 72 T600 92 V130 H0Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        <section id="recall" className={styles.recall} aria-labelledby="recall-title">
          <div className={styles.copy}>
            <h2 id="recall-title">Close the notes.<br />Find the answer.</h2>
            <p>Rereading can make an answer feel familiar. Trying to recall it asks something different of you: can you bring it back without looking?</p>
            <p>Research finds that practising retrieval can help you remember more later than spending the same time rereading. Check the answer afterwards, especially when you’re unsure.</p>
            <Link className={styles.textLink} href="/#flashcards">This is what flashcards are for <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
          <div className={styles.recallStage}><QuizCard /></div>
        </section>

        <section id="spacing" className={styles.spacing} aria-labelledby="spacing-title">
          <div className={styles.sectionHeading}>
            <h2 id="spacing-title">Give it some time.<br />Then come back.</h2>
            <div className={styles.copy}>
              <p>New information tends to get harder to recall with time. Spreading your practice across several sessions helps it last longer than doing all your practice at once.</p>
              <p>You don’t need to work out every interval yourself. Mnemo uses FSRS to schedule your flashcards around how well you remember them.</p>
              <Link className={styles.textLink} href="/docs/users/modules/flashcards/how-scheduling-works">How Mnemo schedules reviews <ArrowUpRight size={17} aria-hidden /></Link>
            </div>
          </div>
          <MemoryChart />
        </section>

        <section className={styles.connections} aria-labelledby="connections-title">
          <div className={styles.copy}>
            <h2 id="connections-title">A fact is better<br />with a little context.</h2>
            <p>Three is a number to remember. Two hearts sending blood past the gills, and one sending it around the body, is an explanation you can work with.</p>
            <p>Ask why. Compare it with something you know. Explain it in your own words. The useful part of a mind map is thinking through the relationships you draw.</p>
            <Link className={styles.textLink} href="/#mindmaps">Make room for those connections <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
          <HeartMap />
        </section>

        <section className={styles.practice} aria-labelledby="practice-title">
          <div className={styles.practiceCopy}>
            <h2 id="practice-title">Back in<br /> your notes.</h2>
            <p>A question you couldn’t answer is a useful place to start. Go back, fill in the gap, and write an explanation that makes sense to you.</p>
            <p>Mnemo gives your notes, flashcards, and mind maps a home together, so each can be part of the same study session.</p>
            <Link className={styles.textLink} href="/#notes">Take a look inside Mnemo <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
          <div className={styles.notesImage}>
            <ProductImage src={notes} alt="Mnemo’s notes editor, showing a chemistry curriculum with an equilibrium graph and subject folders in the sidebar" label="Enlarge Mnemo’s notes editor" />
          </div>
        </section>

        <section className={styles.sleep} aria-labelledby="sleep-title">
          <div className={styles.copy}>
            <h2 id="sleep-title">Enough for today.</h2>
            <p>Learning carries on after you close the laptop. During sleep, your brain helps stabilise and integrate what you’ve learned.</p>
            <p>Leave some room for that part, too.</p>
          </div>
          <Image src={restingSoma} alt="Soma asleep on a closed notebook" sizes="(max-width: 650px) 90vw, 550px" className={styles.sleepArt} />
        </section>

        <section className={styles.research} aria-labelledby="research-title">
          <div>
            <h2 id="research-title">A little further reading.</h2>
            <p>The research that informs how we think about studying in Mnemo, if you’d like to go a little deeper.</p>
          </div>
          <details>
            <summary>The studies behind this page <span aria-hidden>+</span></summary>
            <ul>
              {research.map((item) => (
                <li key={item.topic}>
                  <span>{item.topic}</span>
                  <a href={item.href} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={16} aria-hidden /><small>{item.authors}</small></a>
                </li>
              ))}
            </ul>
          </details>
        </section>
      </div>

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={styles.closingInner}>
          <div>
            <h2 id="closing-title">On to the next<br />thing you’ll learn.</h2>
            <p>A subject you love. An exam coming up.<br />There’s room for it in Mnemo.</p>
            <div className={styles.closingActions}><DownloadLink /><Link href="/#features" className={styles.textLink}>Explore the app <ArrowUpRight size={17} aria-hidden /></Link></div>
          </div>
          <GradToss className={styles.graduate} />
        </div>
      </section>
      <TornEdge mascot className="bg-butter text-paper" />
    </main>
  )
}
