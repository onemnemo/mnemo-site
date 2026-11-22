import { Field } from '../../components/Field'
import { Icon } from '../../components/Icon'
import { PageShell } from '../../components/layout/PageShell'
import { Reveal } from '../../components/Reveal'
import { SmartLink } from '../../components/SmartLink'
import { useDetectedOs } from '../../hooks/useDetectedOs'
import { useLatestRelease } from '../../hooks/useLatestRelease'
import { LATEST_RELEASE_URL } from '../../lib/site'
import '../../styles/download.css'
import { AFTER_INSTALL, PLATFORMS } from './platforms'

export default function DownloadPage() {
  const os = useDetectedOs()
  const { version, notesUrl } = useLatestRelease()
  // The nav button points straight at the visitor's installer when we can tell their system.
  const primary = PLATFORMS.find((p) => p.os === os)?.downloads[0]?.href ?? '#platforms'

  return (
    <PageShell
      scope="p-download"
      title="Download Mnemo"
      description="Download Mnemo for Windows, macOS or Linux. Free, open source and offline."
      nav={{ solid: true, logoHref: '/', downloadHref: primary }}
    >
      <main>
        <section className="panel platforms" id="platforms" aria-labelledby="pl-title">
          <div className="wrap">
            <h1 className="h2" id="pl-title">
              Download Mnemo.
            </h1>
            <p className="sub">
              Version <span>{version}</span> is out. Read the <a href={notesUrl}>release notes</a>.
            </p>
            <div className="os">
              {PLATFORMS.map((p) => (
                <Reveal as="article" className={p.os === os ? 'card mine' : 'card'} key={p.os}>
                  <div className="art">
                    <Field name={`silk-${p.field}`} seed={p.seed} />
                    <Icon name={p.icon} />
                  </div>
                  <div className="txt">
                    <h3>{p.name}</h3>
                    <p>{p.body}</p>
                    {p.os === 'win' && (
                      <p className="note">
                        Windows may show a SmartScreen warning since this build isn't signed yet.
                        Click More info, then Run anyway, or verify the source on{' '}
                        <a href={LATEST_RELEASE_URL}>GitHub</a>.
                      </p>
                    )}
                  </div>
                  <div className="get">
                    {p.downloads.map((d) => (
                      <a
                        key={d.label}
                        className={d.soft ? 'pill pill-soft' : 'pill pill-solid'}
                        href={d.href}
                      >
                        <Icon name="dl" />
                        {d.label}
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="panel info" aria-labelledby="info-title">
          <div className="wrap">
            <div className="head">
              <Reveal as="h2" className="h2" id="info-title">
                After you install.
              </Reveal>
            </div>
            <div className="os">
              {AFTER_INSTALL.map((c) => (
                <Reveal as="article" className="card" key={c.title}>
                  <div className="art">
                    <Field name={`silk-${c.field}`} seed={c.seed} />
                    <Icon name={c.icon} />
                  </div>
                  <div className="txt">
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                  <div className="get">
                    <SmartLink className="pill pill-soft" href={c.link.href}>
                      {c.link.label}
                      <Icon name="arrow" className="go" />
                    </SmartLink>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
