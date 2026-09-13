---
title: Trash
description: Undo a delete, and recover anything from the thirty-day trash.
order: 8
---

Deleting something in Mnemo does not ask you to confirm it. The delete goes through, a toast offers the way back, and whatever went waits in one list for thirty days. Settings under Trash is that list, and the number beside it in the settings sidebar is how much it is holding.

## What lands there

Notes, note folders, mindmaps, mindmap folders, decks, deck folders, cards, and material.

Deleting a container takes what was inside it. A note folder goes with its notes and subfolders and comes back the way it stood. A deck goes with its cards and the material behind them, every schedule and every review kept, so a restore gives back a deck you can carry on studying rather than a fresh copy of its contents.

## The undo toast

A delete raises a toast naming what went ("Moved Chemistry to the trash", or a count when it took more than one thing) with "Kept for 30 days, then deleted for good." underneath. It holds for nine seconds rather than the usual five, because noticing a mistake takes longer than reading about it.

**Undo** puts back everything that one delete took, contents included. Missing the toast costs you nothing: the trash is the same recovery, one click further away.

## Working through the list

Search covers every row, and the filter beside it narrows to one kind at a time, starting at **Everything**. Kinds are listed separately rather than grouped by module, so picking one never hides deleted folders from someone looking for them.

Each row says what it was, where it came from, how much came with it, when it went, and how long is left: "6 days left" while there are days, then hours, then "expires shortly" inside the last one.

<!-- image idea: the Trash page in settings with the kind filter open over a list of rows -->

**Restore** puts a row back where it came from. If the folder it came from is gone too, it lands at the top level and says so. If what it was inside is still in the trash, Mnemo asks you to restore that first, since a subtree has to come back from the outside in. A card whose deck is already destroyed gets **Restore into** instead, a menu of decks to choose from.

**Delete for good** on a row and **Empty trash** in the toolbar both confirm first and neither can be undone. Empty is offered only while the list is unfiltered, so the button cannot mean two different things.

## Expiry and backups

Mnemo sweeps expired entries at startup and once an hour after that, so a row can outlive its own deadline by a few minutes before it goes.

A full backup includes the trash. A `.mnemo` export does not: it carries only the notes, decks, or maps selected for it.

## Related

- [Storage and backup](./storage-and-backup.md) for the backup file the trash travels in.
- [Notifications](./notifications.md) covers the toast the undo arrives on.
- [Organizing notes](../modules/notes/organizing-notes.md) for what a folder delete takes with it.
- [Organizing the library](../modules/flashcards/organizing-the-library.md) for decks and the material behind cards.
- [The mindmap library](../modules/mindmaps/library.md) for deleting maps and their folders.
