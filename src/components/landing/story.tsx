import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import soma from "@public/soma/dl-idle.png"
import sprout from "@public/illos/doodles/dark-16.png"
import flourish from "@public/illos/doodles/dark-24.png"
import { TornEdge } from "@/components/torn-edge"
import { siteConfig } from "@/config/site"
import { DownloadLink } from "./download-link"
import styles from "./story.module.css"

export function LandingStory() {
  return (
    <>
      <section id="story" className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyLeft}>
          <h2 id="story-title">It started with<br />my own notes.</h2>
          <div className={styles.somaPortrait}>
            <Image src={soma} alt="Soma, Mnemo’s slightly serious study companion" sizes="220px" />
          </div>
        </div>
        <div className={styles.storyCopy}>
          <p>
            I’ve wanted to study medicine since I was ten. Somewhere along the
            way, I became the person quizzing classmates before tests, and the
            person trying every study app I could find.
          </p>
          <p>
            I kept wanting the same thing: good notes, flashcards, and mind maps
            that belonged together. So I started making it. There were a lot of
            versions. Most weren’t very good. Each one taught me something.
          </p>
          <p>
            Today, I study with Mnemo myself. It’s still young, and I’d love
            for you to try it, question it, and help make it better.
          </p>
          <blockquote>This has been my weird little obsession for years.<br />It would be pretty cool if it became ours.</blockquote>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            Help shape Mnemo <ArrowUpRight size={18} aria-hidden />
          </a>
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
