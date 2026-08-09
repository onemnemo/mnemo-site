---
title: Blocks and the slash menu
description: Every block type, the / menu, and the markdown shortcuts that build structure as you type.
order: 2
---

A note in Mnemo is a stack of blocks. Every line is a block with a type: a paragraph, a heading, a list item, an image. Writing is mostly just typing text blocks, and structure appears when you ask for it, either through the slash menu or by typing markdown.

## The slash menu

Type `/` at the start of a block and a menu opens with everything the block can become. Keep typing to filter it: the search is forgiving about case and accents, `heading one` finds Heading 1, and the English names work even if the app is set to another language. Enter converts the block in place, arrow keys move the selection, and Escape closes the menu and leaves your text alone.

An empty block quietly reminds you this exists with the hint "Type '/' for commands".

<!-- image idea: the slash menu open with a few results filtered -->

## The block types

| Block          | What it is for                                                                      |
| -------------- | ----------------------------------------------------------------------------------- |
| Text           | The default paragraph. Everything starts here.                                      |
| Heading 1 to 4 | The skeleton of the note. Headings also feed the note's Index outline.              |
| Bullet List    | Unordered points.                                                                   |
| Numbered List  | Ordered points; the numbers renumber themselves when you move things.               |
| To-do          | A checklist item with a real checkbox you can tick.                                 |
| Quote          | For material in someone else's words, so your own stay distinct.                    |
| Code           | Monospaced block for code or anything that needs exact characters.                  |
| Divider        | A horizontal rule for separating sections.                                          |
| Two columns    | Splits the row into two side-by-side stacks, with a draggable divider between them. |
| Image          | A picture with an optional caption. See [Images in notes](./images.md).             |
| Equation       | A block of LaTeX math, rendered in place.                                           |

## Markdown shortcuts

If your fingers already speak markdown, you rarely need the menu. At the start of a text block, type the marker and a space:

| Type              | Get                |
| ----------------- | ------------------ |
| `#` to `####`     | Heading 1 to 4     |
| `-`, `*`, or `+`  | Bullet list item   |
| `1.` (any number) | Numbered list item |
| `[]`              | To-do item         |
| `>`               | Quote              |
| ` ``` `           | Code block         |
| `---`             | Divider            |

For the list markers, the rest of the line survives the conversion, so you can write the thought first and promote it to a bullet after. The other shortcuts are stricter: they only fire on an otherwise empty line, so type those before the thought rather than after. The slash menu shows each block's markdown marker as a hint on the right, which is a decent way to learn them without trying.

## Related

- [Formatting text](./formatting-text.md) for bold, colors, and everything inside a block.
- [Working with blocks](./working-with-blocks.md) for moving, converting, and selecting whole blocks.
