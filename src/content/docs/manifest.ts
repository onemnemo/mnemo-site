// Generated from the static docs in web/docs. Article bodies live beside this file as HTML.
import type { DocGroup, DocGroupNav, DocPageMeta } from './types'

export const DOC_NAV: Record<DocGroup, DocGroupNav> = {
  users: {
    label: 'User guide',
    entries: [
      {
        href: '/docs/users/getting-started/',
        title: 'Getting started',
        sections: [
          {
            id: 'install',
            title: 'Install Mnemo',
          },
          {
            id: 'first-note',
            title: 'Your first note',
          },
          {
            id: 'first-map',
            title: 'Your first mind map',
          },
          {
            id: 'first-deck',
            title: 'Your first deck',
          },
          {
            id: 'shortcuts',
            title: 'Shortcuts worth learning',
          },
        ],
      },
      {
        href: '/docs/users/finding/',
        title: 'Finding things',
        sections: [
          {
            id: 'palette',
            title: 'The command palette',
          },
          {
            id: 'notes',
            title: 'Inside your notes',
          },
          {
            id: 'peek',
            title: 'The side peek',
          },
        ],
      },
      {
        sep: true,
      },
      {
        href: '/docs/users/notes/',
        title: 'Notes',
        sections: [
          {
            id: 'blocks',
            title: 'Blocks',
          },
          {
            id: 'formatting',
            title: 'Formatting',
          },
          {
            id: 'organising',
            title: 'Staying organised',
          },
          {
            id: 'saving',
            title: 'Saving',
          },
          {
            id: 'export',
            title: 'Exporting',
          },
        ],
      },
      {
        href: '/docs/users/mind-maps/',
        title: 'Mind maps',
        sections: [
          {
            id: 'start',
            title: 'Start a map',
          },
          {
            id: 'keyboard',
            title: 'Build it from the keyboard',
          },
          {
            id: 'tools',
            title: 'Tools',
          },
          {
            id: 'export',
            title: 'Exporting',
          },
        ],
      },
      {
        href: '/docs/users/flashcards/',
        title: 'Flashcards',
        sections: [
          {
            id: 'decks',
            title: 'Decks',
          },
          {
            id: 'writing',
            title: 'Writing cards',
          },
          {
            id: 'library',
            title: 'Keeping the library tidy',
          },
        ],
      },
      {
        href: '/docs/users/reviews/',
        title: 'Reviews and scheduling',
        sections: [
          {
            id: 'modes',
            title: 'Three ways to study',
          },
          {
            id: 'keys',
            title: 'Keys in a review',
          },
          {
            id: 'grades',
            title: 'The four grades',
          },
          {
            id: 'steps',
            title: 'New cards and leeches',
          },
          {
            id: 'limits',
            title: 'Daily limits',
          },
          {
            id: 'settings',
            title: 'Review settings',
          },
        ],
      },
      {
        sep: true,
      },
      {
        href: '/docs/users/importing/',
        title: 'Importing',
        sections: [
          {
            id: 'anki',
            title: 'From Anki',
          },
          {
            id: 'markdown',
            title: 'From Markdown',
          },
          {
            id: 'notion',
            title: 'From Notion',
          },
          {
            id: 'conflicts',
            title: 'When something already exists',
          },
        ],
      },
      {
        href: '/docs/users/backups/',
        title: 'Backups and trash',
        sections: [
          {
            id: 'backup',
            title: 'Make a backup',
          },
          {
            id: 'folder',
            title: 'Where your data lives',
          },
          {
            id: 'trash',
            title: 'Deleted something?',
          },
        ],
      },
      {
        href: '/docs/users/settings/',
        title: 'Make it yours',
        sections: [
          {
            id: 'look',
            title: 'Look and feel',
          },
          {
            id: 'updates',
            title: 'Updates',
          },
          {
            id: 'translate',
            title: 'Help translate',
          },
        ],
      },
    ],
    other: {
      href: '/docs/developers/getting-started/',
      title: 'Developer guide',
    },
  },
  developers: {
    label: 'Developer guide',
    entries: [
      {
        href: '/docs/developers/getting-started/',
        title: 'Local development',
        sections: [
          {
            id: 'prereq',
            title: 'What you need',
          },
          {
            id: 'clone',
            title: 'Clone and restore',
          },
          {
            id: 'run',
            title: 'Run a development build',
          },
          {
            id: 'data',
            title: 'Keep your real library safe',
          },
          {
            id: 'tests',
            title: 'Run the tests',
          },
        ],
      },
      {
        sep: true,
      },
      {
        href: '/docs/developers/architecture/',
        title: 'Architecture',
        sections: [
          {
            id: 'layers',
            title: 'The layers',
          },
          {
            id: 'api',
            title: 'The local API',
          },
          {
            id: 'data',
            title: 'Where data lives',
          },
        ],
      },
      {
        href: '/docs/developers/web-frontend/',
        title: 'Web frontend',
        sections: [
          {
            id: 'shape',
            title: 'The shape of mnemo-web',
          },
          {
            id: 'rules',
            title: 'House rules',
          },
          {
            id: 'primitives',
            title: 'Shared pieces',
          },
        ],
      },
      {
        sep: true,
      },
      {
        href: '/docs/developers/contributing/',
        title: 'Contributing',
        sections: [
          {
            id: 'start',
            title: 'Find something to work on',
          },
          {
            id: 'standard',
            title: 'The coding standard',
          },
          {
            id: 'commits',
            title: 'Commits',
          },
          {
            id: 'prs',
            title: 'Pull requests',
          },
        ],
      },
    ],
    other: {
      href: '/docs/users/getting-started/',
      title: 'User guide',
    },
  },
}

export const DOC_PAGES: DocPageMeta[] = [
  {
    group: 'users',
    slug: 'backups',
    title: 'Backups and trash',
    docTitle: 'Backups and trash | Mnemo docs',
    description: 'Keep a copy of your library and get back what you deleted.',
    sub: 'Keep a copy of your library and get back what you deleted.',
    field: 'silk-sea',
    seed: 96,
    icon: 'box',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Backups%20and%20trash',
    prev: {
      href: '/docs/users/importing/',
      title: 'Importing',
    },
    next: {
      href: '/docs/users/settings/',
      title: 'Make it yours',
    },
  },
  {
    group: 'users',
    slug: 'finding',
    title: 'Finding things',
    docTitle: 'Finding things | Mnemo docs',
    description: 'Jump to any note, deck or action, and keep a second note open beside you.',
    sub: 'Jump to any note, deck or action, and keep a second note open beside you.',
    field: 'silk-sea',
    seed: 18,
    icon: 'search',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Finding%20things',
    prev: {
      href: '/docs/users/getting-started/',
      title: 'Getting started',
    },
    next: {
      href: '/docs/users/notes/',
      title: 'Notes',
    },
  },
  {
    group: 'users',
    slug: 'flashcards',
    title: 'Flashcards',
    docTitle: 'Flashcards | Mnemo docs',
    description: 'Write cards that stick, study them and let FSRS plan your reviews.',
    sub: 'Write cards that stick, study them and let FSRS plan your reviews.',
    field: 'silk-sea',
    seed: 57,
    icon: 'cards',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Flashcards',
    prev: {
      href: '/docs/users/mind-maps/',
      title: 'Mind maps',
    },
    next: {
      href: '/docs/users/reviews/',
      title: 'Reviews and scheduling',
    },
  },
  {
    group: 'users',
    slug: 'getting-started',
    title: 'Getting started',
    docTitle: 'Getting started | Mnemo docs',
    description: 'Install Mnemo, then make your first note, mind map and deck.',
    sub: 'Install Mnemo, then make your first note, mind map and deck.',
    field: 'silk-sea',
    seed: 5,
    icon: 'book',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Getting%20started',
    prev: null,
    next: {
      href: '/docs/users/finding/',
      title: 'Finding things',
    },
  },
  {
    group: 'users',
    slug: 'importing',
    title: 'Importing',
    docTitle: 'Importing | Mnemo docs',
    description: 'Bring your Anki decks, Markdown notes and Notion pages with you.',
    sub: 'Bring your Anki decks, Markdown notes and Notion pages with you.',
    field: 'silk-sea',
    seed: 83,
    icon: 'import',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Importing',
    prev: {
      href: '/docs/users/reviews/',
      title: 'Reviews and scheduling',
    },
    next: {
      href: '/docs/users/backups/',
      title: 'Backups and trash',
    },
  },
  {
    group: 'users',
    slug: 'mind-maps',
    title: 'Mind maps',
    docTitle: 'Mind maps | Mnemo docs',
    description: 'Grow a map from one idea, mostly from the keyboard.',
    sub: 'Grow a map from one idea, mostly from the keyboard.',
    field: 'silk-sea',
    seed: 44,
    icon: 'map',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Mind%20maps',
    prev: {
      href: '/docs/users/notes/',
      title: 'Notes',
    },
    next: {
      href: '/docs/users/flashcards/',
      title: 'Flashcards',
    },
  },
  {
    group: 'users',
    slug: 'notes',
    title: 'Notes',
    docTitle: 'Notes | Mnemo docs',
    description: 'Write in blocks, format as you type and keep everything tidy.',
    sub: 'Write in blocks, format as you type and keep everything tidy.',
    field: 'silk-sea',
    seed: 31,
    icon: 'note',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Notes',
    prev: {
      href: '/docs/users/finding/',
      title: 'Finding things',
    },
    next: {
      href: '/docs/users/mind-maps/',
      title: 'Mind maps',
    },
  },
  {
    group: 'users',
    slug: 'reviews',
    title: 'Reviews and scheduling',
    docTitle: 'Reviews and scheduling | Mnemo docs',
    description: 'Study your cards, and let FSRS decide when you see each one again.',
    sub: 'Study your cards, and let FSRS decide when you see each one again.',
    field: 'silk-sea',
    seed: 70,
    icon: 'cycle',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Reviews%20and%20scheduling',
    prev: {
      href: '/docs/users/flashcards/',
      title: 'Flashcards',
    },
    next: {
      href: '/docs/users/importing/',
      title: 'Importing',
    },
  },
  {
    group: 'users',
    slug: 'settings',
    title: 'Make it yours',
    docTitle: 'Make it yours | Mnemo docs',
    description: 'Themes, language, shortcuts and the rest of Settings.',
    sub: 'Themes, language, shortcuts and the rest of Settings.',
    field: 'silk-sea',
    seed: 109,
    icon: 'sliders',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Make%20it%20yours',
    prev: {
      href: '/docs/users/backups/',
      title: 'Backups and trash',
    },
    next: null,
  },
  {
    group: 'developers',
    slug: 'architecture',
    title: 'Architecture',
    docTitle: 'Architecture | Mnemo docs',
    description:
      'How the codebase is layered, how the UI talks to the backend and where data lives.',
    sub: 'How the codebase is layered, how the UI talks to the backend and where data lives.',
    field: 'silk-dawn',
    seed: 135,
    icon: 'layers',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Architecture',
    prev: {
      href: '/docs/developers/getting-started/',
      title: 'Local development',
    },
    next: {
      href: '/docs/developers/web-frontend/',
      title: 'Web frontend',
    },
  },
  {
    group: 'developers',
    slug: 'contributing',
    title: 'Contributing',
    docTitle: 'Contributing | Mnemo docs',
    description: 'From a first issue to a merged pull request.',
    sub: 'From a first issue to a merged pull request.',
    field: 'silk-dawn',
    seed: 161,
    icon: 'branch',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Contributing',
    prev: {
      href: '/docs/developers/web-frontend/',
      title: 'Web frontend',
    },
    next: null,
  },
  {
    group: 'developers',
    slug: 'getting-started',
    title: 'Local development',
    docTitle: 'Local development | Mnemo docs',
    description: 'Go from a fresh clone to a running development build.',
    sub: 'Go from a fresh clone to a running development build.',
    field: 'silk-dawn',
    seed: 122,
    icon: 'term',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Local%20development',
    prev: null,
    next: {
      href: '/docs/developers/architecture/',
      title: 'Architecture',
    },
  },
  {
    group: 'developers',
    slug: 'web-frontend',
    title: 'Web frontend',
    docTitle: 'Web frontend | Mnemo docs',
    description: 'How mnemo-web is organised, and the shared pieces every screen uses.',
    sub: 'How mnemo-web is organised, and the shared pieces every screen uses.',
    field: 'silk-dawn',
    seed: 148,
    icon: 'code',
    help: 'https://github.com/onemnemo/mnemo/issues/new?title=Docs%3A%20Web%20frontend',
    prev: {
      href: '/docs/developers/architecture/',
      title: 'Architecture',
    },
    next: {
      href: '/docs/developers/contributing/',
      title: 'Contributing',
    },
  },
]
