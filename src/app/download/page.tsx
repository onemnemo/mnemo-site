import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadOptions } from "@/components/sections/download-options"
import { TornEdge } from "@/components/torn-edge"
import { siteConfig } from "@/config/site"
import { getBetaRelease } from "@/lib/get-beta-release"

export const revalidate = 300

export const metadata: Metadata = {
  title: "Download Mnemo",
  description: "Download Mnemo for Windows, macOS, or Linux. Find the current release, platform requirements, and testing status.",
  alternates: { canonical: "/download" },
}

export default async function DownloadPage() {
  const result = await getBetaRelease()
  return (
    <main id="main-content">
      <Section>
        <Container>
          <DownloadOptions result={result}>
            <h1 className="max-w-xl font-sans text-5xl leading-[1.08] font-medium tracking-[-0.055em] sm:text-6xl">Make yourself<br />at home.</h1>
            <p className="text-ink-2 mt-6 max-w-md text-base leading-relaxed">
              Mnemo is free and open source. Your notes, flashcards, and mind maps
              are stored on your computer, with no account needed to get started.
            </p>
            <p className="text-ink-2 mt-4 max-w-md text-base leading-relaxed">
              This is the first proper release since we rebuilt the app and
              changed its framework. A lot is new, and there will be bugs and quirks
              we haven’t found yet.
            </p>
          </DownloadOptions>
          <article aria-labelledby="beta-note-title" className="mx-auto mt-20 max-w-2xl border-t pt-8 sm:mt-28 sm:pt-10">
            <h2 id="beta-note-title" className="font-sans text-2xl font-medium tracking-tight">About this beta</h2>
            <div className="text-ink-2 mt-5 space-y-5 text-base leading-7">
              <p>Until now, Mnemo has mostly run on our own development machines. New hardware will uncover things we’ve missed, so expect frequent fixes and improvements in the first few weeks.</p>
              <p>Some of those fixes may address serious problems, including data loss. Keep a backup outside the app and read the release notes before updating. The <Link href="/docs/users/customization/storage-and-backup" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">backup guide</Link> explains how.</p>
              <p>There’s more to build. Tell us what breaks, what feels awkward, and what you’d like to see next. Your feedback will help shape Mnemo as it grows.</p>
            </div>
            <p className="mt-6 text-sm leading-relaxed">Thanks for trying Mnemo and supporting the project.</p>
          </article>
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
