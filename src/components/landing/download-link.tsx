import Link from "next/link"
import { ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DownloadLink({ className }: { className?: string }) {
  return (
    <Button asChild size="lg" className={cn("mnemo-download", className)}>
      <Link href="/download">
        Download Mnemo
        <ArrowDown aria-hidden className="size-4" />
      </Link>
    </Button>
  )
}
