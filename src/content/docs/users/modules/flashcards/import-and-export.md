---
title: Import and export
description: Backups, Anki packages, and CSV.
order: 7
---

Your decks are yours, so they move in and out of Mnemo in three formats. Import lives on a button in the library; export lives in each deck's menu, or at the library level for everything at once.

## The formats

| Format                   | Best for                                                   |
| ------------------------ | ---------------------------------------------------------- |
| Mnemo Package (`.mnemo`) | Full backup: cards, folders, and scheduling, re-importable |
| Anki Package (`.apkg`)   | Moving decks to or from Anki                               |
| CSV (`.csv`)             | Spreadsheets: plain front and back columns                 |

A single deck exports to any of the three. Exporting several decks at once produces a Mnemo package, since that is the only format that holds a whole library faithfully.

## Importing

Drop up to five files into the import dialog and Mnemo detects each format before touching anything; an Anki package even reports its card count up front. If a Mnemo package holds a deck you already have, you choose the policy: **Keep both** (the duplicate gets a suffix), **Skip**, or **Replace**. Anki and CSV files always arrive as new decks.

## Moving from Anki, honestly

Anki import brings your cards' content: fronts, backs, tags, cloze markers, and embedded images. It deliberately does not bring Anki's scheduling state; those numbers belong to a different algorithm, and translating them badly is worse than starting clean. Imported cards arrive as new, and FSRS builds its own picture of them from your first reviews, which happens faster than you would expect.

The same is true in reverse: decks exported to `.apkg` arrive in Anki as new cards.

## Backups

A `.mnemo` export of all decks is the backup format: one file with your decks, folders, cards, and scheduling, restorable by import. If your decks represent months of writing, exporting one occasionally is cheap insurance on top of backing up [Mnemo's data folder](../../getting-started/installation.md#where-your-data-lives).
