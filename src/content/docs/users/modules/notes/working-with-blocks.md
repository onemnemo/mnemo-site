---
title: Working with blocks
description: The drag handle, the block menu, multi-select, and undo.
order: 4
---

Rearranging blocks runs through the gutter that appears when you hover one: a plus button that inserts an empty text block below, and a grip handle that does everything else.

## The block menu

Click the grip for Move up, Move down, Duplicate, Turn into, and Delete. **Turn into** converts any text-bearing block into another type with the text untouched, so a paragraph that turned out to be a heading is two clicks from being one.

<!-- image idea: grip menu open on a block, Turn into submenu visible -->

## Moving and selecting

Drag the grip to move a block; Escape cancels a drag mid-flight. Dragging a block out of a two-column split lifts it back into the main flow, but dropping new blocks into a column is not supported yet, so build columns by writing inside them.

Click a grip to select that block, then Ctrl-click or Shift-click to extend the selection, or drag from empty space to sweep up whatever the rectangle touches. `Ctrl+A` (`Cmd+A` on macOS) works in two stages: the first press selects the text inside the current block, the second selects every block in the note.

`Ctrl+Z` undoes and `Ctrl+Y` redoes, and one gesture is always one step: a drag, a paste, a slash-menu conversion, or a burst of typing each undo as a unit.

## Enter and Backspace do what you mean

- Enter on an empty list item exits the list instead of adding another empty bullet.
- Quotes and code blocks wrap to a new line on Enter; a quote exits when you press Enter on a blank line inside it.
- Backspace at the start of a formatted block turns it back into plain text first, and only merges into the block above on the next press.
- `Ctrl+Enter` always inserts a plain line break, wherever you are.
