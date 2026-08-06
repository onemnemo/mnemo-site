---
title: Working with blocks
description: The drag handle, the block menu, multi-select, and undo.
order: 4
---

Once a note has structure, you spend as much time rearranging blocks as writing them. All of that runs through the gutter that appears when you hover a block: a plus button and a grip handle.

## The gutter

The plus inserts an empty text block below, ready to type into. The grip does everything else: click it for the block menu, or drag it to move the block.

The block menu offers Move up, Move down, Duplicate, Turn into, and Delete. Turn into converts any text-bearing block into another type, so a paragraph that turned out to be a heading is two clicks from being one, with the text untouched.

<!-- image idea: grip menu open on a block, Turn into submenu visible -->

## Dragging

Drag the grip and the block follows as a ghost, with an accent-colored line marking where it will land. Escape cancels a drag mid-flight. Dragging a block out of a two-column split lifts it back into the main flow; dropping new blocks into a column is not supported yet, so build columns by writing inside them.

## Selecting more than one block

Click a grip to select that block, then extend the selection like you would in a file manager: Ctrl-click adds or removes single blocks, Shift-click selects a range, and dragging from empty space sweeps up everything the rectangle touches. `Ctrl+A` selects every block in the note.

While a selection is live, Backspace or Delete removes it all, and Escape puts the caret back.

## Enter and Backspace do what you mean

The editor tries to make the obvious keys do the obvious thing:

- Enter on an empty list item exits the list instead of adding another empty bullet.
- Quotes and code blocks wrap to a new line on Enter; a quote exits when you press Enter on a blank line inside it.
- Backspace at the start of a formatted block turns it back into plain text first, and only merges into the block above on the next press.
- `Ctrl+Enter` always inserts a plain line break, wherever you are.

## Undo

`Ctrl+Z` undoes and `Ctrl+Y` redoes, and one gesture is always one step: a drag, a paste, a slash-menu conversion, or a burst of typing each undo as a unit. You should never need to hammer undo to unwind a single action.
