---
title: Formatting text
description: The selection toolbar, colors, and the keyboard shortcuts behind them.
order: 3
---

Select some text and a small toolbar floats above it with everything you can do to the selection. Nothing in it is exotic, but a few behaviors are worth knowing so the editor feels predictable instead of magical.

<!-- image idea: the floating toolbar over a selection, color popover open -->

## The toolbar

From left to right: a color menu, bold, italic, underline, strikethrough, highlight, then subscript, superscript, and an inline equation button drawn as a sigma.

The color menu has two rows, text color and background. Swatches replace each other rather than stack, and the first entry in each row clears the color again.

## Keyboard shortcuts

On macOS, read Ctrl as Cmd.

| Shortcut                   | Does          |
| -------------------------- | ------------- |
| `Ctrl+B`                   | Bold          |
| `Ctrl+I`                   | Italic        |
| `Ctrl+U`                   | Underline     |
| `Ctrl+Shift+S`             | Strikethrough |
| `Ctrl+Shift+H`             | Highlight     |
| `Ctrl+,`                   | Subscript     |
| `Ctrl+.`                   | Superscript   |
| `Ctrl+Z`                   | Undo          |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo          |

Undo groups by pauses in typing rather than by keystroke, so undoing takes back the phrase you just wrote, not one character at a time.

## Small rules that keep formatting sane

- Toggling a format over a partly formatted selection completes it first. Press again to remove it everywhere.
- With no selection, a toggle arms for whatever you type next.
- Subscript and superscript are mutually exclusive; setting one clears the other.
- Heading text is always bold. That is a design decision, not a bug, which is why bold refuses to toggle inside a heading.

## Inline equations

The sigma button drops a LaTeX equation into the line. Click any equation to open a small editor with a live preview: Enter commits, Escape cancels, and the arrow keys walk you out of it at either end. If the LaTeX does not parse, Mnemo keeps your source and says so rather than eating it.

For display math on its own line, use the Equation block from the [slash menu](./blocks-and-the-slash-menu.md) instead.
