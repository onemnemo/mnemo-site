import type { ReactNode } from 'react'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { IconSprite } from '../Icon'
import { Footer } from './Footer'
import { Nav, type NavProps } from './Nav'

interface PageShellProps {
  /** Scope class for the page stylesheet, e.g. "p-home". */
  scope: string
  title: string
  description: string
  nav: NavProps
  children: ReactNode
}

/** Nav, page content and footer, with the page's stylesheet scope and document meta. */
export function PageShell({ scope, title, description, nav, children }: PageShellProps) {
  useDocumentMeta(title, description)
  return (
    <div className={`page ${scope}`}>
      <IconSprite />
      <Nav {...nav} />
      {children}
      <Footer />
    </div>
  )
}
