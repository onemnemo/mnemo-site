---
title: Flashcards system
description: Deck persistence, the four schedulers, session types, and their data flow.
category: Features
order: 40
---

The flashcard system spans three projects: models and scheduling math in Core, persistence and schedulers in Infrastructure, and the library, deck, and practice screens in the UI module.

## Data model

`FlashcardDeck` holds cards, a folder reference, a per-deck `SchedulingAlgorithm`, a retention score, and session history. `Flashcard` carries front and back content (plain text plus optional block content for rich rendering) and its scheduling state: due date, stability, difficulty, FSRS state, Leitner box. Models live in `Mnemo.Core/Models/Flashcards/`.

Card types are `Classic` and `Cloze`. Cloze markers are Anki-compatible `{{cN::answer}}` in the front text; practice reveals deletions from the front, and the back is unused. Images are embedded in card markdown, not a separate card type.

Persistence is deliberately blunt: `PersistentFlashcardDeckService` serializes the entire flashcard domain, decks, folders, and session history, into one storage key, `flashcards.state.v2`. Simple to reason about, but every save rewrites the whole document; keep that in mind before adding high-frequency writes.

## Scheduling

Each deck picks one of four schedulers, resolved by `FlashcardSchedulerResolver` from `Mnemo.Infrastructure/Services/Flashcards/`. All consume the same four grades (Again, Hard, Good, Easy).

| Scheduler | Model |
| :--- | :--- |
| `Fsrs` (default) | FSRS with the standard 21-weight parameter set, desired retention fixed at 0.9. States New, Learning, Review, Relearning. Learning steps 1, 5, 10 minutes; lapses relearn after 10 minutes. |
| `Sm2` | Classic SM-2. Ease factor stored in `Difficulty`, clamped 1.3 to 3.2, initial 2.5. Intervals 1 day, 6 days, then interval times ease. Failure resets. |
| `Leitner` | Boxes 1 to 7 with fixed intervals 0.01, 1, 2, 4, 8, 16, 32 days. Good moves up one, Easy two, Again to box 1. |
| `Baseline` | Fixed minute-based intervals, no memory model. |

FSRS parameters are a single global default registered in `Bootstrapper`; there is no per-deck tuning UI. The scheduling math lives in `FlashcardScheduling.cs` in Core, so it is unit-testable without storage (`FlashcardSchedulingTests`).

**The one rule that surprises people:** only `Review` sessions call the scheduler and persist new due dates (`RecordSessionOutcomeAsync`). Quick, Focused, Cram, and Test sessions record statistics and session history but never touch scheduling state. This is intentional: extra practice should not inflate intervals.

## Sessions

`FlashcardSessionConfig` describes a session; the queue builder (covered by `FlashcardSessionQueueBuilderTests`) selects and orders cards per type: Review takes due cards oldest first, Focused applies count or time limits, Cram takes everything with optional shuffle, Test adds typed-answer self-grading. `FlashcardPracticeViewModel` runs the loop and extracts embedded images into a carousel.

Deck retention is computed as a weighted grade average over the last 200 reviews (Again 0, Hard 0.4, Good 0.75, Easy 1.0) with a 14-day trend series shown on the deck page.

A `FlashcardTestGradingMode.Ai` enum value exists but is not wired to anything; Test sessions are self-graded only.

## Import and export

Three format adapters register with the import/export coordinator: Anki `.apkg` (SQLite-based, HTML converted to blocks, media mapped, cloze detected, FSRS assigned on import), CSV (front and back columns, classic cards), and the `.mnemo` package. Details in [Import and export](/docs/developers/features/import-export).

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Models and scheduling math | `Mnemo.Core/Models/Flashcards/` |
| Persistence and schedulers | `Mnemo.Infrastructure/Services/Flashcards/` |
| UI module | `Mnemo.UI/Modules/Flashcards/` |
| Format adapters | `Mnemo.Infrastructure/Services/ImportExport/` |
| Tests | `FlashcardSchedulingTests`, `FlashcardDeckServiceTests`, `FlashcardSessionQueueBuilderTests` |
