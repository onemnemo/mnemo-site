import { FOOTER_COLUMNS } from '../../content/navigation'
import { GITHUB_URL } from '../../lib/site'
import { Icon } from '../Icon'
import { SmartLink } from '../SmartLink'

export function Footer() {
  return (
    <footer className="panel">
      <div className="wrap">
        <div className="foot">
          <div className="brand">
            <span className="logo" />
            <p>Made by students, for everyone.</p>
            <div className="social">
              <a href={GITHUB_URL} aria-label="GitHub">
                <Icon name="gh" width={16} height={16} />
              </a>
              <a href="https://www.youtube.com/@justmnemo" aria-label="YouTube">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://x.com/justmnemo" aria-label="X">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.reddit.com/r/justmnemo/" aria-label="Reddit">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="14" r="6.5" />
                  <circle cx="18.5" cy="5.5" r="1.5" />
                  <path d="M12 7.5l1.3-4 3.7 1.2" />
                  <circle cx="9.5" cy="13.5" r=".8" fill="currentColor" />
                  <circle cx="14.5" cy="13.5" r=".8" fill="currentColor" />
                  <path d="M9.6 16.6c1.4.9 3.4.9 4.8 0" />
                </svg>
              </a>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div className="col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href}>
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
        <div className="legal">
          <span>
            &copy; 2026 Mnemo contributors.{' '}
            <a href={`${GITHUB_URL}/blob/main/LICENSE`}>Apache 2.0</a>
          </span>
          <span className="right">
            <span>
              Security: <a href="mailto:security@mnemo.one">security@mnemo.one</a>
            </span>
            <a href={`${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`}>Code of conduct</a>
          </span>
        </div>
      </div>
      <div className="bigword" aria-hidden="true">
        mnemo
      </div>
    </footer>
  )
}
