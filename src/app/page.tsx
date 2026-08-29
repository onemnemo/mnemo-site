import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { DownloadCta } from "@/components/sections/download-cta"
import { Hero } from "@/components/sections/hero"
import { Manifesto } from "@/components/sections/manifesto"
import { Modules } from "@/components/sections/modules"
import { OneWorkspace } from "@/components/sections/one-workspace"
import { TornEdge } from "@/components/torn-edge"

/**
 * Home page, following the page rhythm documented on /brand.
 *
 * One claim per module, made once: hero (paper), the three modules with their
 * annotated proof screenshots (sunken), the workspace sequence that ties them
 * together (paper), manifesto (the app's dark canvas, the page's single loud
 * moment), download CTA (butter), then the footer.
 *
 * Two of the band edges are tears, and they are the page's opening and
 * closing seams: paper into the modules band at the top, butter into the
 * footer at the bottom. The pair is mirrored so the second does not read as
 * the first stamped twice.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      {/* Paper tearing off above the sunken modules band. Both canvases are
          light neutrals, so the hairline is drawn in ink: cream would leave
          the tear with no line along it at all. */}
      <TornEdge flip hairline="ink" className="bg-paper text-sunken" />
      <Modules />
      <OneWorkspace />
      <Manifesto />
      <DownloadCta />
      {/* The CTA band tears off above the paper footer and Soma peeks over
          the tear. The two tears are the only soft edges on the page; every
          band edge between them is a flat cut. */}
      <TornEdge mascot className="bg-butter text-paper" />
      <SoftwareAppJsonLd />
    </main>
  )
}
