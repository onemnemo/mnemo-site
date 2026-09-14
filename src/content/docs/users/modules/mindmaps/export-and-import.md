---
title: Export and import
description: Pictures, outlines, and the package format that imports back.
order: 5
---

A map exports as a picture, an outline, or a Mnemo package. Only the package can be imported again.

## Formats

| Format                   | Best for                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| PNG (`.png`)             | A picture of the map as it looks on screen                            |
| SVG (`.svg`)             | The same picture as vectors, for scaling or editing elsewhere         |
| Markdown (`.md`)         | The whole map as a nested outline                                     |
| Mnemo Package (`.mnemo`) | Backup and transfer: maps, folders, images, and styles, re-importable |

## Pictures and outlines

**Export** on the map toolbar holds PNG, SVG, and Markdown.

PNG and SVG show the map as it is on screen, so collapsed branches are left out. Images are embedded in both; fonts are embedded only in the PNG.

The outline ignores collapse state and styling and includes everything: the title as a heading, each tree as a nested list, loose elements and frames in their own sections, and links between branches as footnotes.

## Packages

Export one map with **Export** on its card menu in the library, or the whole library with **Transfer** in the library header. **Transfer** also imports: drop up to five files onto the dialog or browse for them. `Ctrl+Enter` confirms (`Cmd+Enter` on macOS).

If a map already exists, choose what happens: **Keep both** adds a suffix to the incoming map, **Skip** leaves yours, and **Replace** overwrites it. Replace requires ticking a confirmation checkbox before it runs.

<!-- image idea: the mindmap transfer dialog on its export side with the .mnemo tile selected -->

## Related

- [The map library](./library.md) covers the library that **Transfer** restores into.
- [Flashcards import and export](../flashcards/import-and-export.md) covers the same package format for decks.
