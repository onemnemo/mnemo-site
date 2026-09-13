import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import soma from "@public/soma/dl-idle.png"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

export function DownloadOptions({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.85fr]">
        <div>{children}</div>
        <div className="relative mx-auto w-full max-w-sm pt-36">
          <Image
            src={soma}
            alt="Soma, Mnemo’s study companion"
            className="absolute top-0 right-8 h-48 w-auto"
            sizes="155px"
          />
          <div className="bg-canvas relative rounded-2xl border p-7 shadow-sm">
            <h2 className="font-sans text-2xl font-medium tracking-tight">Get the beta.</h2>
            <p className="text-ink-2 mt-3 text-base leading-relaxed">
              Choose the file for Windows, macOS, or Linux on the release page.
              Each release includes its installation files and change notes.
            </p>
            <Button asChild size="lg" className="mnemo-download mt-6 w-full">
              <a href={siteConfig.links.releases} target="_blank" rel="noreferrer">
                Open beta downloads <ArrowUpRight size={17} aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
