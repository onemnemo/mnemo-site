import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, type NavLink } from '../../content/navigation'
import { GITHUB_URL } from '../../lib/site'
import { Icon } from '../Icon'
import { SmartLink } from '../SmartLink'

export interface NavProps {
  /** Glass over the hero when false, page coloured when true. */
  solid: boolean
  current?: NavLink['id']
  logoHref: string
  downloadHref: string
  downloadClass?: 'pill-light' | 'pill-solid'
}

export function Nav({
  solid,
  current,
  logoHref,
  downloadHref,
  downloadClass = 'pill-light',
}: NavProps) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => innerWidth > 820 && setOpen(false)
    document.addEventListener('click', onClick)
    addEventListener('keydown', onKey)
    addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('click', onClick)
      removeEventListener('keydown', onKey)
      removeEventListener('resize', onResize)
    }
  }, [open])

  const linkProps = (l: NavLink) => ({
    href: l.id === 'home' ? logoHref : l.href,
    'aria-current': l.id === current ? ('page' as const) : undefined,
  })

  return (
    <nav ref={navRef} className={solid ? 'nav solid' : 'nav'} id="nav" aria-label="Main">
      <div className="in">
        <SmartLink href={logoHref} className="logo" aria-label="Mnemo home" />
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <SmartLink {...linkProps(l)}>{l.label}</SmartLink>
            </li>
          ))}
        </ul>
        <div className="act">
          <a className="gh" href={GITHUB_URL} aria-label="Mnemo on GitHub">
            <Icon name="gh" />
          </a>
          <SmartLink className={`pill ${downloadClass}`} href={downloadHref}>
            <Icon name="dl" />
            Download
          </SmartLink>
          <button
            className="burger"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div
        className={open ? 'menu open' : 'menu'}
        id="menu"
        onClick={(e) => (e.target as Element).closest('a') && setOpen(false)}
      >
        {NAV_LINKS.map((l) => (
          <SmartLink key={l.id} {...linkProps(l)}>
            {l.label}
          </SmartLink>
        ))}
        <a href={GITHUB_URL}>
          GitHub
          <Icon name="gh" />
        </a>
      </div>
    </nav>
  )
}
