---
title: Import and export
description: Backups, Anki packages, and CSV.
order: 8
---

Your decks are yours, so they move in and out of Mnemo in three formats. Import is a button in the library; export lives in each deck's menu, or at the library level for everything at once.

## The formats

| Format                   | Best for                                                   |
| ------------------------ | ---------------------------------------------------------- |
| Mnemo Package (`.mnemo`) | Full backup: cards, folders, and scheduling, re-importable |
| Anki Package (`.apkg`)   | Moving decks to or from Anki                               |
| CSV (`.csv`)             | Spreadsheets: plain front and back columns                 |

A single deck exports to any of the three. Exporting several at once produces a Mnemo package, since that is the only format that holds a whole library faithfully.

## Importing

Drop up to five files into the import dialog and Mnemo detects each format before touching anything. If a Mnemo package holds a deck you already have, you choose the policy: **Keep both** (the duplicate gets a suffix), **Skip**, or **Replace**. Anki and CSV files always arrive as new decks.

## Moving from Anki, honestly

Anki import brings your cards' content: fronts, backs, tags, cloze markers, and embedded images. A card already studied in Anki also carries its due date, how many times it was seen and lapsed, and which phase it was in: learning, review, or relearning. What does not cross over is Anki's memory of how well you knew the card; there is no published mapping from Anki's ease factor to FSRS's stability and difficulty, so Mnemo leaves those unset rather than guess at them. Mnemo warns you after the import: due dates are kept, but early intervals may differ from what Anki would have given, since FSRS is measuring difficulty fresh from your next few reviews. A card you never studied in Anki has no due date to carry, so it lands as new either way.

Export runs the other direction and carries only content. A deck exported to `.apkg` brings no scheduling with it, so every card lands in Anki as new.

## Backups

A `.mnemo` export of all decks is the backup format: one file with your decks, folders, cards, and scheduling, restorable by import. If your decks represent months of writing, exporting one occasionally is cheap insurance on top of backing up [Mnemo's data folder](../../getting-started/installation.md#where-your-data-lives).
