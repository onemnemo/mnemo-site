import type { Metadata } from "next"
import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadComingSoon } from "@/components/sections/download-coming-soon"
import { DownloadOptions } from "@/components/sections/download-options"
import { TornEdge } from "@/components/torn-edge"
import { Button } from "@/components/ui/button"
import { rebuild, siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: rebuild.active ? "Download (coming soon)" : "Download",
  description: rebuild.active
    ? "Mnemo is being rebuilt on React and Photino with a full visual overhaul, so downloads are paused until the new build ships."
    : "Download Mnemo for Windows, macOS, or Linux. Free, open source, no account required, and everything you make stays on your machine.",
  alternates: { canonical: "/download" },
}

/**
 * Download page: the target of every primary CTA on the site, so it leads
 * with the platform cards. The help band at the bottom addresses the likeliest
 * reason someone lingers here, an install problem rather than indecision.
 *
 * While the rebuild is in flight the module and the copy swap wholesale (see
 * `rebuild` in config/site.ts): the same page, answering the question someone
 * arriving here is now actually asking.
 */
export default function DownloadPage() {
  /* Both modules take the same {children, className}, so the hero text below
     is written once whichever one is mounted. */
  const Module = rebuild.active ? DownloadComingSoon : DownloadOptions

  return (
    <main id="main-content">
      <Section className="relative overflow-hidden pb-20 sm:pb-28">
        <Doodle
          name="dark-11"
          className="right-[8%] bottom-10 w-20 -rotate-6 opacity-20"
        />
        <Container className="relative">
          {/* Load entrance: text rises in reading order, then the card. The
              card's own delay lives in download-options.tsx. */}
          <Module>
            <p className="type-eyebrow enter-rise">
              {rebuild.active ? "Rebuilding" : "Download"}
            </p>
            <h1
              className="type-display enter-rise mt-3 max-w-2xl"
              style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
            >
              {rebuild.active
                ? "Between two versions."
                : "Put Mnemo on your desk."}
            </h1>
            <p
              className="type-lede text-ink-2 enter-rise mt-4 max-w-xl"
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              {rebuild.active
                ? "There is a working Mnemo, and there is the one being built to replace it. Rather than hand out a version we are already walking away from, downloads are paused until the rebuilt app is ready. It is still a desktop app for Windows, macOS, and Linux, and everything you make in it still stays on your machine."
                : "One download, no account, no trial clock. Mnemo is a desktop app for Windows, macOS, and Linux, and everything you make in it stays on your machine."}
            </p>
          </Module>
        </Container>
      </Section>

      <Section canvas="butter" className="relative overflow-hidden py-16 sm:py-20">
        <Doodle name="dark-19" className="top-10 right-[10%] w-16 opacity-25" />
        <Container className="relative">
          <h2 className="type-h3">
            {rebuild.active ? "Want a say in it?" : "Stuck on the install?"}
          </h2>
          <p className="text-ink-2 mt-3 max-w-md leading-relaxed">
            {rebuild.active
              ? "The docs describe how Mnemo works and mostly survive the port. The issue tracker is where the rebuild is argued out, in the open."
              : "The docs cover the common trip-ups, and the issue tracker is read by the people who wrote the code."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/docs">Read the docs</Link>
            </Button>
            <a
              href={siteConfig.links.issues}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium underline underline-offset-4"
            >
              {rebuild.active
                ? "Follow the work on GitHub"
                : "Open an issue on GitHub"}
            </a>
          </div>
        </Container>
      </Section>
      <TornEdge mascot className="bg-butter text-paper" />
      <SoftwareAppJsonLd />
    </main>
  )
}
