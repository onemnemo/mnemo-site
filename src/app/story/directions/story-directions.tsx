import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { ProductImage } from "@/components/landing/product-image"
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
        <h1 id="story-heading">It was terrible.<br /><span>So I made another one.</span></h1>
        <div className={styles.heroIntro}>
          <p>If Mnemo looks like a study app that appeared a few weeks ago, I have some deeply embarrassing screenshots to show you.</p>
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
        <p>These are just the ones I could still find. Most of the really old ones are probably lost somewhere.</p>
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
              <h2 id="beginning-heading">I wanted to<br />study medicine.</h2>
              <p className={styles.originAside}>Somewhere along the way,<br />I acquired a software project.</p>
            </div>
            <div className={styles.prose}>
              <p>I’m nineteen. I’ve wanted to study medicine since I was about ten, and I’ve been messing with programming and electronics since I was twelve.</p>
              <p>At school, I became the person quizzing classmates before tests. I liked helping someone get unstuck. I was much worse at being relaxed about my own grades.</p>
              <p>I tried more study tools than was reasonable. There was always something I wanted to change, so I started making my own.</p>
              <p>This seemed like a reasonably small project at the time.</p>
            </div>
          </div>
        </section>
        <StoryEditions />
        <ScreenshotArchive />
        <section aria-labelledby="today-heading">
          <div className={styles.todayIntro}>
            <h2 id="today-heading">The version I use now.</h2>
            <div className={styles.prose}>
              <p>I use Mnemo for my own studying now. My chemistry notes used to live in Notion. Now they’re here.</p>
            </div>
          </div>
          <Screenshot screen={currentScreen} className={styles.todayScreen} />
          <div className={`${styles.prose} ${styles.presentDay}`}>
            <p>Somewhere along the way, Mnemo also became open source. It’s free, the code is public, and your notes live on your computer.</p>
            <p>People I’ve never met now use it, file bugs, suggest features and occasionally send code. That’s still slightly strange considering this started as a terminal quiz I made at fourteen.</p>
          </div>
        </section>
        <section className={styles.nextChapter} aria-labelledby="next-heading">
          <div className={styles.nextGrid}>
            <h2 id="next-heading">Mnemo isn’t finished.</h2>
            <div className={styles.prose}>
              <p>If something annoys you, tell us. If you know how to fix it, even better.</p>
              <p>Design, documentation, testing and translations need work too.</p>
            </div>
          </div>
          <div className={styles.joinLinks}>
            <Link href="/download">Try Mnemo <ArrowDown size={26} aria-hidden /></Link>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">Help shape the project <ArrowUpRight size={26} aria-hidden /></a>
          </div>
        </section>
      </div>
      <div className={styles.closing}>
        <Link href="/download" className={styles.wordmark} aria-label="Download Mnemo">mnemo</Link>
        <p>Bring something<br />you want to learn.</p>
        <Link href="/download" className={styles.closingArrow} aria-label="Try Mnemo"><ArrowUpRight size={30} aria-hidden /></Link>
      </div>
    </main>
  )
}
