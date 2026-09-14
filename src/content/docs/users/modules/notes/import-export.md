---
title: Import and export
description: Moving notes in and out as packages or markdown.
order: 12
---

Notes import and export in two formats. **Import notes** is in the notes sidebar header, and **Export** is on a note's menu. PDF has its own dialog; see [Export to PDF](./pdf-export.md).

## Formats

| Format                   | Best for                                                 |
| ------------------------ | -------------------------------------------------------- |
| Mnemo Package (`.mnemo`) | Full fidelity: notes, folders, and images, re-importable |
| Markdown (`.md`)         | One note as plain text any editor can open               |

A package holds any number of notes and their folders. Markdown is one note per file. There is no CSV or third-party format yet.

## Importing

Import up to five files at a time. `Ctrl+Enter` confirms (`Cmd+Enter` on macOS).

<!-- image idea: the note import dialog with two queued files, one of them rejected -->

**Import notes** in the sidebar header imports into the top level. To import markdown into a folder, right-click the folder and choose **Import notes here**. A package always restores its own folders, whatever the destination.

**If a note already exists** sets the policy for the batch. **Keep both** (the default) adds a `(2)` suffix to the incoming note. **Skip** keeps yours. **Replace** overwrites it. A package matches existing notes by id; markdown matches by title, ignoring case. A markdown note takes its title from the file name, not from a heading inside it, so rename the file first if the title matters.

## What markdown loses

Headings, lists, checklists, quotes, callouts, code blocks, dividers, equations, and tables round-trip through markdown. Three things do not:

- **Images are dropped.**
- **Column layouts flatten** into a single run of blocks.
- **Sketches and sub-page links only survive between copies of Mnemo.** Other editors show them as raw markers.

Export as `.mnemo` when the note needs to come back exactly as it left.

## Related

- [Export to PDF](./pdf-export.md) covers a printable copy.
- [Images](./images.md) covers what markdown export leaves behind.
