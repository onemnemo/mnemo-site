---
title: Node types and styling
description: The seven node types, reference nodes, map style, and edge styling.
order: 4
---

Every node has a type that decides what it holds and what happens when you open it. How the map looks is set for the whole map under **Map style**.

## Node types

Select a node and use **Type** on the node bar to convert it. The text is kept.

| Type | What the node holds                    |
| ---- | -------------------------------------- |
| Text | Plain text. Every node starts as this. |
| Task | Text plus a checkbox on the node.      |
| Code | Source code in a monospace face.       |
| Math | LaTeX, rendered as an equation.        |
| Link | A web address, with an optional title. |
| Note | A reference to a note in your library. |
| Deck | A reference to a flashcard deck.       |

**Link** asks for an address and rejects one that cannot open. **Note** and **Deck** open a picker.

Shapes, loose text, frames, and images are not node types; they come from the tool dock. See [Editing the canvas](./editing-the-canvas.md).

<!-- image idea: the node type menu open over a selected node -->

## Reference nodes

A **Note** or **Deck** node shows its target's current title and cannot be edited. A deck node also shows how many cards are due. If the target has been deleted, the node reads "Missing reference".

Double-click the node, or click the mark on its edge, to open the note, the deck, or the link in your browser.

<!-- image idea: a deck reference node on a map showing a due chip -->

## Map style

**Map style** in the header has four groups.

| Group       | Choices                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| Arrangement | Balanced, Tree right, Tree down, Radial, Timeline, Free                 |
| Branches    | Line, Taper, Step                                                       |
| Palette     | Dawn Classic, Rainbow Branches, Monochrome, Study, Org Chart, Blueprint |
| Background  | Dots, Grid, Plain                                                       |

**Free** leaves every node where you put it. **Arrange now**, under the arrangement tiles, lays the map out again.

**Pin**, in the node bar's overflow menu, keeps a node in place when the map is arranged. **Unpin** releases it.

**Save style as template**, in the same menu, turns the selected branch's styling into a palette of your own. Choose how many levels to capture; the result is available in every map. Saved templates can be deleted; the six built-in ones cannot.

<!-- image idea: the map style panel open with the arrangement tiles visible -->

## Edge styling

Select an edge to get its own bar.

| Group              | Choices                                                    |
| ------------------ | ---------------------------------------------------------- |
| Line and thickness | Solid, Dashed, Dotted, Double; Hairline, Normal, Bold      |
| Routing            | Curve, Straight, Orthogonal                                |
| Ends               | None, Arrow, Dot, set separately for the start and the end |
| Color              | The branch color, or a color of its own                    |

**And everything below it**, in each panel, applies the choice to every edge further down the branch. An edge without its own color uses its branch color; **Match the branch** returns to that.

<!-- image idea: the edge bar open on a selected edge with the line and thickness panel expanded -->

## Related

- [Editing the canvas](./editing-the-canvas.md) covers the gestures that build a map.
- [Export and import](./export-and-import.md) covers getting a map out.
