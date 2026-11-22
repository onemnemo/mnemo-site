# Mnemo website

The Mnemo marketing site and docs, ported from the static pages in `../web` to Vite, React and TypeScript.

## Develop

```sh
npm install
npm run dev        # http://localhost:5175
npm run lint       # ESLint
npm run format     # Prettier
```

## Build

```sh
npm run build      # type checks, then writes static files to dist/
npm run preview    # serves dist/ locally
```

## Deploy

`dist/` is a static single page app. Upload it to any static host and send unknown paths to
`index.html`, so `/download` and `/docs/...` load the app:

The host isn't chosen yet, so both common setups ship in the repo:

- Netlify: `public/_redirects` (copied into `dist/`) handles it.
- Vercel: `vercel.json` rewrites everything else to `/index.html`. Real files are served first.
- nginx or any other host: `try_files $uri /index.html;` or its equivalent.

Delete whichever file the chosen host doesn't use.

### Account pages

`/login`, `/account` and `/admin` are designs with sample data. They are only included in
`npm run dev`. A production build leaves them out and those paths show the 404 page. To
include them in a build, set `VITE_ENABLE_ACCOUNTS=true`.

### Domain

Set `SITE_URL` in `src/lib/site.ts` once the domain is final, then add `og:image`, `og:url`
and a canonical link to `index.html` (they need absolute URLs).

## Layout

- `src/pages`: one folder per route (home, download, docs) plus the 404 page.
- `src/components`: shared pieces (page shell, nav, footer, fields, reveals, icons).
- `src/hooks`: `useReveal`, `useInView`, `useReducedMotion`, `useScrollFrame` and friends.
- `src/lib`: framework free code. `lib/webgl` holds the shaders, palettes, the earth LUT and
  the shared WebGL helper; `lib/site.ts` holds URLs. New shared logic (auth, sync) goes here.
- `src/content`: copy and data (FAQ, tools, navigation) and the docs articles, which were
  extracted from `../web/docs`.
- `src/styles`: the original CSS. `base.css` is shared; each page file is wrapped in
  `:where(.p-<page>)` so it applies only to its own route without changing specificity.
