---
title: How scheduling works
description: FSRS, the four grades, learning steps, and daily limits.
order: 3
---

Mnemo schedules reviews with FSRS, a spaced repetition algorithm that models how memory decays. Knowing what your grades mean makes the system less of a black box.

## What FSRS does

For every card the scheduler estimates how stable that memory is and how hard the card is for you. Each review updates the estimate, and the next review lands just before you would likely forget, at a retention you can tune (90% by default).

## The four grades

After revealing an answer you grade yourself **Again**, **Hard**, **Good**, or **Easy**, and each button shows the interval it would schedule.

The grade is scheduling input, not a score. Again means the memory was not there; Hard means it came back slowly; Good is the honest default; Easy means the card barely needed asking. Grading honestly is the one job the algorithm cannot do for you.

## Learning steps

New cards first walk a short ladder of minute-scale steps within the session: Again restarts the ladder, Hard repeats the current step, Good climbs, and Easy graduates the card immediately. Past the last step the card belongs to FSRS, and its intervals stretch to days, weeks, and months. A review card graded Again drops into the same kind of ladder to be relearned, and its lapse is remembered.

## Leeches

FSRS counts lapses, and past a threshold, eight by default, the card is marked a leech. The default action tags it "leech" and leaves it in the queue; suspend pulls it out of reviews instead, and the action can be turned off. An unsuspended leech that lapses again gets flagged at the next half-threshold.

## The study day

A study day does not end at midnight. By default it ends at four in the morning, so a review done at one in the morning counts toward the evening before rather than opening a fresh day of limits. Within a day, a deck introduces up to 20 new cards and caps reviews at 200; cards mid-ladder are never cut off by the cap, so a card you started learning today gets finished today.

The rollover hour, both limits, and the leech threshold and action are all preset settings; see [Review settings](./review-settings.md).

## Review forecast

Overview can show a forecast widget: a bar chart of how many cards will come due on each of the next several days, from a week up to thirty, set per tile.
Each bar splits reviews already due from new cards your library would introduce that day.
The window follows the same study day boundary as the rest of the scheduler, so a review logged after midnight still lands on the right bar instead of the next one.
Add it from Overview's widget gallery, under Study.

## Retention

A deck's retention figure is the share of scheduled reviews you passed (anything but Again) over the recent past. If it sits far below your target, the cause is usually the cards rather than the algorithm; see [First steps](./first-steps.md) for what good ones look like.

## Related

- [Overview](../overview/index.md) covers the forecast widget and the rest of the widget board.
