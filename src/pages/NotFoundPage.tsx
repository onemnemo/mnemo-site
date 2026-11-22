import { Icon } from '../components/Icon'
import { PageShell } from '../components/layout/PageShell'
import { SmartLink } from '../components/SmartLink'
import '../styles/download.css'

/** 404, built from the download page's panel so it matches the site. */
export default function NotFoundPage() {
  return (
    <PageShell
      scope="p-download"
      title="Page not found | Mnemo"
      description="This page doesn't exist."
      nav={{ solid: true, logoHref: '/', downloadHref: '/download' }}
    >
      <main>
        <section className="panel platforms" aria-labelledby="nf-title">
          <div className="wrap">
            <h1 className="h2" id="nf-title">
              Page not found.
            </h1>
            <p className="sub">
              This page doesn't exist, or it moved. Try the home page or the docs.
            </p>
            <div className="nf-actions">
              <SmartLink className="pill pill-solid" href="/">
                Back to home
                <Icon name="arrow" />
              </SmartLink>
              <SmartLink className="pill pill-soft" href="/docs">
                Read the docs
                <Icon name="arrow" />
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
