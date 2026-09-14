import type { Metadata } from "next"

import { StoryDirections } from "./directions/story-directions"

export const metadata: Metadata = {
  title: "Our story",
  description: "A terminal quiz, a lot of questionable interfaces, and years of starting again. The story of why I keep building Mnemo.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "It took a few tries. The story of Mnemo.",
    description: "The old designs, the things they taught me, and why I’m still here building a better study tool.",
    url: "/story",
  },
}

export default function StoryPage() {
  return <StoryDirections />
}
