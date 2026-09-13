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

Drop up to five files into the import dialog and Mnemo detects each format before touching anything. If a Mnemo package holds a deck you already have, you choose the policy: **Keep both** (the duplicate gets a suffix), **Skip**, or **Replace**. **Replace** asks a second time before it runs when the file covers decks you already have, since those are the ones it would overwrite. Anki and CSV files carry no ids to match against, so they always arrive as new decks and the question is not asked at all. `Ctrl+Enter` confirms the dialog (`Cmd+Enter` on macOS).

## Moving from Anki, honestly

Anki import brings your cards' content: fronts, backs, tags, cloze markers, and embedded images. A deck path like `Spanish::Verbs` becomes a folder and a deck here. A card you have already studied also carries its due date, its interval, how many times it was seen and lapsed, the phase it was in (learning, review, or relearning), and its review log, which counts towards retention as soon as the deck lands.

How well you knew the card crosses over too, by the first of three routes that works: FSRS memory already recorded on the card, then a replay of that card's review log through FSRS, and, failing both, an approximation from Anki's SM-2 ease factor and interval. Only the first is exact. The replay rebuilds memory from the answers themselves; the approximation is a published formula fitted to SM-2, close enough to schedule from and not a measurement. Mnemo says after the import which cards arrived with memory and which did not. A card that arrives without it starts measuring from your next few reviews, so its early intervals may differ from what Anki would have given, and a card you never studied in Anki lands as new.

Export carries the same ground the other way: content, folders as `::` deck paths, due date, interval, reps, lapses, stability and difficulty where the card has them, and the full review log. A studied deck lands in Anki studied rather than as a pile of new cards.

## Backups

A `.mnemo` export of all decks is the backup format: one file with your decks, folders, cards, and scheduling, restorable by import. If your decks represent months of writing, exporting one occasionally is cheap insurance on top of backing up [Mnemo's data folder](../../getting-started/installation.md#where-your-data-lives).
