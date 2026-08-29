---
title: Tables
description: Inserting a table, the row and column gutters, headers, and grid copy.
order: 5
---

A table is the one block with a second axis, so it carries gutters of its own on top of the block gutter.

## Inserting one

Type `/` and pick **Table**, listed as "Rows and columns". You get a blank three by three. There is no markdown shortcut for one, and the entry does nothing when the caret is already in a table: tables do not nest.

## Rows and columns

Hover a table and handles appear above the current column and beside the current row. Pressing one selects that row or column and opens its menu; dragging it reorders the run.

The menu holds **Header row** (or **Header column**), **Color**, **Insert above** and **Insert below**, **Duplicate**, **Clear contents**, and **Delete**. Deleting the last row or column is refused; removing the table is the block menu's job.

<!-- image idea: table with the column handle raised and its menu open -->

A thin rail sits under the last row and beside the last column: click it for one more, or drag it for as many as you drag past, up to twenty. Dragging back takes them off again, stopping at the first one with anything written in it.

Drag a column boundary to set its width, and **Fit to width** in a cell menu's table section makes the table span the pane instead. Header rows and header columns toggle independently, so any row can be a header, not only the first.

## Moving around

Tab walks the cells and `Shift+Tab` walks back. Tab off the last cell adds a row, so a table can grow as you type it. The context-menu key opens the cell menu under the caret, the keyboard's only route to these verbs.

## Cells as a grid

Drag across cells to select a rectangle. `Ctrl+C` or `Ctrl+X` (`Cmd+C` and `Cmd+X` on macOS) copies it as tab separated text and an HTML table, the two formats a spreadsheet reads. A grid pasted with the caret in a cell spreads out from there and grows the table to fit; outside a table, a copied HTML table becomes a new table, while tab separated text stays text.

## Related

- [Blocks and the slash menu](./blocks-and-the-slash-menu.md) for the other block types.
- [Formatting text](./formatting-text.md) for the marks that work inside a cell.
