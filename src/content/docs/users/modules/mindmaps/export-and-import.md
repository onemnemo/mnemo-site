---
title: Export and import
description: Pictures, outlines, and the package format that comes back.
order: 5
---

A map leaves Mnemo in one of two ways, and the difference is whether it is coming back. A picture or an outline is a one-way copy for use elsewhere; a `.mnemo` package is the round trip.

## The formats

| Format                   | Best for                                                            |
| ------------------------ | ------------------------------------------------------------------- |
| PNG (`.png`)             | A picture of the map as it looks on screen                          |
| SVG (`.svg`)             | The same picture as vectors, for scaling or editing elsewhere       |
| Markdown (`.md`)         | The whole map as a nested outline, for a note or a document         |
| Mnemo Package (`.mnemo`) | Backup and transfer: maps, folders, images, and styles, re-importable |

Only the package comes back; nothing reads a PNG, an SVG, or an outline into the library again.

## Pictures and outlines

**Export** on the map toolbar holds those three. PNG and SVG are drawn from the map as it currently sits, so a collapsed branch is not in the picture. Images travel inside both files, but fonts travel only in the PNG: an `.svg` opened where Inter is not installed falls back to another face.

The outline is built from the stored document instead, so it ignores collapse state and styling and gives you the whole map: the title as a heading, each tree as a nested bullet list, loose elements and frames in sections of their own, and cross-links as numbered footnotes.

## Packages in and out

Export one map from **Export** in its menu in the library, or the whole library from **Transfer** in the library header. **Transfer** is also the way in: drop up to five files at a time onto the dialog, or browse for them.

Before confirming, say what happens when a map already exists: **Keep both** gives the incoming copy a suffix, **Skip** leaves yours untouched, and **Replace** overwrites it. `Ctrl+Enter` confirms the dialog (`Cmd+Enter` on macOS).

<!-- image idea: the mindmap transfer dialog on its export side with the .mnemo tile selected -->

## Related

- [The library](./library.md) holds **Transfer** and receives what an import restores.
- [Flashcards import and export](../flashcards/import-and-export.md) meets the same `.mnemo` package from the other side.
