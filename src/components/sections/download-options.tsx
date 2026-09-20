import Image from "next/image"

import soma from "@public/soma/dl-idle.png"
import { BetaDownloadPicker } from "@/components/sections/beta-download-picker"
import type { ReleaseResult } from "@/lib/beta-release"

export function DownloadOptions({ children, className, result }: {
  result: ReleaseResult
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.85fr]">
        <div>{children}</div>
        <div className="relative mx-auto w-full max-w-md pt-36">
          <Image
            src={soma}
            alt="Soma, Mnemo’s study companion"
            className="absolute top-0 right-8 h-48 w-auto"
            sizes="155px"
          />
          <BetaDownloadPicker result={result} />
        </div>
      </div>
    </div>
  )
}
