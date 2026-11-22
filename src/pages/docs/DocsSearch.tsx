import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/Icon'
import type { SearchEntry } from '../../content/docs/types'
import { highlight, loadSearchIndex, search, snippet, terms } from './search'

function Marked({ text, ts }: { text: string; ts: string[] }) {
  return highlight(text, ts).map((p, i) => (p.hit ? <mark key={i}>{p.text}</mark> : p.text))
}

interface DocsSearchProps {
  open: boolean
  onClose: () => void
}

/** The search dialog shared by every docs page. */
export function DocsSearch({ open, onClose }: DocsSearchProps) {
  const navigate = useNavigate()
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [sel, setSel] = useState(0)

  useEffect(() => {
    if (!open) return
    const last = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    input.current?.focus()
    loadSearchIndex().then(
      (d) => {
        setIndex(d)
        setFailed(false)
      },
      () => setFailed(true),
    )
    return () => {
      document.body.style.overflow = ''
      setQuery('')
      setSel(0)
      last?.focus?.()
    }
  }, [open])

  const ts = terms(query.trim())
  const hits = index ? search(index, ts) : []

  useEffect(() => {
    list.current?.querySelector(`#r${sel}`)?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const go = (e: SearchEntry) => {
    onClose()
    navigate(e.u)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (!hits.length) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const d = e.key === 'ArrowDown' ? 1 : -1
      setSel((s) => (s + d + hits.length) % hits.length)
    } else if (e.key === 'Enter') {
      const hit = hits[sel]
      if (!hit) return
      e.preventDefault()
      go(hit)
    }
  }

  return (
    <div
      className="search"
      hidden={!open}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sbox" role="dialog" aria-modal="true" aria-label="Search the docs">
        <label className="q">
          <Icon name="search" />
          <input
            ref={input}
            type="search"
            placeholder="Search the docs"
            autoComplete="off"
            spellCheck={false}
            aria-controls="results"
            aria-activedescendant={hits.length ? `r${sel}` : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSel(0)
            }}
            onKeyDown={onKeyDown}
          />
          <kbd>Esc</kbd>
        </label>
        <div className="results" id="results" role="listbox" aria-label="Results" ref={list}>
          {failed ? (
            <p className="none">Search couldn’t load. Try again in a moment.</p>
          ) : !index ? null : !hits.length ? (
            <p className="none">Nothing found for “{query.trim()}”. Try another word.</p>
          ) : (
            hits.map((e, i) => (
              <a
                className="res"
                role="option"
                id={`r${i}`}
                key={e.u}
                href={e.u}
                aria-selected={i === sel}
                onClick={(ev) => {
                  ev.preventDefault()
                  go(e)
                }}
              >
                <b>
                  <Marked text={e.h || e.p} ts={ts} />
                </b>
                <span>{e.h ? `${e.p}, ${e.g}` : e.g}</span>
                <p>{ts.length ? <Marked text={snippet(e.x, ts)} ts={ts} /> : e.x}</p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
