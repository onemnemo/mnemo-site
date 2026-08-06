---
title: How scheduling works
description: FSRS, the four grades, learning steps, and daily limits.
order: 3
---

Mnemo schedules reviews with FSRS, a modern spaced repetition algorithm that models how memory actually decays. You do not need to understand it to benefit from it, but knowing what your grades mean makes the whole system feel less like a black box.

## What FSRS does

For every card, the scheduler maintains an estimate of how stable that memory is and how hard the card is for you. Each review updates the estimate, and the next review is placed just before you would likely forget. The target is a retention you can tune (90% by default): high enough to feel solid, low enough that you are not wasting reviews on things you clearly know.

## The four grades

After revealing an answer you grade yourself: **Again**, **Hard**, **Good**, or **Easy**. Each button shows the interval it would schedule, so nothing is hidden.

The grade is scheduling input, not a score. Again means the memory was not there; Hard means it came back slowly; Good is the honest default; Easy means the card barely needed asking. Grading honestly is the one job the algorithm cannot do for you.

## Learning steps

New cards do not jump straight to multi-day intervals. They first walk a short ladder of minute-scale steps within the session: Again restarts the ladder, Hard repeats the current step, Good climbs, and Easy graduates the card immediately. Once past the last step, the card belongs to FSRS and its intervals stretch to days, weeks, and months.

A review card graded Again drops into the same kind of ladder to be relearned, and its lapse is remembered.

## Daily limits

By default a deck introduces up to 20 new cards a day and caps reviews at 200. Cards mid-ladder are never cut off by the cap; a card you started learning today gets finished today. Both limits live in [Review settings](./review-settings.md).

## Retention

A deck's retention figure is the share of scheduled reviews you passed (anything but Again) over the recent past. If it sits near your target, the system is working. If it is far below, the usual cause is not the algorithm but the cards; see [First steps](./first-steps.md) for what good ones look like.
