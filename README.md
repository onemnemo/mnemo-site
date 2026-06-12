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

## Documentation pages

Docs live under `/docs`, split into a Students section and a Developers section. There is no separate docs landing page: `/docs` redirects to `/docs/students`, and the sidebar tabs switch between the two sections. Pages are plain markdown files in `src/content/docs/` rendered through Astro Content Collections, with full text search powered by [Pagefind](https://pagefind.app).

### Adding a doc page

Create a `.md` file under `src/content/docs/students/` or `src/content/docs/developers/`. The folder decides the section, the file path decides the URL (`students/notes/sketch.md` becomes `/docs/students/notes/sketch`), and the sidebar builds itself. Frontmatter:

```yaml
---
title: Page title          # required, heading and sidebar label
description: One sentence. # optional, meta tags and landing page
category: Modules          # optional sidebar group, defaults to "Overview"
order: 10                  # optional sort key, lowest first
draft: true                # optional, hides the page
---
```

Categories are ordered by the lowest `order` value they contain, so give each category its own number range (Start here 0 to 9, Modules 10 to 19, and so on). A `index.md` inside a section folder becomes that section's landing page. See `src/content/docs/_TEMPLATE.md` for a copyable starting point; files starting with an underscore are ignored.

### Search

`npm run build` runs `pagefind --site dist` after the Astro build and writes the search index to `dist/pagefind/`. Only pages marked with `data-pagefind-body` (the doc pages) are indexed. Search is unavailable under `npm run dev` since the index only exists in built output; use `npm run build && npm run preview` to test it. Open it with the sidebar button or Ctrl K / Cmd K.

## How it works

- **Pages** live in `src/pages/`: home, download, science, roadmap, developers, FAQ, 404, and the docs routes in `src/pages/docs/`.
- **No client framework.** Everything is static Astro components with small inline scripts: platform detection for download buttons, the theme toggle, the mobile nav, scroll reveals, and the docs search modal.
- **Download links** use GitHub's `releases/latest/download/` redirect with version-free asset filenames, so they always point at the newest release without rebuilding the site.
- **GitHub stars and the latest version number** are fetched at build time (`src/lib/github.ts`) with static fallbacks, so builds succeed offline or when rate limited.
- **SEO**: per page titles and descriptions, canonical URLs, Open Graph tags, `sitemap-index.xml` via `@astrojs/sitemap`, and `public/robots.txt`.
- **Dark mode** follows the system preference and can be toggled manually. The choice is stored in `localStorage`.

## Content notes

Platform messaging is deliberate: Windows is stable and recommended, Linux is partly experimental, macOS is highly experimental. Keep that honesty when editing copy. Release facts on the roadmap page reference the latest release; update them when a new version ships.
