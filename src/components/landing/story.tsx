import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import soma from "@public/soma/dl-idle.png"
import sprout from "@public/illos/doodles/dark-16.png"
import flourish from "@public/illos/doodles/dark-24.png"
import { TornEdge } from "@/components/torn-edge"
import { DownloadLink } from "./download-link"
import styles from "./story.module.css"

export function LandingStory() {
  return (
    <>
      <section id="story" className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyLeft}>
          <h2 id="story-title">Built by learners,<br />for learners.</h2>
          <div className={styles.somaPortrait}>
            <Image src={soma} alt="Soma, Mnemo’s slightly serious study companion" sizes="220px" />
          </div>
        </div>
        <div className={styles.storyCopy}>
          <p>
            Mnemo is free and open source, and it&rsquo;s shaped by the people
            who use it.
          </p>
          <Link href="/story">
            How Mnemo got here <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      <section className={styles.download} aria-labelledby="download-title">
        <Image src={flourish} alt="" aria-hidden className={styles.flourish} />
        <Image src={sprout} alt="" aria-hidden className={styles.sprout} />
        <h2 id="download-title">Bring something<br />you want to learn.</h2>
        <p>Mnemo is in beta. Take it into your next study session<br className={styles.desktopBreak} /> and tell us what could be better.</p>
        <DownloadLink />
      </section>
      <TornEdge mascot className="bg-butter text-paper" />
    </>
  )
}
