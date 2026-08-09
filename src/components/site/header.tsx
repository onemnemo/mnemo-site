import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

import { GitHubIcon } from "./github-icon"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

/**
 * Site-wide sticky header.
 *
 * Fixed height (h-16) so it never causes layout shift, translucent paper with
 * a blur so content scrolling underneath stays legible. Server component; the
 * interactive children (MainNav, MobileNav) opt into the client themselves.
 */
export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      {/* Three zones: logo left, nav center, actions right. The 1fr side
          columns keep the nav centered whatever width the logo or the action
          cluster takes. */}
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link href="/" className="inline-flex items-center justify-self-start">
          <Image
            src="/logos/logo_full.svg"
            alt={`${siteConfig.name} home`}
            width={340}
            height={50}
            priority
            className="h-4 w-auto"
          />
        </Link>

        <MainNav className="justify-self-center max-md:hidden" />

        <div className="flex items-center gap-1.5 justify-self-end">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="max-md:hidden"
          >
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Mnemo on GitHub"
            >
              <GitHubIcon />
            </a>
          </Button>
          <Button asChild className="rounded-full max-sm:hidden">
            <Link href="/download">Download</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
