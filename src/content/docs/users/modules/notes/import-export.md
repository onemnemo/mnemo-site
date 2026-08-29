---
title: Import and export
description: Moving notes in and out as packages or markdown files.
order: 12
---

Notes leave Mnemo in two formats and come back in the same two. Import is the **Import notes** button in the notes sidebar header; export is the **Export** item in a note's menu. PDF has its own dialog, covered in [Export to PDF](./pdf-export.md).

## The formats

| Format                   | Best for                                                     |
| ------------------------ | ------------------------------------------------------------ |
| Mnemo Package (`.mnemo`) | Full fidelity: notes, folders, and images, re-importable     |
| Markdown (`.md`)         | One note as portable text any other editor can open          |

A package carries any number of notes plus the folders around them; markdown is one note per file, since a `.md` file has no id and no place to record its folder. There is no CSV or third-party format yet.

## Importing

Five files is the cap on one batch, and one file can be up to 512 MB. `Ctrl+Enter` confirms the dialog (`Cmd+Enter` on macOS).

<!-- image idea: the note import dialog with two queued files, one of them rejected -->

**If a note already exists** sets the policy for the whole batch: **Keep both**, the default, gives the incoming note a `(2)` suffix and overwrites nothing; **Skip** leaves what you already have; **Replace** overwrites it. What counts as the same note differs by format: a package matches on the note's id, and markdown matches on title, ignoring case. A markdown note is titled after its file name, not after any heading inside it, so rename the file first when the title matters.

## What markdown loses

Headings, bullet, numbered, and checklist items, quotes, callouts, code blocks, dividers, equations, and tables all serialize out and read back as themselves. Three things do not make the trip cleanly:

- **Images are dropped.** An image block has nothing markdown can carry.
- **Column layouts flatten.** They become a plain run of blocks, because the separator that would mark the split reads back as a divider.
- **Sketches and sub-page references travel only between copies of Mnemo.** A sketch goes out in a fenced `sketch` block and a sub-page as a `[[page:id]]` marker; both return intact here and mean nothing to another editor.

Export to `.mnemo` when you want the note back exactly as it left.

## Related

- [Export to PDF](./pdf-export.md) for a printable copy rather than a re-importable one.
- [Images](./images.md) for what markdown export leaves behind.
