---
title: Tuning the editor
description: Width, base text size, math, and where spelling lives.
order: 4
---

The editor's feel has its own corner of Settings, under Editor. It is a short page on purpose: a row whose setting nothing reads yet is hidden rather than left sitting there, because a control the app quietly ignores tells you that you changed something when you did not.

## Width and text size

**Editor Width**, in the Writing experience group, runs from Super Compact to Super Wide and defaults to Wide. The four steps are fixed measures for the text column rather than a share of the window, so a wider screen buys you margin, not longer lines. It is a per-read preference more than a setup step, so the same four choices sit in a note's own menu under **Editor Width**.

**Base Font Size** is what the Markdown appearance group still carries: 12px to 18px, 16px by default. It reaches the card surfaces in review and test today, while the note editor runs on its own built-in metrics, so expect this one to reach further as the rehaul settles.

**Auto-save** is here too, on by default. [How saving works](../modules/notes/how-saving-works.md) covers what turning it off changes.

## Math

There is no math switch, and no separate size for the typeset result. Equations render wherever they appear: in notes, on card fronts and backs, and in mindmap math nodes. The result matches the type around it, which is what keeps an inline formula from sitting a size larger than the sentence it belongs to. A formula that will not parse is shown marked, exactly as you typed it, so a stray brace reads as your own typo rather than as the card.

Writing the LaTeX is covered where you write it: [Formatting text](../modules/notes/formatting-text.md) for a note, and [Writing cards](../modules/flashcards/writing-cards.md) for the dollar signs on a card.

## Spelling and fonts

Spelling is no longer a row under Editor: it has its own Settings page, and [Spelling](../modules/notes/spelling.md) covers the switch, the languages, and the personal word list.

Typefaces are not user-selectable. Mnemo ships its own set: one for the UI, a matching monospace for code, and a dedicated math face for equations.

## Related

- [Spelling](../modules/notes/spelling.md) is the whole of the spell check surface.
- [Themes](./themes.md) covers Light, Dark, and how much the app moves.
- [How saving works](../modules/notes/how-saving-works.md) explains auto-save and the conflict warning.
