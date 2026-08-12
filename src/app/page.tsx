import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadCta } from "@/components/sections/download-cta"
import { Hero } from "@/components/sections/hero"
import { Manifesto } from "@/components/sections/manifesto"
import { Modules } from "@/components/sections/modules"
import { ScienceTeaser } from "@/components/sections/science-teaser"
import { TornEdge } from "@/components/torn-edge"

/**
 * Home page, following the page rhythm documented on /brand.
 *
 * One claim per module, made once: hero (paper), the three modules with their
 * proof screenshots (sunken), science teaser (paper), manifesto (the app's
 * dark canvas, the page's single loud moment), download CTA (butter), then
 * the footer.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Modules />
      <ScienceTeaser />
      <Manifesto />
      <DownloadCta />
      {/* The only soft edge on the page: the CTA band tears off above the
          paper footer and Soma peeks over the tear. Every other band edge is
          a flat cut. */}
      <TornEdge mascot className="bg-butter text-paper" />
      <SoftwareAppJsonLd />
    </main>
  )
}
