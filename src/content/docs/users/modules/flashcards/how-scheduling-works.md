---
title: How scheduling works
description: Mnemo uses spaced repetition to bring difficult cards back sooner and let familiar ones wait longer. Over time, this helps you remember more with less effort.
order: 3
---

Mnemo schedules reviews with FSRS, a spaced repetition algorithm. Each review updates its estimate of how well you know the card, and the next review is placed just before you are likely to forget it.

## The four grades

After revealing the answer, grade yourself **Again**, **Hard**, **Good**, or **Easy**. Each button shows the interval it would schedule.

- **Again.** You did not remember.
- **Hard.** You remembered, but slowly.
- **Good.** You remembered. This is the normal grade.
- **Easy.** The card was trivial.

Grade honestly; the schedule is only as good as the grades.

## Learning steps

New cards go through a short series of same-session steps before they get day-scale intervals. Again restarts the steps, Hard repeats the current one, Good advances, and Easy graduates the card immediately. A review card graded Again goes back through the steps to be relearned.

## Leeches

A card that lapses too often (eight Again grades by default) is marked a leech. By default it is tagged `leech` and stays in the queue. You can have leeches suspended instead, or turn the marking off.

## Daily limits and the study day

Each deck introduces up to 20 new cards per day and caps reviews at 200. Cards already in learning are never cut off by the cap.

The study day ends at 04:00 by default, not midnight, so a late-night review counts toward the day before.

The limits, the rollover hour, and the leech settings are all in [Review settings](./review-settings.md).

## Retention

Desired retention is the share of reviews you want to pass, 90% by default. A deck's retention figure shows the share of recent reviews you actually passed. If it sits well below the target, the cards themselves are usually the problem; see [First steps](./first-steps.md).

The forecast widget on Overview shows how many cards come due on each of the coming days.

## Related

- [Review settings](./review-settings.md) covers every setting mentioned here.
- [Overview](../overview/index.md) covers adding the forecast widget.
