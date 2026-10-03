import type { Metadata } from "next"

import { StoryDirections } from "./directions/story-directions"

export const metadata: Metadata = {
  title: "Our story",
  description: "From a terminal quiz to the app it is today: the designs and versions behind Mnemo.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "How Mnemo got here.",
    description: "The old designs and versions behind the app it is today.",
    url: "/story",
  },
}

export default function StoryPage() {
  return <StoryDirections />
}
