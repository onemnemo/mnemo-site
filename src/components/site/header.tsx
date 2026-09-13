import Image from "next/image"
import Link from "next/link"

import { DownloadLink } from "@/components/landing/download-link"
import { siteConfig } from "@/config/site"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="site-masthead sticky top-0 z-50">
      <div className="site-masthead-inner">
        <Link href="/" className="justify-self-start">
          <Image
            src="/logos/logo_full.svg"
            alt={`${siteConfig.name} home`}
            width={340}
            height={50}
            priority
            className="site-masthead-logo"
          />
        </Link>
        <MainNav className="justify-self-center max-md:hidden" />
        <div className="site-masthead-actions">
          <DownloadLink />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
