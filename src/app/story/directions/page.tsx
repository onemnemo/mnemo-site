import type { Metadata } from "next"
import { StoryDirections } from "./story-directions"

export const metadata: Metadata = {
  title: "Our story preview",
  robots: { index: false, follow: false },
}

export default function StoryDirectionsPage() {
  return <StoryDirections />
}
