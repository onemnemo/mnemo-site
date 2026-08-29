---
title: Node types and styling
description: The seven kinds a node can be, and the choices that set how a map looks.
order: 4
---

Every node has a kind, and the kind decides what it holds and what happens when you open it. How the map looks is a separate set of choices, and they belong to the map rather than to a selection.

## The seven kinds

Select a node and the **Type** slot on the node bar converts it in place, keeping the words already on it.

| Kind | What the node holds                                       |
| ---- | --------------------------------------------------------- |
| Text | Plain words. Every node starts here.                      |
| Task | Words plus a checkbox you tick on the node itself.        |
| Code | Source, kept as typed, set in a monospace face.           |
| Math | LaTeX, rendered as an equation.                           |
| Link | A web address, with an optional title of your own.        |
| Note | A pointer at a note in your library.                      |
| Deck | A pointer at a flashcard deck.                            |

The first four convert on the spot. **Link** prompts for an address, and an address that will not open is refused rather than stored; **Note** and **Deck** open a picker over the library you are pointing into.

Shapes, loose text, frames, and images are not node kinds; they come from the tool dock in [Editing the canvas](./editing-the-canvas.md).

<!-- image idea: the node type menu open over a selected node -->

## References that reach the rest of your library

A **Note** or **Deck** node has no label of its own: it reads as its target's title, looked up live, so you cannot type over one. A deck with cards waiting also wears a chip reading "3 due". A target that has been deleted reads "Missing reference" rather than going blank.

Double click the node, or press the mark on its leading edge, and Mnemo follows the reference: to the note, to the deck, or to the address in your browser.

<!-- image idea: a deck reference node on a map showing a due chip -->

## How the whole map looks

**Map style** in the header holds four groups of choices.

| Group       | Choices                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| Arrangement | Balanced, Tree right, Tree down, Radial, Timeline, Free                       |
| Branches    | Line, Taper, Step                                                             |
| Palette     | Dawn Classic, Rainbow Branches, Monochrome, Study, Org Chart, Blueprint       |
| Background  | Dots, Grid, Plain                                                             |

**Free** leaves every node where you dropped it. **Arrange now**, under the arrangement tiles, lays the map out again after you have added to it.

**Save style as template**, in the node bar's overflow menu, turns a branch you like into a palette entry of your own: you choose how many levels deep to capture, and the result applies to any map. Templates you saved can be deleted; the six that ship cannot.

<!-- image idea: the map style panel open with the arrangement tiles visible -->

## Related

- [Editing the canvas](./editing-the-canvas.md) for the gestures that build a map.
- [Export and import](./export-and-import.md) for getting a styled map back out.
