"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import { directions, editions } from "./story-content"
import styles from "./directions.module.css"

type Direction = (typeof directions)[number]["id"]

function Hero({ direction }: { direction: Direction }) {
  return (
    <section className={styles.hero} aria-labelledby="story-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroHeading}>
          <p className={styles.eyebrow}><span className={styles.dot} /> OUR STORY <span className={styles.heroIssue}>A PROJECT IN PROGRESS</span></p>
          <h1 id="story-heading">
            {direction === "editorial" && <>Learning comes first.<br /><span>The tools should follow.</span></>}
            {direction === "journal" && <>A study tool.<br />A long time<br /><em>in the making.</em></>}
            {direction === "archive" && <>Built. Rebuilt.<br /><span>Still learning.</span></>}
          </h1>
          <div className={styles.heroIntro}>
            <p>Mnemo began with one student looking for better ways to learn. Years of building and rebuilding later, it’s becoming a project other learners can help shape.</p>
            <a href="#beginning" className={styles.readLink}>Start at the beginning <ArrowDown size={18} aria-hidden /></a>
          </div>
        </div>
        <div className={styles.heroArtifacts}>
          <figure className={styles.terminalPrint}>
            <div className={styles.printTop}><span>01 / THE FIRST QUIZ</span><MoveUpRight size={16} aria-hidden /></div>
            <Image src={editions[0].image} alt={editions[0].alt} sizes="(max-width: 700px) 40vw, 320px" />
            <figcaption>A terminal. An idea. Age fourteen.</figcaption>
          </figure>
          <div className={styles.paperNote} aria-hidden="true">
            <span>THE QUESTION THAT STAYED</span>
            <p>Could studying<br />work better?</p>
            <svg viewBox="0 0 150 70" fill="none"><path d="M8 16C45 54 75 62 126 25M105 24L131 18L126 44" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
          <figure className={styles.currentPrint}>
            <div className={styles.printTop}><span>MNEMO / TODAY</span><span className={styles.beta}>BETA</span></div>
            <Image src={editions[3].image} alt={editions[3].alt} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 65vw, 760px" preload />
            <figcaption><span>Notes, flashcards, and mind maps.</span><span>Still taking shape <ArrowUpRight size={13} aria-hidden /></span></figcaption>
          </figure>
        </div>
        <div className={styles.heroFoot}><span>ONE STUDENT’S STARTING POINT</span><span>A SHARED NEXT CHAPTER <ArrowDown size={14} aria-hidden /></span></div>
      </div>
    </section>
  )
}

function StoryEditions() {
  const [selected, setSelected] = useState(0)
  const edition = editions[selected]
  return (
    <section className={styles.editions} id="editions" aria-labelledby="editions-heading">
      <div className={styles.sectionLabel}><span>02 / THE WORK</span><span>FROM THE PROJECT ARCHIVE</span></div>
      <div className={styles.sectionHeading}>
        <h2 id="editions-heading">It took more<br />than one attempt.</h2>
        <p>New code. New interfaces. A better understanding of the problem. These are a few of the builds along the way.</p>
      </div>
      <div className={styles.editionButtons} role="group" aria-label="Choose a version of Mnemo">
        {editions.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} aria-controls="edition-detail" onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.name}<ArrowUpRight size={16} aria-hidden /></button>)}
      </div>
      <div className={styles.editionDetail} id="edition-detail" aria-live="polite" aria-atomic="true">
        <figure className={styles.editionImage} key={edition.name}>
          <Image src={edition.image} alt={edition.alt} sizes="(max-width: 700px) 90vw, 65vw" />
          <figcaption>{edition.period} <span>0{selected + 1} / 04</span></figcaption>
        </figure>
        <div className={styles.editionCopy}>
          <span className={styles.eyebrow}>{edition.period}</span>
          <h3>{edition.title}</h3>
          <p>{edition.description}</p>
          <div className={styles.editionNavigation}><span>Explore the versions</span><button type="button" aria-label="Show next version" onClick={() => setSelected((selected + 1) % editions.length)}><ArrowRight size={22} aria-hidden /></button></div>
        </div>
      </div>
    </section>
  )
}

export function StoryDirections() {
  const [direction, setDirection] = useState<Direction>("editorial")
  const choice = directions.find((item) => item.id === direction)!

  return (
    <main id="main-content" className={`${styles.page} ${styles[direction]}`}>
      <aside className={styles.reviewBar} aria-label="Design comparison">
        <span>DESIGN EXPLORATION</span>
        <div role="group" aria-label="Choose a visual direction">{directions.map((item) => <button key={item.id} type="button" aria-pressed={direction === item.id} onClick={() => setDirection(item.id)}>{item.name}</button>)}</div>
        <Link href="/story">Current page <ArrowUpRight size={14} aria-hidden /></Link>
      </aside>
      <p className={styles.directionNote} aria-live="polite">{choice.note}</p>
      <Hero direction={direction} />
      <div className={styles.body}>
        <section className={styles.origin} id="beginning" aria-labelledby="beginning-heading">
          <div className={styles.sectionLabel}><span>01 / THE BEGINNING</span><span>BEFORE THERE WAS AN APP</span></div>
          <div className={styles.originGrid}>
            <div>
              <h2 id="beginning-heading">Before building tools,<br />there was helping<br /><em>people learn.</em></h2>
              <aside className={styles.founderNote}><span className={styles.founderMark} aria-hidden>m.</span><div><strong>A note on the founder</strong><p>Nineteen. An aspiring medical student.<br />Learning to build by building.</p></div></aside>
            </div>
            <div className={styles.prose}>
              <p>Mnemo’s founder has wanted to study medicine since the age of ten. At school, high expectations became perfectionism, and anything short of a perfect grade could feel like failure.</p>
              <p>Helping other people offered a different measure of progress. That meant reaching out to classmates who seemed alone, working through difficult subjects together, and quizzing groups before tests.</p>
              <p>Alongside that came a search for better study tools. Trying different apps and techniques kept revealing friction: missing features, slow interfaces, or useful tools behind a paywall.</p>
              <p>Programming had been an interest since twelve. At fourteen, it became a way to work on the problem directly.</p>
            </div>
          </div>
        </section>
        <StoryEditions />
        <section className={styles.belief} aria-labelledby="belief-heading">
          <span className={styles.eyebrow}>THE IDEA THROUGH ALL OF IT</span>
          <h2 id="belief-heading">Good study tools should be<br /><em>within everyone’s reach.</em></h2>
          <div><span className={styles.beliefArrow} aria-hidden>↗</span><p>Mnemo is a free, open source desktop app that keeps your work on your computer. The aim is straightforward: useful, well-made tools that learners can use and help improve.</p></div>
        </section>
        <section className={styles.nextChapter} aria-labelledby="next-heading">
          <div className={styles.sectionLabel}><span>03 / WHAT COMES NEXT</span><span>AN OPEN INVITATION</span></div>
          <div className={styles.nextGrid}>
            <h2 id="next-heading">Started by one.<br /><em>Shaped by more.</em></h2>
            <div className={styles.prose}><p>So far, Mnemo has been a solo project. The next step is to build it in the open, with people who bring their own subjects, habits, and ways of learning.</p><p>That starts with using it. Tell us where a study session gets interrupted. Suggest a better workflow. Help with the code, the design, or the documentation. There is room to contribute before there is a perfect answer.</p></div>
          </div>
          <div className={styles.joinLinks}>
            <Link href="/download"><span><small>TAKE IT INTO A STUDY SESSION</small>Try Mnemo <span className={styles.linkBeta}>Beta</span></span><ArrowDown size={28} aria-hidden /></Link>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer"><span><small>BRING YOUR PERSPECTIVE</small>Help shape the project</span><ArrowUpRight size={28} aria-hidden /></a>
          </div>
        </section>
      </div>
      <div className={styles.closing}><span>mnemo</span><p>There’s more to learn.<br />There’s more to build.</p><a href="#main-content" aria-label="Back to top"><ArrowUpRight size={30} aria-hidden /></a></div>
    </main>
  )
}
