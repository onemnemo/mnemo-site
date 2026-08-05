import type { Metadata } from "next"
import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadOptions } from "@/components/sections/download-options"
import { TornEdge } from "@/components/torn-edge"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download Mnemo for Windows, macOS, or Linux. Free, open source, no account required, and everything you make stays on your machine.",
  alternates: { canonical: "/download" },
}

/**
 * Download page: the target of every primary CTA on the site, so it gets
 * straight to the platform cards. The help band at the bottom exists because
 * the likeliest reason someone lingers here is an install problem, not
 * indecision.
 */
export default function DownloadPage() {
  return (
    <main id="main-content">
      <Section className="relative overflow-hidden pb-20 sm:pb-28">
        <Doodle name="dark-05" className="top-16 right-10 w-12 opacity-20" />
        <Doodle
          name="dark-11"
          className="bottom-12 left-8 w-14 -rotate-6 opacity-20"
        />
        <Container className="relative">
          <DownloadOptions>
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Download
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Put Mnemo on your desk.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
              One download, no account, no trial clock. Mnemo is a desktop
              app for Windows, macOS, and Linux, and everything you make in
              it stays on your machine.
            </p>
          </DownloadOptions>
        </Container>
      </Section>

      <Section canvas="butter" className="relative overflow-hidden py-14 sm:py-16">
        <Doodle name="dark-19" className="top-8 right-14 w-10 opacity-25" />
        <Container className="relative">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Stuck on the install?
          </h2>
          <p className="mt-3 max-w-md leading-relaxed opacity-70">
            The docs cover the common trip-ups, and the issue tracker is read
            by the people who wrote the code.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/docs"
              className="bg-butter-ink text-butter rounded-full px-6 py-3 text-sm font-medium"
            >
              Read the docs
            </Link>
            <a
              href={siteConfig.links.issues}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium underline underline-offset-4"
            >
              Open an issue on GitHub
            </a>
          </div>
        </Container>
      </Section>
      <TornEdge mascot className="bg-butter text-background" />
      <SoftwareAppJsonLd />
    </main>
  )
}
