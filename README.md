# Mnemo website

The marketing site and documentation for [Mnemo](https://mnemo.one), a free,
open-source, local-first learning platform. The desktop app itself lives in
[onemnemo/mnemo](https://github.com/onemnemo/mnemo).

Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4.

## Requirements

Node 22.12 or newer. Older majors fail to build.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve a production build                      |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | `tsc --noEmit`                                |

## Layout

```
src/app/         Routes, metadata, sitemap, share card
src/components/  UI, split by section and by feature area
src/content/docs Documentation pages, authored in Markdown
src/config/      Site-wide constants: nav, URLs, SEO strings
src/lib/         Markdown pipeline and docs indexing
scripts/         Asset processing
assets/fonts/    TTFs the share card needs at build time
```

Site-wide strings (navigation, titles, meta descriptions, external links) come
from `src/config/site.ts`, so the SEO layer and the UI never drift apart.

## Documentation content

Docs pages are Markdown files under `src/content/docs`, compiled through
unified/remark/rehype with Shiki for syntax highlighting. Images and other files
referenced by those pages are served through the `/docs-assets` route.

## Assets

`scripts/process-assets.mjs` derives the site's image variants from the sources
in `assets/`. Run it after changing a source image:

```bash
node scripts/process-assets.mjs
```
