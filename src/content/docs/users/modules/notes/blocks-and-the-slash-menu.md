---
title: Blocks and the slash menu
description: Every block type, the / menu, and the markdown shortcuts that build structure as you type.
order: 2
---

A note in Mnemo is a stack of blocks: every line has a type, and structure appears when you ask for it, either through the slash menu or by typing markdown.

## The slash menu

Type `/` at the start of a block and keep typing to filter. The search is forgiving about case and accents, and the English names work even if the app is set to another language.

<!-- image idea: the slash menu open with a few results filtered -->

## The block types

| Block          | What it is for                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Text           | The default paragraph.                                                                                        |
| Heading 1 to 4 | The skeleton of the note. Headings also feed the note's Index outline.                                        |
| Bullet List    | Unordered points.                                                                                             |
| Numbered List  | Ordered points; the numbers renumber themselves when you move things.                                         |
| To-do          | A checklist item with a real checkbox.                                                                        |
| Quote          | Material in someone else's words, so your own stay distinct.                                                  |
| Callout        | A tinted aside for something that should stand out. Click the glyph to change its emoji.                      |
| Warning        | The same aside in a cautioning tone, with the same clickable glyph.                                           |
| Code           | Monospaced, with a language picker that drives syntax highlighting. Opens set to C#.                          |
| Divider        | A horizontal rule.                                                                                            |
| Two columns    | Splits the row into two side-by-side stacks with a draggable divider.                                         |
| Image          | A picture with an optional caption. See [Images in notes](./images.md).                                       |
| Table          | A grid of rows and columns. See [Tables](./tables.md).                                                        |
| Equation       | A block of LaTeX math, rendered in place.                                                                     |
| Page           | Creates a nested note and links to it. The row shows that note's current title, so a rename never goes stale. |

## Markdown shortcuts

At the start of a text block, type the marker and a space:

| Type              | Get                |
| ----------------- | ------------------ |
| `#` to `####`     | Heading 1 to 4     |
| `-`, `*`, or `+`  | Bullet list item   |
| `1.` (any number) | Numbered list item |
| `[]`              | To-do item         |
| `>`               | Quote              |
| ` ``` `           | Code block         |
| `---`             | Divider            |

The list markers keep the rest of the line, so you can write the thought first and promote it to a bullet after. The others only fire on an otherwise empty line.

## Related

- [Formatting text](./formatting-text.md) for the marks inside a block.
- [Working with blocks](./working-with-blocks.md) for moving, converting, and selecting whole blocks.
