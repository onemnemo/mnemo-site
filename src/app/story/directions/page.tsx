import type { Metadata } from "next"
import { StoryDirections } from "./story-directions"

export const metadata: Metadata = {
  title: "Story design directions",
  robots: { index: false, follow: false },
}

export default function StoryDirectionsPage() {
  return <StoryDirections />
}
