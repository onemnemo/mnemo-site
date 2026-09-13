import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadOptions } from "@/components/sections/download-options"
import { TornEdge } from "@/components/torn-edge"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Download Mnemo",
  description: "Download the Mnemo beta for Windows, macOS, or Linux.",
  alternates: { canonical: "/download" },
}

export default function DownloadPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <DownloadOptions>
            <h1 className="max-w-xl font-sans text-5xl leading-[1.08] font-medium tracking-[-0.055em] sm:text-6xl">Make yourself<br />at home.</h1>
            <p className="text-ink-2 mt-6 max-w-md text-base leading-relaxed">
              Mnemo is free and open source. Your notes, flashcards, and mind maps
              are stored on your computer, with no account needed to get started.
            </p>
            <p className="text-ink-2 mt-4 max-w-md text-base leading-relaxed">
              This is a beta, so there will be rough edges. Keep a backup of your
              work and let us know when something gets in your way.
            </p>
          </DownloadOptions>
        </Container>
      </Section>
      <Section canvas="butter">
        <Container>
          <h2 className="font-sans text-3xl font-medium tracking-tight">Need a hand?</h2>
          <p className="text-ink-2 mt-4 max-w-lg leading-relaxed">The installation guide covers setup. If something goes wrong, report it so we can help.</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Link href="/docs/users/getting-started/installation" className="py-3 text-sm underline underline-offset-4">Installation guide</Link>
            <a href={siteConfig.links.issues} target="_blank" rel="noreferrer" className="py-3 text-sm underline underline-offset-4">Report a problem</a>
          </div>
        </Container>
      </Section>
      <TornEdge mascot className="bg-butter text-paper" />
      <SoftwareAppJsonLd />
    </main>
  )
}
