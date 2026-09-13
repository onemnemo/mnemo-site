import sprite from "@public/illos/science/squid-sprite-sheet.png"
import { cn } from "@/lib/utils"

export function Octopus({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("science-squid-float", className)}>
      <div className="science-squid-swim w-full bg-no-repeat" style={{
        aspectRatio: `${sprite.width / 3} / ${sprite.height}`,
        backgroundImage: `url(${sprite.src})`,
        backgroundSize: "300% 100%",
      }} />
    </div>
  )
}
