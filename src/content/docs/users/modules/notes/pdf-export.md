---
title: Export to PDF
description: Page setup, what to include, and what does not print.
order: 11
---

**Export as PDF** is in the note's actions menu. `Ctrl+Enter` exports from anywhere in the dialog (`Cmd+Enter` on macOS).

## Page setup

| Setting        | Choices                                                           |
| -------------- | ----------------------------------------------------------------- |
| Paper          | A4, Letter, Legal, A5                                             |
| Orientation    | Portrait, Landscape                                               |
| Margins        | Narrow (12.7 mm), Normal (20 mm), Wide (31.8 mm)                  |
| Body text size | Small (10 pt), Medium (11 pt), Large (12 pt), Extra large (14 pt) |
| Page numbers   | None, Left, Centered, Right                                       |
| Number style   | `x`, `x / y`, "Page x of y"                                       |

The dialog always opens with A4, portrait, Normal margins, Medium text, and centered `x / y` page numbers.

<!-- image idea: the PDF export dialog with the page setup rail beside a two-page preview -->

## What to include

Five switches, all on by default: **Note title**, **Tags**, **Highlights & colors**, **Images & figures**, and **Sub-page links**. Turning images off also drops sketches.

## What does not print

- **Per-cell table colors.** Header row and column shading is kept.
- **Emoji.** They are left out of the document.
- **Sub-page content.** Sub-pages print as their titles only. Export a sub-page separately if you need it.
- **Images whose file cannot be read.** Their alt text prints in italics instead.

## Related

- [Import and export](./import-export.md) covers formats that can be imported back.
- [Tables](./tables.md) covers header shading and column widths.
