---
title: Import and export
description: Backups, Anki packages, and CSV.
order: 8
---

Decks move in and out of Mnemo in three formats. **Import** is at the top of the library. **Export** is on each deck's menu, or at the library level to export everything at once.

## Formats

| Format                   | Best for                                                   |
| ------------------------ | ---------------------------------------------------------- |
| Mnemo Package (`.mnemo`) | Full backup: cards, folders, and scheduling, re-importable |
| Anki Package (`.apkg`)   | Moving decks to or from Anki                               |
| CSV (`.csv`)             | Spreadsheets: plain front and back columns                 |

A single deck exports to any of the three. Exporting several decks at once always produces a Mnemo package.

## Importing

Drop up to five files into the import dialog. `Ctrl+Enter` confirms (`Cmd+Enter` on macOS).

If a Mnemo package contains a deck you already have, choose what happens: **Keep both** adds a suffix to the incoming deck, **Skip** ignores it, and **Replace** overwrites yours. Replace asks for confirmation before it runs. Anki and CSV files always import as new decks.

## Moving from Anki

Anki import brings the card content (fronts, backs, tags, cloze markers, and embedded images) and the scheduling state of every card you have studied: due date, interval, review history, and learning phase. A deck path like `Spanish::Verbs` becomes a folder and a deck.

Mnemo carries over how well you know each card from its FSRS data or review history where Anki provides them, and otherwise estimates it from Anki's ease and interval. After the import, Mnemo reports which cards arrived with memory data. A card without it settles in over its next few reviews, so its early intervals may differ from what Anki would have given.

Export to Anki carries the same data back, so a studied deck arrives in Anki studied, not as new cards.

## Backups

A `.mnemo` export of all decks is a complete backup: decks, folders, cards, and scheduling in one file, restored by importing it. It is worth making one occasionally in addition to backing up [Mnemo's data folder](../../getting-started/installation.md#where-your-data-is-stored).

## Related

- [Organizing the library](./organizing-the-library.md) covers the deck menu where export lives.
