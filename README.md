# mnemo-site

Source for the Mnemo website. It is plain HTML, CSS and a small script, with no build step.

- `index.html`, `download.html`, `roadmap.html`, `privacy.html`: main pages
- `docs/`: user and developer guides, one folder per page
- `site.css`, `site.js`: shared styles and behaviour
- `docs/docs.css`, `docs/docs.js`: docs layout and search (`docs/search.json`)
- `shots-v2/`: app screenshots, light and dark

## Preview locally

```sh
python -m http.server 8173
```

Then open http://localhost:8173. Docs links use root paths, so serve from the repository root.

## Updating screenshots

Screenshots keep the same file names between reshoots. After replacing them, bump the `?v=` tag on the image URLs so browsers fetch the new files.

## Deploying

Vercel serves the repository root as static files (`vercel.json`). `cleanUrls` serves `/download` from `download.html`.
