import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, FileText, Network, PanelsTopLeft } from "lucide-react"

import oldQuiz from "@public/story/02.webp"
import oldDashboard from "@public/story/07.webp"
import newerNotes from "@public/story/11.webp"
import soma from "@public/soma/dl-idle.png"
import flourish from "@public/illos/doodles/dark-06.png"
import { StoryArchive } from "@/components/story/archive"
import { DownloadLink } from "@/components/landing/download-link"
import { TornEdge } from "@/components/torn-edge"
import { siteConfig } from "@/config/site"
import styles from "./story.module.css"

export const metadata: Metadata = {
  title: "Our story",
  description: "A terminal quiz, a lot of questionable interfaces, and years of starting again. The story of why I keep building Mnemo.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "It took a few tries. The story of Mnemo.",
    description: "The old designs, the things they taught me, and why I’m still here building a better study tool.",
    url: "/story",
  },
}

export default function StoryPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="story-title">
          <div>
            <h1 id="story-title">It was terrible.<br />So I made<br /><span>another one.</span></h1>
            <p>If Mnemo looks like a study app that appeared a few weeks ago, I have some deeply embarrassing screenshots to show you.</p>
            <a href="#archive" className={styles.textLink}>Let’s see the evidence <ArrowDown size={18} aria-hidden /></a>
          </div>
          <div className={styles.pile} aria-label="Three old Mnemo designs, from an early quiz maker to a more recent notes editor">
            <Image className={styles.firstPrint} src={oldQuiz} alt="An early quiz maker interface" sizes="(max-width: 650px) 65vw, 380px" priority />
            <Image className={styles.secondPrint} src={oldDashboard} alt="An older dark Mnemo dashboard" sizes="(max-width: 650px) 70vw, 420px" priority />
            <Image className={styles.thirdPrint} src={newerNotes} alt="A more recent Mnemo notes editor" sizes="(max-width: 650px) 75vw, 470px" priority />
            <p>Yes, these are all mine.</p>
            <Image className={styles.flourish} src={flourish} alt="" aria-hidden />
          </div>
        </section>

        <section className={styles.origin} aria-labelledby="origin-title">
          <div className={styles.originTitle}>
            <h2 id="origin-title">I wanted to<br />study medicine.</h2>
            <p>Somewhere along the way,<br />I acquired a software project.</p>
            <Image src={soma} alt="Soma, looking about as surprised as you’d expect" className={styles.soma} sizes="(max-width: 650px) 90px, 150px" />
          </div>
          <div className={styles.prose}>
            <p>I’m nineteen. I’ve wanted to study medicine since I was about ten, and I’ve been messing with programming and electronics since I was twelve.</p>
            <p>At school, I became the person quizzing classmates before tests. Helping people understand something felt good. Trying to get every one of my own grades exactly right was considerably less relaxing.</p>
            <p>I tried just about every study tool I could find. I kept wanting the same thing: notes, flashcards, and mind maps that felt like they belonged together. There was always something missing, something awkward, or another app I needed to open.</p>
            <p>So I decided to make my own. At fourteen, I published a terminal program that turned text into a quiz.</p>
            <blockquote>This seemed like a reasonably small project at the time.</blockquote>
          </div>
        </section>

        <section id="archive" className={styles.archiveSection} aria-labelledby="archive-title">
          <div className={styles.sectionHeading}>
            <h2 id="archive-title">The versions<br />I can still find.</h2>
            <div>
              <p>A few designs from years of trying again. There are plenty more, including earlier attempts that are probably still hiding in a folder somewhere.</p>
              <p>Move through the timeline. Open anything for a closer look. I’ve already made peace with it. Mostly.</p>
            </div>
          </div>
          <StoryArchive />
        </section>

        <section className={styles.underneath} aria-labelledby="underneath-title">
          <div className={styles.prose}>
            <h2 id="underneath-title">The screenshots<br />only show half of it.</h2>
            <p>With each version, I got better at design. I also got better at the code underneath it. A new interface only gets you so far if changing one thing means unravelling five others.</p>
            <p>Today, Mnemo is built around parts with clear jobs. The interface, the study rules, and the way your work is stored have their own boundaries. Features reuse shared pieces, and those pieces can be replaced as the app improves.</p>
            <p>That matters to me because I want other people to be able to work on Mnemo. A contributor should be able to understand one part without first becoming an expert in everything I’ve ever written.</p>
            <Link href="/docs/developers/architecture/the-layers" className={styles.textLink}>Look under the hood <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
          <div className={styles.parts}>
            <div className={styles.modules}>
              <div><FileText aria-hidden /><span>Notes</span></div>
              <div><PanelsTopLeft aria-hidden /><span>Flashcards</span></div>
              <div><Network aria-hidden /><span>Mind maps</span></div>
            </div>
            <div className={styles.foundation}><span>The interface</span><p>A place to write, study, and explore.</p></div>
            <div className={styles.foundation}><span>The study rules</span><p>The logic that makes the tools work.</p></div>
            <div className={styles.foundation}><span>Your stored work</span><p>Separate from the screens that show it.</p></div>
            <p className={styles.partsCaption}>A place for each part.<br />Room to improve any of them.</p>
          </div>
        </section>

        <section className={styles.persistence} aria-labelledby="persistence-title">
          <p className={styles.pullQuote} id="persistence-title">I don’t mind failing nearly as much as I mind abandoning something I believe in.</p>
          <div className={styles.prose}>
            <p>I can’t point to a perfect first attempt. I can point to years of coming back to the same problem, learning something, and trying again.</p>
            <p>I use Mnemo for my own studying now, including the enormous chemistry notes that used to live in Notion. There are still bugs. There are still things I want to make better. The difference is that this time, I’d like some company.</p>
          </div>
        </section>
      </div>

      <section className={styles.invitation} aria-labelledby="invitation-title">
        <div className={styles.invitationInner}>
          <h2 id="invitation-title">This has been my<br />weird little obsession.<br />It could become ours.</h2>
          <div>
            <p>I think the basic tools people use to learn should be available to everyone. I also think those tools deserve good design, and code that people can understand and help improve.</p>
            <p>Try Mnemo on a computer I don’t own. Bring a workflow I haven’t thought of. Tell me which bit gets in your way. Or pick a part you’d like to help build.</p>
            <div className={styles.actions}><DownloadLink /><a className={styles.textLink} href={siteConfig.links.github} target="_blank" rel="noreferrer">Help shape Mnemo <ArrowUpRight size={17} aria-hidden /></a></div>
          </div>
        </div>
      </section>
      <TornEdge mascot className="bg-butter text-paper" />
    </main>
  )
}
