---
title: Formatting text
description: Shortcuts, links, and the rules that keep marks predictable.
order: 3
---

Select text and a small toolbar floats above it with everything you can do to the selection. Most of it has a keyboard shortcut, and a few behaviors are worth knowing so the editor feels predictable instead of magical.

## Keyboard shortcuts

On macOS, read Ctrl as Cmd.

| Shortcut                   | Does               |
| -------------------------- | ------------------ |
| `Ctrl+B`                   | Bold               |
| `Ctrl+I`                   | Italic             |
| `Ctrl+U`                   | Underline          |
| `Ctrl+Shift+S`             | Strikethrough      |
| `Ctrl+Shift+L`             | Open link popover  |
| `Ctrl+Shift+H`             | Highlight          |
| `Ctrl+E`                   | Inline code        |
| `Ctrl+,`                   | Subscript          |
| `Ctrl+.`                   | Superscript        |
| `Ctrl+Shift+E`             | Insert inline equation |
| `Ctrl+Z`                   | Undo               |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo               |

## Links

`Ctrl+Shift+L` opens the link popover at the caret. With a selection it links the selection; with a collapsed caret it only opens on a link you are already inside, which is how you retarget or remove a link without reselecting its text. An address with an unsafe scheme, such as `javascript:`, is rejected: the popover stays open and shows an error rather than losing what you typed.

## Small rules that keep formatting sane

- Toggling a format over a partly formatted selection completes it first. Press again to remove it everywhere.
- With no selection, a toggle arms for whatever you type next.
- Subscript and superscript are mutually exclusive; setting one clears the other.
- Heading text is always bold, which is why bold refuses to toggle inside a heading.

## Inline equations

The sigma button, or `Ctrl+Shift+E`, drops a LaTeX equation into the line, and clicking any equation reopens it in a small editor with a live preview; if the LaTeX does not parse, Mnemo keeps your source and says so rather than eating it. For display math on its own line, use the Equation block from the [slash menu](./blocks-and-the-slash-menu.md).
