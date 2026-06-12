# Mnemo website

The marketing site for [Mnemo](https://github.com/onemnemo/mnemo), a free, open source, offline first study app. Built with [Astro](https://astro.build) and TypeScript, deployed as fully static output for [mnemo.one](https://mnemo.one).

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build
```

Static output is written to `dist/`. Deploy that folder to any static host. Preview the production build locally with:

```bash
npm run preview
```

Type checking:

```bash
npm run check
```

## How it works

- **Pages** live in `src/pages/`: home, download, science, roadmap, developers, FAQ, and 404.
- **No client framework.** Everything is static Astro components with three small inline scripts: platform detection for download buttons, the theme toggle, and the mobile nav.
- **Download links** use GitHub's `releases/latest/download/` redirect with version-free asset filenames, so they always point at the newest release without rebuilding the site.
- **GitHub stars and the latest version number** are fetched at build time (`src/lib/github.ts`) with static fallbacks, so builds succeed offline or when rate limited.
- **SEO**: per page titles and descriptions, canonical URLs, Open Graph tags, `sitemap-index.xml` via `@astrojs/sitemap`, and `public/robots.txt`.
- **Dark mode** follows the system preference and can be toggled manually. The choice is stored in `localStorage`.

## Content notes

Platform messaging is deliberate: Windows is stable and recommended, Linux is partly experimental, macOS is highly experimental. Keep that honesty when editing copy. Release facts on the roadmap page reference the latest release; update them when a new version ships.
