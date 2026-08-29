---
title: Writing cards
description: Material and card types, cloze, formulas, images, and templates.
order: 2
---

The card editor is a small dialog with a big job: get what you know into the deck fast enough that you write the next one. What you type into it is not a card: it is a piece of material, and the card type decides how many cards come out of it.

## Material and card types

A card type is a set of named fields plus the cards those fields make. **Basic** takes a Front and a Back and makes one card. **Basic and reverse** takes the same two and makes two, one in each direction. **Vocabulary** takes Word, Meaning, and Example, and makes up to three. The type is fixed once the material is saved.

`Ctrl+Enter` saves (`Cmd+Enter` on macOS). Saving new material keeps the dialog open, holding the deck, card type, and tags for the next one. Tags attach to the material and become filters in the deck view later.

<!-- image idea: the card editor with the card count bar under the fields -->

## Cloze

**Cloze** hides pieces of a sentence instead of pairing two sides. Wrap what to hide with `{{c1::like this}}`, or select it and press `Ctrl+Shift+C`. Each number makes its own card, blanking its own piece and showing the others as context, and the Extra field rides along on the back of all of them.

```text
The {{c1::hippocampus}} consolidates memory during {{c2::sleep::stage}}.
```

That is two cards. A hint after a second pair of colons, `::stage` above, shows in place of the blank.

## Formulas and images

Formulas are LaTeX between dollar signs, `$E_k$` inline or `$$` on its own line, rendered through KaTeX during study; one that will not parse is shown marked, exactly as you typed it.

Each field takes up to three images. Paste them or drop them on the field; PNG, JPEG, GIF, and WebP work, up to 20 MB each. An image follows its field onto whichever card shows it, and can be clicked to zoom during a session.

## Managing card types

**Card types** on the deck menu opens the manager; types are collection wide, not per deck. A card is a front and a back template, each naming a field by writing it as `{{Front}}`. **Only when** holds a card back until one named field is filled, which is what keeps Vocabulary's third card dormant.

The four types that ship cannot be deleted, and neither can one that still holds material. Saving updates every card those types already make, so a template change reaches the whole collection at once.

## Related

- [First steps](./first-steps.md) for what makes a card worth writing.
- [Organizing the library](./organizing-the-library.md) for the tag and state filters in a deck.
