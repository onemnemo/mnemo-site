import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { BuildIllustration, UseIllustration } from "@/components/docs/docs-illustrations"
import { siteConfig } from "@/config/site"
import styles from "./home.module.css"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn to use Mnemo, set up a development environment, and contribute to the project.",
  alternates: { canonical: "/docs" },
}

const guides = [
  {
    title: "Use Mnemo",
    description: "Learn how to use Mnemo to take notes, make flashcards, and build mind maps.",
    href: "/docs/users/getting-started",
    action: "Open user docs",
    className: styles.use,
    Illustration: UseIllustration,
    links: [
      ["Getting started", "/docs/users/getting-started"],
      ["Notes", "/docs/users/modules/notes"],
      ["Flashcards", "/docs/users/modules/flashcards"],
      ["Mind maps", "/docs/users/modules/mindmaps"],
    ],
  },
  {
    title: "Build Mnemo",
    description: "Set up a development environment, explore the architecture, and help improve Mnemo.",
    href: "/docs/developers",
    action: "Open developer docs",
    className: styles.build,
    Illustration: BuildIllustration,
    links: [
      ["Local development", "/docs/developers/getting-started/building-from-source"],
      ["Architecture", "/docs/developers/architecture"],
      ["Web frontend", "/docs/developers/ui"],
      ["Contributing", "/docs/developers/contributing"],
    ],
  },
]

export default function DocsHome() {
  const feedbackHref = `${siteConfig.links.siteIssues}/new?${new URLSearchParams({
    title: "Documentation feedback",
    body: `Page: ${siteConfig.url}/docs\n\nSuggestion or correction:\n`,
  })}`

  return (
    <main id="main-content" className={styles.home}>
      <div className={styles.intro}>
        <h1><span>Documentation</span>{" "}<span>for using and</span>{" "}<span>building Mnemo.</span></h1>
        <p>Whether you’re here to learn, remember better, or contribute to the project, you’ll find what you need in our documentation.</p>
      </div>
      <div className={styles.guides}>
        {guides.map(({ title, description, href, action, className, Illustration, links }) => (
          <section key={href} className={`${styles.guide} ${className}`} aria-label={title}>
            <h2>{title}</h2>
            <p>{description}</p>
            <ul className={styles.links}>
              {links.map(([label, target]) => (
                <li key={target}><Link href={target}>{label}<ArrowRight size={19} aria-hidden /></Link></li>
              ))}
            </ul>
            <Illustration />
            <Link href={href} className={styles.action}>{action}<ArrowRight size={19} aria-hidden /></Link>
          </section>
        ))}
      </div>
      <section className={styles.feedback} aria-labelledby="docs-feedback-heading">
        <h2 id="docs-feedback-heading">The docs aren’t finished either.</h2>
        <div>
          <p>If anything annoys you, feels off, or is wrong, tell us. If you want to fix it, even better.</p>
          <div className={styles.feedbackLinks}>
            <a href={feedbackHref} target="_blank" rel="noreferrer">
              Share feedback <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={siteConfig.links.siteGithub} target="_blank" rel="noreferrer">
              Fix it on GitHub <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
