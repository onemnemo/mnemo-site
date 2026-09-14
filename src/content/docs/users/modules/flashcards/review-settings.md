---
title: Review settings
description: Presets, daily limits, retention, leeches, fitted weights, and session options.
order: 5
---

Every deck uses a preset, a named bundle of scheduling settings. Presets are shared: editing one changes every deck that uses it. New decks use the built-in Standard preset. Open **Review settings** from a deck's menu to edit the preset or create a new one. **Restore defaults** resets the selected preset's values.

## Daily limits

**New cards per day** (default 20) and **Maximum reviews per day** (default 200). If reviews are piling up, lower the new card limit first; every new card adds future reviews.

## Desired retention

The share of reviews you want to pass, from 80% to 97%, default 90%. Higher retention means shorter intervals and more daily reviews; lower means fewer reviews and more lapses. Mnemo uses FSRS, and the algorithm itself cannot be changed.

## Learning steps

The same-session steps a new card goes through before it gets day-scale intervals, written as space-separated values such as `1m 10m`. Fewer steps move cards to long intervals sooner; more steps give difficult material extra repetitions on the first day.

## Day start and leeches

| Setting                   | Controls                                        | Default      | Range          |
| ------------------------- | ----------------------------------------------- | ------------ | -------------- |
| Next day starts at        | The hour a study day rolls over                 | 04:00        | 00:00 to 23:00 |
| Lapse limit               | Again grades before a card counts as a leech    | 8            | 1 to 999       |
| When the limit is reached | Do nothing, tag the card, or tag and suspend it | Tag the card | n/a            |

See [How scheduling works](./how-scheduling-works.md) for what leeches and the study day mean.

## Fitted weights

**Fit weights to your reviews** tunes FSRS to your own review history. Nothing runs automatically: press **Optimize** to start. It needs at least 400 reviews on the preset's decks. If the result predicts your recall better than the current weights, **Apply** puts it into effect immediately, without saving the dialog. **Use defaults** returns to the built-in weights.

## Session options

- **Shuffle card order.** Randomizes the review queue.
- **Bury related cards until tomorrow.** Holds back other cards made from the same material until the next study day, so several cloze cards from one text do not all appear in one session. On by default.
- **Auto-reveal answer.** Reveals each card after 5 or 10 seconds.

## Related

- [How scheduling works](./how-scheduling-works.md) explains what these settings feed.
