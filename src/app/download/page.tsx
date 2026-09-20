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
        </Container>
      </Section>
      <Section canvas="butter">
        <Container>
          <div className="mb-14 grid gap-6 border-b pb-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <h2 className="max-w-xs font-sans text-3xl font-medium tracking-tight">A new start.<br />Still a work in progress.</h2>
            <div className="text-ink-2 max-w-xl space-y-4 leading-relaxed">
              <p>Until now, Mnemo has mostly run on our own development machines. As more people try it on different hardware, we’ll find things our testing missed.</p>
              <p>Expect frequent updates in the early days: fixes, improvements, and work to make the app more reliable. Some fixes may address serious issues, including bugs that can cause data loss. Keep backups outside the app and read the release notes before updating.</p>
              <p>We’re still early in development, with more features to come. Tell us what breaks, what feels awkward, and what you’d like to see next. Your feedback will help shape Mnemo. Thanks for giving it a try and supporting the project.</p>
              <Link href="/docs/users/customization/storage-and-backup" className="inline-block py-2 text-sm underline underline-offset-4">How to back up your library</Link>
            </div>
          </div>
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
