---
title: Search
description: The provider model behind global search, scoring, and result navigation.
category: Features
order: 42
---

Global search is a provider aggregation, not an index. When the user types, `GlobalSearchService` (`Mnemo.Infrastructure/Services/Search/`) fans the query out to every registered `ISearchProvider`, each of which scans its own domain in memory and returns scored results. There is no persistent search index to maintain, which is the main design tradeoff: zero index invalidation bugs, at the cost of scan cost growing with workspace size.

## Providers

Modules register providers in `ConfigureServices`; the service collects all of them from DI.

| Provider | Searches |
| :--- | :--- |
| `NavigationSearchProvider` | Registered routes and sidebar labels |
| `NotesSearchProvider` | Note titles and block content |
| `DecksSearchProvider` | Deck names, descriptions, tags, with per-deck card match summaries |
| `FlashcardsSearchProvider` | Card fronts, backs, and tags |
| `MindmapsSearchProvider` | Map titles and node text |
| `SettingsSearchProvider` | Settings entries |

Adding a feature to global search means implementing `ISearchProvider` and registering it in the feature's module.

## Matching and scoring

`TextSearchMatch` tokenizes the query (tokens shorter than 2 characters are dropped) and supports fuzzy matching via Levenshtein distance: one edit allowed for tokens of length 4 to 6, two edits for 7 plus; fuzzy only applies to tokens of length 4 and up. The overlay enables fuzzy by default.

`SimpleSearchScorer` weighs fields at 50 percent title, 20 percent subtitle, 30 percent body, with boosts for exact matches. Two extra behaviors layer on top for flashcards: topic clusters group two or more cards sharing stem words into a single expandable result, and question-shaped queries pull individual cards out of decks.

## Result navigation

Each result carries a `SearchNavigationTarget`, a route plus a typed parameter, so selecting a result is an ordinary navigation. The flashcard parameter, for example, opens the deck page scrolled to the matching card. The UI is `GlobalSearchOverlayViewModel`, opened from the top bar or `Ctrl+K`.

Global search finds content; it is not a command palette. The separate quick-actions overlay (`Alt+Shift+Q`) covers command-style actions.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Service and providers | `Mnemo.Infrastructure/Services/Search/` |
| Matching | `TextSearchMatch` (same folder), tests in `TextSearchMatchTests` |
| Overlay UI | `Mnemo.UI/Components/` global search overlay |
| Provider contract | `Mnemo.Core/Services/` (`ISearchProvider`) |
