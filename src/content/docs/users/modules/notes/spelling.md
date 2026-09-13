---
title: Spelling
description: The spell check switch, its languages, and your own word lists.
order: 13
---

Mnemo checks spelling itself rather than handing the job to the browser: bundled dictionaries, a word list you control, and a per-note say in which languages apply. Mnemo's marks replace the browser's, so two sets of underlines never disagree.

## The switch and the languages

Spelling has its own page in Settings under Application. One switch, **Spell check**, decides whether anything is checked at all.

Under it, **Languages you write in** is an ordered list rather than a single choice: a word is correct when any language in the list knows it. The first entry is the one whose corrections are offered first, so put the language you write most at the top. Each row can move up, move down, or be removed, and **Add a language** opens the catalogue.

Two dictionaries ship with Mnemo, English (United States) and Spanish (Spain), and English is the one active on a fresh install. Nothing is downloaded here, so the picker's **Not available** group records what the build knows about and cannot check rather than offering a shelf to install from.

<!-- image idea: the Spelling settings page with two languages listed and the add row below them -->

## What a flagged word looks like

A flagged word gets a straight underline and a faint wash behind it, not a wavy line: the colour already carries the message.

Three things open the card that answers for it. Click the word, right-click it with nothing selected, or put the caret inside it and press `Alt+Enter`. The card names what it found, repeats the word, offers replacements as buttons, and then gives you **Add to dictionary** and **Ignore in this note**.

Clicking leaves the caret where you put it, since repairing a word by hand is the commonest answer to an underline. Opening from the keyboard takes focus instead, and waits on Close until suggestions arrive so the first key press cannot teach the dictionary your typo.

Past 2000 marks in a single note, checking pauses and the note says so.

<!-- image idea: the suggestion card open under an underlined word, showing replacements and the two actions -->

## Choosing a note's languages

A note's own menu carries a **Spelling** submenu, with the note's current languages on the row itself.

**Use my defaults** is a state rather than a snapshot: a note left on it follows the Settings list as that list changes, while ticking a language pins that note to its own set. **Don't check this note** turns it off entirely, and the same submenu holds **Words ignored here** and a shortcut to **Spelling settings**.

## Your dictionary and the ignore list

**Your dictionary** on the Spelling page holds every word you have taught the checker; **Manage** opens the full list with a field to add another. A word applies to all languages unless you narrow it: each row's menu has an **Applies to** choice offering **All languages** or one installed dictionary. Adding from a card always adds for all languages.

**Ignore in this note** is separate and local. **Words ignored here** lists what one note accepts, and lifting an ignore is undoable from the message that follows it.

Both lists apply live: teach the checker a word and its underlines go in every open note at once.

## Related

- [Formatting text](./formatting-text.md) for the marks and shortcuts spelling runs alongside.
- [Tuning the editor](../../customization/editor-appearance.md) for the rest of the editor's settings.
- [Language](../../customization/language.md) for the app's own interface language, which is a separate choice.
