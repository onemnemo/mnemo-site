import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../../components/Icon'
import { SmartLink } from '../../components/SmartLink'
import type { DocGroupNav, DocNavEntry } from '../../content/docs/types'
import { SEARCH_KEYS, useOpenSearch } from './searchContext'

/** Marks the section being read: the last one whose top has passed 30% of the viewport. */
function useCurrentSection(ids: string[], ready: boolean) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!ready || !ids.length) return
    let raf = 0
    const update = () => {
      raf = 0
      const line = innerHeight * 0.3
      let cur = 0
      ids.forEach((id, i) => {
        const s = document.getElementById(id)
        if (s && s.getBoundingClientRect().top <= line) cur = i
      })
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = ids.length - 1
      setCurrent(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', update)
    }
  }, [ids, ready])
  return current
}

function Item({
  entry,
  active,
  currentSection,
}: {
  entry: DocNavEntry
  active: boolean
  currentSection: number
}) {
  const [open, setOpen] = useState(active)
  return (
    <div className={open ? 'item open' : 'item'}>
      <div className="row">
        <SmartLink href={entry.href} aria-current={active ? 'page' : undefined}>
          {entry.title}
        </SmartLink>
        <button
          className="tog"
          type="button"
          aria-expanded={open}
          aria-label={`Sections in ${entry.title}`}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="chev" />
        </button>
      </div>
      <div className="subs">
        <div>
          {entry.sections.map((s, i) => (
            <SmartLink
              key={s.id}
              href={`${entry.href}#${s.id}`}
              className={active && i === currentSection ? 'on' : undefined}
            >
              {s.title}
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  )
}

interface DocsSidebarProps {
  nav: DocGroupNav
  /** href of the page being read. */
  activeHref: string
  activeTitle: string
  /** True once the article body is in the DOM, so sections can be measured. */
  ready: boolean
}

export function DocsSidebar({ nav, activeHref, activeTitle, ready }: DocsSidebarProps) {
  const openSearch = useOpenSearch()
  const [picking, setPicking] = useState(false)
  const active = nav.entries.find((e): e is DocNavEntry => 'href' in e && e.href === activeHref)
  const ids = useMemo(() => active?.sections.map((s) => s.id) ?? [], [active])
  const currentSection = useCurrentSection(ids, ready)

  return (
    <aside className="side">
      <button className="find" type="button" onClick={openSearch}>
        <Icon name="search" />
        Search the docs<kbd>{SEARCH_KEYS}</kbd>
      </button>
      <button
        className="pick"
        type="button"
        aria-expanded={picking}
        aria-controls="pages"
        onClick={() => setPicking((p) => !p)}
      >
        {activeTitle}
        <Icon name="chev" />
      </button>
      <nav className={picking ? 'pages open' : 'pages'} id="pages" aria-label={nav.label}>
        {nav.entries.map((e, i) =>
          'sep' in e ? (
            <span className="sep" aria-hidden="true" key={`sep${i}`} />
          ) : (
            <Item
              key={e.href}
              entry={e}
              active={e.href === activeHref}
              currentSection={currentSection}
            />
          ),
        )}
        <SmartLink className="other" href={nav.other.href}>
          {nav.other.title}
          <Icon name="arrow" />
        </SmartLink>
      </nav>
    </aside>
  )
}
