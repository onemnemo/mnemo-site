import { useEffect, useState, type MouseEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Field } from '../../components/Field'
import { Icon } from '../../components/Icon'
import { SmartLink } from '../../components/SmartLink'
import { DOC_NAV, DOC_PAGES } from '../../content/docs/manifest'
import type { DocPageMeta } from '../../content/docs/types'
import NotFoundPage from '../NotFoundPage'
import { DocsShell } from './DocsShell'
import { DocsSidebar } from './DocsSidebar'
import { HtmlBlocks } from './HtmlBlocks'

const bodies = import.meta.glob<string>('../../content/docs/*/*.html', {
  query: '?raw',
  import: 'default',
})

function useArticleBody(page: DocPageMeta) {
  const [body, setBody] = useState<{ key: string; html: string } | null>(null)
  const key = `${page.group}/${page.slug}`
  useEffect(() => {
    let live = true
    void bodies[`../../content/docs/${key}.html`]?.().then((html) => live && setBody({ key, html }))
    return () => {
      live = false
    }
  }, [key])
  return body?.key === key ? body.html : null
}

function Article({ page }: { page: DocPageMeta }) {
  const navigate = useNavigate()
  const html = useArticleBody(page)
  const href = `/docs/${page.group}/${page.slug}/`

  // Links inside the article body are plain anchors; keep in-app ones in the router.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest('a')
    const to = a?.getAttribute('href')
    if (!a || !to?.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }

  return (
    <main className="panel reader">
      <div className="reader-in">
        <DocsSidebar
          nav={DOC_NAV[page.group]}
          activeHref={href}
          activeTitle={page.title}
          ready={html !== null}
        />
        <article className="doc" onClick={onClick}>
          <h1 className="h2">{page.title}</h1>
          <p className="sub">{page.sub}</p>
          <div className="banner" aria-hidden="true">
            <Field name={page.field} seed={page.seed} />
            <Icon name={page.icon} />
          </div>
          {html !== null && <HtmlBlocks html={html} />}
          <p className="help">
            Something unclear or missing? <a href={page.help}>Tell us on GitHub</a>.
          </p>
          <nav className="pager" aria-label="More pages">
            {page.prev && (
              <SmartLink className="prev" href={page.prev.href}>
                <Icon name="arrow" />
                <span>{page.prev.title}</span>
              </SmartLink>
            )}
            {page.next && (
              <SmartLink className="next" href={page.next.href}>
                <span>{page.next.title}</span>
                <Icon name="arrow" />
              </SmartLink>
            )}
          </nav>
        </article>
      </div>
    </main>
  )
}

export default function DocArticlePage() {
  const { group, slug } = useParams()
  if (group && !slug && group in DOC_NAV) {
    return <Navigate to={`/docs/${group}/getting-started/`} replace />
  }
  const page = DOC_PAGES.find((p) => p.group === group && p.slug === slug)
  if (!page) return <NotFoundPage />
  return (
    <DocsShell title={page.docTitle} description={page.description}>
      <Article key={`${page.group}/${page.slug}`} page={page} />
    </DocsShell>
  )
}
