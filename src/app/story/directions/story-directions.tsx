"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import portrait from "@public/story/profile.png"
import { siteConfig } from "@/config/site"
import { editions } from "./story-content"
import styles from "./directions.module.css"

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="story-heading">
      <h1 id="story-heading">Learning comes first.<br /><span>The tools should follow.</span></h1>
      <div className={styles.heroIntro}>
        <p>Mnemo started as a student’s attempt to make studying a little easier. It has been rebuilt many times since, and is now open for other learners to use and help develop.</p>
        <a href="#beginning" className={styles.readLink}>How it started <ArrowDown size={18} aria-hidden /></a>
      </div>
      <div className={styles.heroArtifacts}>
        <Image className={styles.terminalPrint} src={editions[0].image} alt={editions[0].alt} sizes="(max-width: 700px) 45vw, 340px" />
        <Image className={styles.earlyPrint} src={editions[1].image} alt={editions[1].alt} sizes="(max-width: 700px) 55vw, 450px" />
        <Image className={styles.currentPrint} src={editions[3].image} alt={editions[3].alt} sizes="(max-width: 700px) 85vw, (max-width: 1100px) 65vw, 760px" preload />
      </div>
    </section>
  )
}

function StoryEditions() {
  const [selected, setSelected] = useState(0)
  const edition = editions[selected]
  return (
    <section className={styles.editions} id="editions" aria-labelledby="editions-heading">
      <div className={styles.sectionHeading}>
        <h2 id="editions-heading">It took more<br />than one attempt.</h2>
        <p>The first program was small. Each version after it tried to improve on something that hadn’t worked. These are a few of those versions.</p>
      </div>
      <div className={styles.editionButtons} role="group" aria-label="Choose a version of Mnemo">
        {editions.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} aria-controls="edition-detail" onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
      <div className={styles.editionDetail} id="edition-detail" aria-live="polite" aria-atomic="true">
        <div className={styles.editionImage} key={edition.name}>
          <Image src={edition.image} alt={edition.alt} sizes="(max-width: 700px) 90vw, 65vw" />
        </div>
        <div className={styles.editionCopy}>
          <h3>{edition.title}</h3>
          <p>{edition.description}</p>
        </div>
      </div>
      <div className={styles.editionNavigation}>
        <button type="button" aria-label="Show previous version" onClick={() => setSelected((selected + editions.length - 1) % editions.length)}><ArrowLeft size={20} aria-hidden /></button>
        <button type="button" aria-label="Show next version" onClick={() => setSelected((selected + 1) % editions.length)}><ArrowRight size={20} aria-hidden /></button>
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
              <h2 id="beginning-heading">Trying to find<br />a better way<br /><em>to study.</em></h2>
              <div className={styles.founderNote}>
                <Image src={portrait} alt="Portrait of the student who started Mnemo" sizes="96px" className={styles.portrait} />
                <p>I’m 19, and I’m the student<br />who started Mnemo.</p>
              </div>
            </div>
            <div className={styles.prose}>
              <p>I’ve wanted to study medicine since I was ten. When grades became part of school, I found it hard to accept anything less than a perfect result. I overthought my work and often felt I hadn’t done enough.</p>
              <p>Studying with other people helped. Before tests, I’d often quiz classmates and talk through things they were stuck on. I liked being useful, and it gave me something to focus on besides my own grades.</p>
              <p>I tried a lot of study apps and techniques. There was usually something I wanted to change: a missing feature, a slow interface, or a tool I couldn’t use without paying.</p>
              <p>I’d been interested in programming since I was twelve, so I started trying to make something myself. At fourteen, I published a small program that turned text into a quiz. That was the beginning of Mnemo.</p>
            </div>
          </div>
        </section>
        <StoryEditions />
        <section className={styles.belief} aria-labelledby="belief-heading">
          <h2 id="belief-heading">Good study tools should be<br /><em>within everyone’s reach.</em></h2>
          <p>Mnemo is free, open source, and keeps your work on your computer. The goal is to make a useful study app that people can rely on and help improve.</p>
        </section>
        <section className={styles.nextChapter} aria-labelledby="next-heading">
          <div className={styles.nextGrid}>
            <h2 id="next-heading">There’s room<br /><em>to join in.</em></h2>
            <div className={styles.prose}>
              <p>So far, Mnemo has been a solo project. It’s now at the point where other people can try it, find what needs work, and help make it better.</p>
              <p>You don’t need to write code to contribute. Use it for your own studying, report a problem, suggest a change, or help with design and documentation. Different subjects and study habits will show things one person would miss.</p>
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
