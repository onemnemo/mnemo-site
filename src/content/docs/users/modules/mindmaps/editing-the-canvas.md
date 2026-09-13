---
title: Editing the canvas
description: Outliner keys, the tool dock, cross-links, and the radial menu.
order: 3
---

The canvas is where a map is built. The fastest way through it is the keyboard; the dock along the bottom is for what has to be placed by eye.

## Tab and Enter grow the map

Select a node and press `Tab`. A child appears, already selected, with its label open for typing. `Enter` does the same sideways: a sibling under the same parent. `Shift+Tab` lifts a node out from under its parent and drops it beside it; a node directly below a root cannot outdent.

The smaller moves:

| Key      | What it does                                             |
| -------- | -------------------------------------------------------- |
| `F2`     | Edits the selected node's label, or a selected edge's.    |
| `Ctrl+D` | Duplicates the selection (`Cmd+D` on macOS).              |
| `Delete` | Removes it. `Backspace` does the same.                    |
| `Ctrl+0` | Fits the whole map in the pane.                           |
| `Escape` | Cancels the gesture in flight, then disarms the tool.     |

Dragging a node carries its whole subtree, and dragging a frame carries its members.

## The tool dock

| Tool    | Key | What a press on the canvas does                 |
| ------- | --- | ----------------------------------------------- |
| Select  | `V` | Selects, drags, and resizes. The resting state.  |
| Node    | `N` | Plants a node and opens it for typing.           |
| Shape   | `S` | Plants the shape chosen in the picker.           |
| Text    | `T` | Plants a loose text label.                       |
| Connect | `C` | Draws an edge between two nodes.                 |
| Frame   | `F` | Sweeps a rectangle to frame what it catches, and its members hold their place through an arrange. |
| Image   | `I` | Opens a file picker and drops the picture in the center of the view. |

Every tool but Select is one-shot: it does its one thing and hands the map back. The shape tool opens a picker of eight primitives. Image is not really a tool either: a picture has to be chosen before it can be placed, so the press opens the picker instead of arming the canvas for the next click.

<!-- image idea: the tool dock along the bottom of a map with the shape picker open above it -->

## Cross-links between branches

Arm connect, press on a node, drag to another, and release. Mnemo draws the edge and returns to Select, and `F2` labels it. Dragging between two nodes that are already linked removes that edge instead.

## The radial toolkit

Hold `Q`, flick the pointer in a direction, and let go: the release runs the sector under the pointer. Letting go over the hub calls the gesture off, and `Escape` closes it. With a node selected the ring offers add child, connect, delete, add sibling, collapse, and edit; with nothing selected, add node, shape, arrange, fit, and add text.

Every key on this page is rebindable in Settings.

<!-- image idea: the radial toolkit open around a selected node, one sector highlighted -->

## Related

- [First steps](./first-steps.md): why cross-links earn the map its keep.
- [Node types and styling](./node-types-and-styling.md): what a node holds and how it looks.
