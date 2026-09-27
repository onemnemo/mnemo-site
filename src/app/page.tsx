import { LandingHero } from "@/components/landing/hero"
import { ProductTour } from "@/components/landing/product-tour"
import { LandingStory } from "@/components/landing/story"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
import { getBetaRelease } from "@/lib/get-beta-release"

export const revalidate = 300

export default async function HomePage() {
  const release = await getBetaRelease()
  return (
    <main id="main-content">
      <LandingHero release={release} />
      <ProductTour />
      <LandingStory />
      <SoftwareAppJsonLd />
    </main>
  )
}
