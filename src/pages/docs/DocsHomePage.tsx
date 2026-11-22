import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Field } from '../../components/Field'
import { Icon, type IconName } from '../../components/Icon'
import { Reveal } from '../../components/Reveal'
import { SmartLink } from '../../components/SmartLink'
import { ISSUES_URL } from '../../lib/site'
import type { FieldName } from '../../lib/webgl/palettes'
import { DocsShell } from './DocsShell'
import { SEARCH_KEYS, useOpenSearch } from './searchContext'

const HALVES: {
  id: string
  title: string
  body: string
  field: FieldName
  seed: number
  icon: IconName
  links: [string, string][]
  cta: [string, string]
}[] = [
  {
    id: 'use-title',
    title: 'Use Mnemo',
    body: 'Your first note, map and deck, the shortcuts worth learning, and how to bring your old notes along.',
    field: 'silk-sea',
    seed: 63,
    icon: 'book',
    links: [
      ['Getting started', '/docs/users/getting-started/'],
      ['Notes', '/docs/users/notes/'],
      ['Mind maps', '/docs/users/mind-maps/'],
      ['Flashcards', '/docs/users/flashcards/'],
      ['Importing', '/docs/users/importing/'],
    ],
    cta: ['Open the user guide', '/docs/users/getting-started/'],
  },
  {
    id: 'build-title',
    title: 'Build Mnemo',
    body: 'Get a development build running, learn how the code fits together and send your first change.',
    field: 'silk-dawn',
    seed: 84,
    icon: 'code',
    links: [
      ['Local development', '/docs/developers/getting-started/'],
      ['Architecture', '/docs/developers/architecture/'],
      ['Web frontend', '/docs/developers/web-frontend/'],
      ['Contributing', '/docs/developers/contributing/'],
    ],
    cta: ['Open the developer guide', '/docs/developers/getting-started/'],
  },
]

function DocsHome() {
  const openSearch = useOpenSearch()
  return (
    <main className="panel home">
      <div className="wrap">
        <h1 className="h2">The Mnemo docs.</h1>
        <p className="sub">
          Everything from your first note to your first pull request. Pick the half that fits you.
        </p>
        <button className="find big" type="button" onClick={openSearch}>
          <Icon name="search" />
          Search the docs<kbd>{SEARCH_KEYS}</kbd>
        </button>
        <div className="halves">
          {HALVES.map((h) => (
            <Reveal as="section" className="card" aria-labelledby={h.id} key={h.id}>
              <div className="art">
                <Field name={h.field} seed={h.seed} />
                <Icon name={h.icon} />
              </div>
              <div className="txt">
                <h2 id={h.id}>{h.title}</h2>
                <p>{h.body}</p>
              </div>
              <ul>
                {h.links.map(([label, href]) => (
                  <li key={href}>
                    <SmartLink href={href}>
                      {label}
                      <Icon name="arrow" />
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <div className="get">
                <SmartLink className="pill pill-solid" href={h.cta[1]}>
                  {h.cta[0]}
                  <Icon name="arrow" />
                </SmartLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="more">
          Something missing or wrong? <a href={ISSUES_URL}>Tell us on GitHub</a>.
        </p>
      </div>
    </main>
  )
}

export default function DocsHomePage() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  // Old links to /docs#import still land on the importing guide.
  useEffect(() => {
    if (hash === '#import') navigate('/docs/users/importing/', { replace: true })
  }, [hash, navigate])

  return (
    <DocsShell title="Mnemo docs" description="Guides for using Mnemo and for building it.">
      <DocsHome />
    </DocsShell>
  )
}
