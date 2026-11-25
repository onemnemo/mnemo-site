import { GITHUB_URL, ISSUES_URL, RELEASES_URL } from '../lib/site'

export interface NavLink {
  id: 'home' | 'features' | 'how' | 'science' | 'faq' | 'roadmap' | 'docs'
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'features', label: 'Features', href: '/#tools' },
  { id: 'science', label: 'Science', href: '/#science' },
  { id: 'roadmap', label: 'Roadmap', href: '/roadmap' },
  { id: 'docs', label: 'Docs', href: '/docs' },
]

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Features',
    links: [
      { label: 'Notes', href: '/#tools' },
      { label: 'Mind maps', href: '/#tools' },
      { label: 'Flashcards', href: '/#curve' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Download',
    links: [
      { label: 'Windows', href: '/download#platforms' },
      { label: 'macOS', href: '/download#platforms' },
      { label: 'Linux', href: '/download#platforms' },
      { label: 'Release notes', href: RELEASES_URL },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'The science', href: 'https://mnemo.one/science' },
      { label: 'Our story', href: 'https://mnemo.one/story' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'Reddit', href: 'https://www.reddit.com/r/justmnemo/' },
      { label: 'Report a bug', href: ISSUES_URL },
      { label: 'Contributing', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md` },
    ],
  },
]
