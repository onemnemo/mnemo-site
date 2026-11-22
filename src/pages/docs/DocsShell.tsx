import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { PageShell } from '../../components/layout/PageShell'
import '../../styles/docs.css'
import { DocsSearch } from './DocsSearch'
import { OpenSearchContext } from './searchContext'

interface DocsShellProps {
  title: string
  description: string
  children: ReactNode
}

/** Page shell for the docs, with the search dialog and its shortcuts (Ctrl K, /, Esc). */
export function DocsShell({ title, description, children }: DocsShellProps) {
  const [open, setOpen] = useState(false)
  const openSearch = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName ?? '')) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <PageShell
      scope="p-docs"
      title={title}
      description={description}
      nav={{
        solid: true,
        current: 'docs',
        logoHref: '/',
        downloadHref: '/download',
        downloadClass: 'pill-solid',
      }}
    >
      <OpenSearchContext.Provider value={openSearch}>
        <DocsSearch open={open} onClose={() => setOpen(false)} />
        {children}
      </OpenSearchContext.Provider>
    </PageShell>
  )
}
