---
title: Formatting text
description: Formatting shortcuts, links, and inline equations.
order: 3
---

Select text to get a floating toolbar with every formatting option. Most options also have a keyboard shortcut.

## Keyboard shortcuts

On macOS, read Ctrl as Cmd.

| Shortcut                   | Does                   |
| -------------------------- | ---------------------- |
| `Ctrl+B`                   | Bold                   |
| `Ctrl+I`                   | Italic                 |
| `Ctrl+U`                   | Underline              |
| `Ctrl+Shift+S`             | Strikethrough          |
| `Ctrl+Shift+H`             | Highlight              |
| `Ctrl+E`                   | Inline code            |
| `Ctrl+,`                   | Subscript              |
| `Ctrl+.`                   | Superscript            |
| `Ctrl+Shift+L`             | Add or edit a link     |
| `Ctrl+Shift+E`             | Insert inline equation |
| `Ctrl+Z`                   | Undo                   |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo                   |

## Links

`Ctrl+Shift+L` opens the link popover for the selected text. With nothing selected, it opens the link popover only when the caret is inside an existing link, so you can change or remove a link without reselecting its text.

## How toggles behave

- **A toggle over a partly formatted selection applies the format to all of it.** Press again to remove it.
- **A toggle with nothing selected applies to whatever you type next.**
- **Subscript and superscript are exclusive.** Setting one clears the other.
- **Heading text is always bold.** Bold cannot be toggled inside a heading.

## Inline equations

The sigma button, or `Ctrl+Shift+E`, inserts a LaTeX equation in the line. Click an equation to edit it with a live preview. Invalid LaTeX is kept as typed. For an equation on its own line, use the Equation block from the [slash menu](./blocks-and-the-slash-menu.md).

## Related

- [Blocks and the slash menu](./blocks-and-the-slash-menu.md) covers block-level structure.
- [Spelling](./spelling.md) covers the spell checker that runs in the editor.
