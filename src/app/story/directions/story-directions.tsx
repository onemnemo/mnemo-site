import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { ProductImage } from "@/components/landing/product-image"
import { TornEdge } from "@/components/torn-edge"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { archiveScreens, currentScreen, editions, type StoryScreen } from "./story-content"
import styles from "./directions.module.css"

function Screenshot({ screen, className = "" }: { screen: StoryScreen; className?: string }) {
  return (
    <div className={`${styles.screenshot} ${className}`}>
      <ProductImage src={screen.image} alt={screen.alt} label={`Enlarge ${screen.label}`} />
    </div>
  )
}

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="story-heading">
      <div className={styles.heroCopy}>
        <h1 id="story-heading">It didn’t start<br /><span>like this.</span></h1>
        <div className={styles.heroIntro}>
          <p>Mnemo has been through a lot of versions. These are some of them.</p>
          <a href="#beginning" className={styles.readLink}>How it started <ArrowDown size={18} aria-hidden /></a>
        </div>
      </div>
      <div className={styles.heroArtifacts} aria-hidden="true">
        <Image className={styles.terminalPrint} src={editions[0].image} alt="" sizes="(max-width: 800px) 60vw, 360px" />
        <Image className={styles.earlyPrint} src={editions[1].image} alt="" sizes="(max-width: 800px) 65vw, 420px" />
        <Image className={styles.laterPrint} src={editions[2].image} alt="" sizes="(max-width: 800px) 75vw, 500px" preload />
      </div>
    </section>
  )
}

function StoryEditions() {
  return (
    <div className={styles.chronology} id="editions">
      {editions.map((edition) => (
        <section className={styles.edition} key={edition.id} aria-labelledby={`${edition.id}-heading`}>
          <div className={styles.editionCopy}>
            <h2 id={`${edition.id}-heading`}>{edition.title}</h2>
            <div className={styles.prose}>
              {edition.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <Screenshot screen={edition} />
        </section>
      ))}
    </div>
  )
}

function ScreenshotArchive() {
  return (
    <section className={styles.archive} aria-labelledby="archive-heading">
      <div className={styles.archiveIntro}>
        <h2 id="archive-heading">And yeah, there were more.</h2>
        <p>A few more designs from our past.</p>
      </div>
      <div className={styles.archiveGrid}>
        {archiveScreens.map((screen) => <Screenshot screen={screen} key={screen.id} />)}
      </div>
    </section>
  )
}

export function StoryDirections() {
  return (
    <main id="main-content" className={styles.page}>
      <Hero />
      <div className={styles.body}>
        <section className={styles.origin} id="beginning" aria-labelledby="beginning-heading">
          <div className={styles.originGrid}>
            <div>
              <h2 id="beginning-heading">It started<br />as a quiz.</h2>
            </div>
            <div className={styles.prose}>
              <p>Mnemo began in 2021 as a terminal program that turned notes into a quiz. It was made by a curious 14-year-old who didn’t know how big this was going to get.</p>
            </div>
          </div>
        </section>
        <StoryEditions />
        <ScreenshotArchive />
        <section aria-labelledby="today-heading">
          <div className={styles.todayIntro}>
            <h2 id="today-heading">Mnemo today.</h2>
            <div className={styles.prose}>
              <p>Mnemo is free and open source. The code is public, and people use it, report bugs, suggest features and send code.</p>
            </div>
          </div>
          <Screenshot screen={currentScreen} className={styles.todayScreen} />
        </section>
      </div>
      <section className={styles.nextChapter} aria-labelledby="next-heading">
          <div className={styles.nextGrid}>
            <h2 id="next-heading">Mnemo isn’t finished.</h2>
            <div className={styles.prose}>
              <p>If something annoys you, tell us. If you know how to fix it, even better.</p>
              <p>Design, documentation, testing and translations need work too.</p>
              <div className={styles.joinLinks}>
                <Button asChild size="lg" className={`mnemo-download ${styles.tryLink}`}>
                  <Link href="/download">Try Mnemo <ArrowDown size={16} aria-hidden /></Link>
                </Button>
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">Help shape the project <ArrowUpRight size={16} aria-hidden /></a>
              </div>
            </div>
          </div>
      </section>
      <TornEdge mascot className="bg-butter text-paper" />
    </main>
  )
}
