---
title: Editing the canvas
description: Keyboard editing, the tool dock, links between branches, and the radial menu.
order: 3
---

Most of a map can be built from the keyboard. The tool dock along the bottom of the canvas covers what has to be placed by hand.

## Keyboard editing

With a node selected, `Tab` adds a child, `Enter` adds a sibling, and `Shift+Tab` moves the node out from under its parent. A node directly under the root cannot be moved out further.

| Key      | Does                                           |
| -------- | ---------------------------------------------- |
| `F2`     | Edits the selected node's or edge's label      |
| `Ctrl+D` | Duplicates the selection (`Cmd+D` on macOS)    |
| `Delete` | Removes the selection (`Backspace` also works) |
| `Ctrl+0` | Fits the whole map in the view                 |
| `Escape` | Cancels the current gesture, then the tool     |

Dragging a node moves its whole subtree. Dragging a frame moves everything in it.

## The tool dock

| Tool    | Key | Does                                                                                            |
| ------- | --- | ----------------------------------------------------------------------------------------------- |
| Select  | `V` | Selects, drags, and resizes                                                                     |
| Node    | `N` | Places a node and opens it for typing                                                           |
| Shape   | `S` | Places the shape chosen in the picker                                                           |
| Text    | `T` | Places a loose text label                                                                       |
| Connect | `C` | Draws an edge between two nodes                                                                 |
| Frame   | `F` | Draws a frame around whatever it covers; framed items keep their place when the map is arranged |
| Image   | `I` | Opens a file picker and places the picture in the center of the view                            |

Every tool except Select returns to Select after one use.

<!-- image idea: the tool dock along the bottom of a map with the shape picker open above it -->

## Links between branches

With the connect tool, press on a node, drag to another, and release. `F2` labels the new edge. Dragging between two nodes that are already linked removes the link.

## The radial menu

Hold `Q`, move the pointer toward a sector, and release to run it. Releasing over the center cancels. With a node selected the menu offers add child, connect, delete, add sibling, collapse, and edit; with nothing selected it offers add node, shape, arrange, fit, and add text.

All keys on this page can be rebound in Settings under Keyboard.

<!-- image idea: the radial toolkit open around a selected node, one sector highlighted -->

## Related

- [First steps](./first-steps.md) covers the basics.
- [Node types and styling](./node-types-and-styling.md) covers what a node holds and how a map looks.
