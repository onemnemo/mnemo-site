import { LandingHero } from "@/components/landing/hero"
import { ProductTour } from "@/components/landing/product-tour"
import { LandingStory } from "@/components/landing/story"
import { SoftwareAppJsonLd } from "@/components/seo/json-ld"
export default function HomePage() {
  return (
    <main id="main-content">
      <LandingHero />
      <ProductTour />
      <LandingStory />
      <SoftwareAppJsonLd />
    </main>
  )
}
