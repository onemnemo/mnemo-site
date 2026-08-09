# Fonts for the share card

These three files exist only so `src/app/opengraph-image.tsx` can render
text at build time. The site itself does not load them: pages get their
type from `next/font/google`, which downloads and self-hosts its own
copies (see `src/app/layout.tsx`).

The duplication is unavoidable. Satori, the renderer behind
`ImageResponse`, needs real font buffers passed to it and cannot reach
into the `next/font` pipeline, nor can it read the WOFF2 files that
pipeline emits. It wants TTF or OTF handed over directly.

| File                    | Family   | Weight |
| ----------------------- | -------- | ------ |
| `Fraunces-SemiBold.ttf` | Fraunces | 600    |
| `Geist-Regular.ttf`     | Geist    | 400    |
| `Geist-Medium.ttf`      | Geist    | 500    |

Both families are licensed under the SIL Open Font License 1.1, which
permits bundling them in a project like this one. They were fetched from
Google Fonts; the same versions the site already serves.

If the brand ever changes typeface, replace these files and update the
`fonts` array in `src/app/opengraph-image.tsx` to match.
