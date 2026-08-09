"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mainNav, rebuild, siteConfig } from "@/config/site"

import { GitHubIcon } from "./github-icon"

/**
 * Mobile menu: a right-hand drawer holding the primary nav plus the actions
 * hidden at small widths. Open state is controlled so that following a link
 * closes the drawer instead of leaving it over the new page.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="grid gap-1 px-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-lg px-3 py-2.5 text-base font-medium"
            >
              {item.title}
            </Link>
          ))}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </nav>
        <div className="mt-auto p-4">
          <Button
            asChild
            size="lg"
            variant={rebuild.active ? "outline" : "default"}
            className="w-full rounded-full"
          >
            <Link href="/download" onClick={() => setOpen(false)}>
              {rebuild.active ? rebuild.ctaLabel : "Download Mnemo"}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
