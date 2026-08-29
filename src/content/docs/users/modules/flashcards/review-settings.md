---
title: Review settings
description: Presets, daily limits, scheduling, leeches, fitted weights, and session options.
order: 5
---

Every deck points at a preset, a named bundle of scheduling settings. Presets are shared: edit one and every deck using it follows. Mnemo ships a Standard preset that new decks use; add your own from the Review settings dialog on any deck's menu. **Restore defaults** returns the selected preset to those values, its name aside.

## Daily limits

**New cards per day** and **Maximum reviews per day** are the throttle, defaulting to 20 new and 200 reviews. If a backlog is drowning you, lowering new cards is almost always the right lever; every new card is a stream of future reviews.

## Desired retention

The algorithm is FSRS-6 and cannot be changed. The retention slider (80% to 97%) tells the scheduler how much forgetting you will tolerate: higher retention means shorter intervals and more daily work, lower means fewer reviews and more lapses. The default is 90%; nudge it up for high-stakes exams, down for low-stakes volume.

## Learning steps

The minute-scale ladder new cards climb before they graduate to day-scale scheduling, written as spaced values like `1m 10m`. Fewer or shorter steps push cards out to FSRS faster; more steps give shaky material extra same-day repetitions.

## Day start and leeches

[How scheduling works](./how-scheduling-works.md) explains what a leech is and why a study day needs a rollover hour; this is where both are set.

| Setting                    | Controls                                        | Default      | Range          |
| -------------------------- | ------------------------------------------------ | ------------ | -------------- |
| Next day starts at         | The local hour a study day rolls over           | 04:00        | 00:00 to 23:00 |
| Lapse limit                | Again grades before a card counts as a leech    | 8            | 1 to 999       |
| When the limit is reached  | Do nothing, tag the card, or tag and suspend it | Tag the card | n/a            |

Tag and suspend also pulls the card out of review until you deal with it; the other two leave it in the queue.

## Fitted weights

**Fit weights to your reviews** fits FSRS's memory weights to every review logged by decks on this preset, and only when you press **Optimize**; nothing runs on its own. It needs 400 scored reviews before it produces anything, and reports how far along you are short of that. Past that, it either offers **Apply** for a vector that predicts your recall meaningfully better than what is running, or confirms your history already matches it. Applying lands immediately, not on the dialog's own **Save**, since every deck on the preset schedules from the new vector at once. A preset with fitted weights also offers **Use defaults**, which drops the fit for FSRS's built-in defaults immediately.

## Session options

**Shuffle card order** randomizes the queue, so your memory of the order cannot do the card's job. **Bury related cards until tomorrow** holds back the other cards generated from the same note until the next study day; it is on by default, so several cloze deletions from one note will not all surface in one session. **Auto-reveal answer** flips each card for you after 5 or 10 seconds.

## Related

- [How scheduling works](./how-scheduling-works.md) for what these dials actually feed.
