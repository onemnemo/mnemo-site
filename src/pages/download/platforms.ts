import type { IconName } from '../../components/Icon'
import { LATEST_RELEASE_URL } from '../../lib/site'
import type { SilkName } from '../../lib/webgl/palettes'

export type Os = 'win' | 'mac' | 'linux'

const asset = (file: string) => `${LATEST_RELEASE_URL}/download/${file}`

export interface Platform {
  os: Os
  name: string
  icon: IconName
  field: SilkName
  seed: number
  body: string
  downloads: { label: string; href: string; soft?: boolean }[]
}

export const PLATFORMS: Platform[] = [
  {
    os: 'win',
    name: 'Windows',
    icon: 'win',
    field: 'sky',
    seed: 12,
    body: 'Run the .exe installer to set up. Made for Windows 10 and 11.',
    downloads: [
      { label: 'Download .exe', href: asset('Mnemo.Desktop.V2-win-x64-stable-Setup.exe') },
    ],
  },
  {
    os: 'mac',
    name: 'macOS',
    icon: 'mac',
    field: 'sunset',
    seed: 27,
    body: 'Standard .pkg installer for Apple silicon Macs, M1 and newer.',
    downloads: [
      { label: 'Download .pkg', href: asset('Mnemo.Desktop.V2-osx-arm64-stable-Setup.pkg') },
    ],
  },
  {
    os: 'linux',
    name: 'Linux',
    icon: 'linux',
    field: 'meadow',
    seed: 41,
    body: 'Universal AppImage for most distros, or a portable .tar.gz if you prefer to unpack it yourself.',
    downloads: [
      { label: 'AppImage', href: asset('Mnemo.Desktop.V2-linux-x64-stable.AppImage') },
      { label: '.tar.gz', href: asset('Mnemo-Portable-linux-x64.tar.gz'), soft: true },
    ],
  },
]

export const AFTER_INSTALL: {
  title: string
  body: string
  icon: IconName
  field: SilkName
  seed: number
  link: { label: string; href: string }
}[] = [
  {
    title: 'Find your way around',
    body: 'The guide walks you through your first note, mind map and deck, plus the shortcuts that save the most time.',
    icon: 'book',
    field: 'sea',
    seed: 63,
    link: { label: 'Read the guide', href: '/docs/users/getting-started' },
  },
  {
    title: 'Bring your old notes',
    body: 'Mnemo imports Anki decks and Markdown, from a single note to a whole folder. For Notion, use our small converter.',
    icon: 'import',
    field: 'rose',
    seed: 71,
    link: { label: 'How importing works', href: '/docs/users/importing' },
  },
  {
    title: 'On a tablet or phone?',
    body: 'Android tablets are next and getting close, with phones planned after that. Mobile is actively in the works.',
    icon: 'tablet',
    field: 'dawn',
    seed: 84,
    link: { label: 'What comes next', href: '/#next' },
  },
]
