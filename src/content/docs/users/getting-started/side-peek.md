---
title: The side peek
description: A read-only panel for looking at one thing without leaving another.
order: 4
---

The side peek holds one note, one card, or Soma beside or over whatever you are working on, so you can check something without navigating away.

## What you can open in it

A note from the sidebar tree: hold `Alt` and click the row, or focus it and press `Alt+Enter`. Alt plus a drag is the window gesture on most Linux desktops, so `Alt+Enter` is the binding that always works. **Open in side peek** also sits in the row's right-click menu and in a note tab's menu.

A card from **Browse cards**: right-click a row and choose **Open in side peek**, the roomier cousin of the same menu's **Peek**.

Soma, from the panel button in the assistant dock's header; the dock closes as the peek opens, since one conversation with two composers is a way to lose half of what you typed.

It shows one item at a time, so opening something new replaces what was there.

## Nothing in it can be edited

The peek reads and never writes. A peeked note is a snapshot taken when the panel opened, and **Refresh** re-reads it. A link inside it opens that note in the peek, and an external address opens in your system browser. **Open full** promotes the item to the main view and closes the panel, unless you pinned it. A note past two thousand blocks is not rendered: the panel says so and offers **Open full** instead.

<!-- image idea: a note open in a tab with a second note in the side peek beside it -->

## Where it sits and how it closes

The options menu offers **Overlay**, **Dock right**, and **Dock left**. An overlay floats over the module and leaves a strip of it showing; docked, it takes a column of its own and the module reflows around it. Overlay adds two controls docking has no use for: **Background** opacity, from 40 to 100 percent, and **Collapse**, which folds the panel into a rail without dropping the item.

Drag the seam on the panel's inner edge to resize it, or focus the seam and use the arrow keys. The width stays between 400 and 760 pixels.

Escape closes an unpinned overlay and nothing else: docked or pinned, the panel is furniture you put there on purpose, so it closes from its own button. The shape you pick survives a restart; the item never does, so the peek always starts closed.

## Related

- [Global search](./global-search.md) is the other way to reach something without losing your place.
- [Browsing and search](../modules/flashcards/browsing-and-search.md) covers the card browser the card peek opens from.
- [Tabs](../modules/notes/tabs.md) explains the notes workspace the peek sits beside.
- [Soma](../soma/index.md) covers the assistant that also lives in the dock and on its own page.
