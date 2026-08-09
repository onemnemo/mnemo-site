import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DeepDives } from "@/components/sections/deep-dives"
import { DownloadCta } from "@/components/sections/download-cta"
import { FeatureScan } from "@/components/sections/feature-scan"
import { Hero } from "@/components/sections/hero"
import { Manifesto } from "@/components/sections/manifesto"
import { ScienceTeaser } from "@/components/sections/science-teaser"
import { TornEdge } from "@/components/torn-edge"

/**
 * Home page, following the page rhythm documented on /brand:
 * hero (paper), feature scan (meadow), deep dives (paper), science teaser
 * (cobalt), manifesto (ink), download CTA (butter), then the footer.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeatureScan />
      <DeepDives />
      <ScienceTeaser />
      <Manifesto />
      <DownloadCta />
      {/* The only soft edge on the page: the butter band tears off above the
          paper footer and Soma peeks over the tear. Every other band edge is
          a flat cut. */}
      <TornEdge mascot className="bg-butter text-background" />
      <SoftwareAppJsonLd />
    </main>
  )
}
