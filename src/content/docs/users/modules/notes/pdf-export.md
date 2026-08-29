---
title: Export to PDF
description: Page setup, what to include, and what does not make it onto paper.
order: 11
---

A PDF is the copy of a note you hand to someone who does not run Mnemo: a fixed layout that prints. **Export as PDF** sits in the note pane's actions menu, and `Ctrl+Enter` saves from anywhere in the dialog (`Cmd+Enter` on macOS).

## Page setup

| Setting        | Choices                                                           |
| -------------- | ----------------------------------------------------------------- |
| Paper          | A4, Letter, Legal, A5                                             |
| Orientation    | Portrait, Landscape                                               |
| Margins        | Narrow (12.7 mm), Normal (20 mm), Wide (31.8 mm)                  |
| Body text size | Small (10 pt), Medium (11 pt), Large (12 pt), Extra large (14 pt) |
| Page numbers   | None, Left, Centered, Right                                       |
| Number style   | `x`, `x / y`, "Page x of y"                                       |

The dialog opens on A4, portrait, Normal margins, Medium text, and centered `x / y` numbering every time.

<!-- image idea: the PDF export dialog with the page setup rail beside a two-page preview -->

## What to include

Five switches, all on: **Note title**, **Tags**, **Highlights & colors**, **Images & figures**, and **Sub-page links**. Turning images off drops every picture and sketch, the quickest way to shorten a long note.

## What does not make it onto paper

Blocks keep their formatting, with four exceptions:

- **Per-cell table tints are dropped.** Header rows and columns keep their shading.
- **Emoji do not print.** The document uses Mnemo's bundled fonts rather than whatever is installed on your machine, and those fonts carry no emoji.
- **Sub-page content does not come along.** Sub-page rows print as titles; export a sub-page separately when you need it.
- **An image whose file cannot be read prints its alt text.** It appears in italics rather than failing the document.

## Related

- [Import and export](./import-export.md) for the formats that come back in again.
- [Tables](./tables.md) for the header shading and column widths that survive the trip.
