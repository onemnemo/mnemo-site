---
title: Flashcards
description: Decks, cloze cards, practice sessions, and the four scheduling algorithms.
category: Study
order: 20
---

Flashcards live in decks, and decks can be organized into folders. Each deck has its own scheduling algorithm that decides when cards come back for review.

![Flashcard library](/images/flashcard.png)

## Cards

There are two card types:

- **Classic** cards have a front and a back.
- **Cloze** cards hide parts of a single text. Mark a hidden part with `{{c1::answer}}`, or select text and press `Ctrl+Shift+C` to wrap it. Use `c1`, `c2`, and so on for separate deletions.

Card content uses the same rich editor as notes: formatting, math equations, and images all work. Press `Ctrl+Enter` in the card editor to save the card and start the next one.

![Deck details](/images/flashcard-deck-details.png)

The deck page also shows cards due today, a retention score, and a 14-day retention trend. Retention is a weighted average over your last 200 reviews of the deck.

## Practice sessions

Start a session from the deck page or directly from the library.

| Session | Cards | Grading |
| :--- | :--- | :--- |
| **Review** | Cards that are due, oldest first | Again, Hard, Good, Easy |
| **Quick** | Due cards | Learning, Got it |
| **Focused** | Due cards first, with an optional card or time limit | Again, Hard, Good, Easy |
| **Cram** | Every card in the deck, optionally shuffled | Again, Hard, Good, Easy |
| **Test** | Every card; you type your answer, then grade yourself | Correct, Incorrect |

Only **Review** sessions move cards forward in the schedule. The other session types are extra practice: they count toward your statistics and streaks but never change when a card is due. Use Review for your daily studying and the rest when you want additional repetitions.

![Practice session](/images/flashcard-practice.png)

After a session you get a summary with duration, accuracy, and the grade distribution.

## Scheduling algorithms

Each deck uses one of four algorithms, selectable in the deck settings. All of them work with the same four grades.

- **FSRS** (default). A modern spaced-repetition model that estimates how stable each memory is and schedules the next review to hit a 90 percent recall target. New cards pass through short learning steps of 1, 5, and 10 minutes before graduating to day-length intervals. Forgotten cards return after about 10 minutes.
- **SM-2**. The classic SuperMemo algorithm also used by Anki. Each card keeps an ease factor; intervals grow by that factor on success and reset on failure.
- **Leitner**. Seven boxes with fixed intervals from same-day up to 32 days. Good grades move a card up a box, Again sends it back to box one.
- **Baseline**. Simple fixed intervals without memory modeling. Mostly useful for comparison.

The algorithm choice is per deck and can be changed at any time. Cards keep their due dates when you switch.

## Moving decks in and out

Decks import from and export to Anki packages (`.apkg`), CSV files, and Mnemo's own `.mnemo` packages, from each deck's context menu. Details and limitations are covered in [Import and export](/docs/students/import-export).
