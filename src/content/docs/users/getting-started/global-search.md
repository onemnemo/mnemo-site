---
title: Search and the command palette
description: One search box for notes, decks, sidebar pages, and a few actions.
order: 3
---

`Ctrl+K` (`Cmd+K` on macOS) opens a single search box that reaches across the whole app instead of just the module you are in. It works from anywhere, even while a text field has focus, so you can pull it up mid-note without clicking away first.

## Opening it

Press `Ctrl+K`, or click **Search** in the topbar. Pressing `Ctrl+K` again closes it, the same as pressing `Esc`.

## What it searches

The palette matches note titles, deck names, the pages in the sidebar, and two built in actions: **Toggle theme** and **Toggle sidebar**. Results are grouped under headings: Actions, Notes, Decks, and Go to, with the strongest match in each group first.

It does not search card fronts, card backs, or note bodies; only titles and names. For a card's actual content, use **Browse cards** in the flashcards module instead.

<!-- image idea: the command palette open over the app, showing grouped results for a query -->

## Narrowing and moving through results

With nothing typed, the palette shows what you opened recently, the pages in the sidebar, and a handful of actions. Type `>` to turn the box into an actions-only scope, or `#` to scope to tags, which matches deck tags; note tags are not searchable anywhere yet.

Arrow keys move the highlight, `Enter` opens the highlighted row, and `Esc` backs out one layer at a time: it clears a scope chip first, then closes the palette. If nothing matches and Soma is enabled, the last row reads **Ask Soma about** your query, so a search that comes up empty still goes somewhere.

## Related

- [Side peek](./side-peek.md) for another way to open a result without leaving the page you are on.
- [Keyboard shortcuts](../customization/keyboard-shortcuts.md) for rebinding `Ctrl+K` or any other chord.
- [Browsing and search](../modules/flashcards/browsing-and-search.md) for the card-content search the palette does not do.
