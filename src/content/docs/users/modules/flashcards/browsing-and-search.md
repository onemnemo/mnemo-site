---
title: Browsing and search
description: The collection-wide card browser, its filters, and bulk edits.
order: 7
---

**Browse cards**, at the top of the library, lists every card in your collection in a single table. Reach for it when you know a card exists but not which deck you filed it in: it is the only search that crosses deck boundaries, since a deck's own table can only ever show you that deck.

## What the search matches

The search box matches the front text, the back text, and the tags of a card. It does not match deck names: narrow by deck with the filter instead. Each word you type is treated as a prefix and a card has to match every word, so "cell mem" finds a card about the cell membrane, and every word you add narrows the result further.

## The filters

Filters stack, and **Clear** removes every filter and empties the search box in one go.

| Filter    | Where it is           | What it offers                                              |
| --------- | --------------------- | ----------------------------------------------------------- |
| State     | Chips, always visible | All, Due, New, Learning, Suspended, Flagged                  |
| Deck      | Behind **Filter**     | One deck, named by its full folder path                      |
| Tag       | Behind **Filter**     | Any tag used anywhere in the collection                      |
| Card type | Behind **Filter**     | Any card type you have defined                               |
| Forgotten | Behind **Filter**     | Forgotten at least once, Forgotten 3+ times, Never forgotten |

<!-- image idea: the browse table with a deck token and a tag token above it -->

## Editing what you find

Right-click a row for peek, edit, flag, suspend, move to another deck, or delete. Tick several rows instead and a bar rises at the bottom offering the same work across the selection: **Move to**, **Tag**, **Suspend**, **Flag**, and **Delete**.

**Delete asks first.** A confirmation dialog names the count ("Delete 12 cards from the deck?") and nothing is removed until you confirm it. There is no undo afterwards, so a card you delete here comes back only from a backup.

## Related

- [Organizing the library](./organizing-the-library.md) covers decks, folders, and the per-deck table this page widens.
- [Import and export](./import-and-export.md) is where the backup comes from, which is worth having before a bulk delete.
