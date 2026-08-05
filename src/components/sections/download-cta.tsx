import Link from "next/link"

import { Doodle } from "@/components/doodle"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

/**
 * Closing call to action on the butter canvas. The last thing before the
 * footer, so it repeats the one action that matters and nothing else.
 */
export function DownloadCta() {
  return (
    <Section canvas="butter" className="relative overflow-hidden">
      {/* Atmosphere layer: celebration doodles around the closing CTA. */}
      <Doodle name="dark-24" className="top-10 left-10 w-16 opacity-25" />
      <Doodle name="dark-17" className="top-1/3 right-12 w-10 opacity-25" />
      <Doodle name="dark-18" className="bottom-14 left-1/4 w-8 -rotate-12 opacity-20" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Start studying with Mnemo.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed opacity-70">
          Download it, open it, and start writing. No signup, no trial clock.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/download"
            className="bg-butter-ink text-butter rounded-full px-7 py-3.5 text-sm font-medium"
          >
            Download Mnemo
          </Link>
        </div>
        <p className="mt-6 font-mono text-xs tracking-wide opacity-60">
          Free · No account · Windows, macOS, and Linux
        </p>
      </Container>
    </Section>
  )
}
