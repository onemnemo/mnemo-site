---
title: Writing cards
description: Card types, cloze deletions, formulas, and images.
order: 2
---

The card editor takes a set of fields and a card type, and the card type decides how many cards are made from them.

## Card types

- **Basic.** Front and Back, one card.
- **Basic and reverse.** The same two fields, one card in each direction.
- **Vocabulary.** Word, Meaning, and Example, up to three cards.
- **Cloze.** One text with blanks, one card per blank.

The card type cannot be changed after saving.

`Ctrl+Enter` saves (`Cmd+Enter` on macOS). After saving a new card the dialog stays open with the same deck, card type, and tags, ready for the next one. Tags become filters in the deck view.

<!-- image idea: the card editor with the card count bar under the fields -->

## Cloze

Wrap the text to hide in `{{c1::...}}`, or select it and press `Ctrl+Shift+C`. Each number makes its own card, and the other blanks show as context. Add a hint after a second pair of colons.

```text
The {{c1::hippocampus}} consolidates memory during {{c2::sleep::stage}}.
```

This makes two cards. The second shows "stage" in place of the blank. The Extra field appears on the back of every card.

## Formulas and images

Write LaTeX between dollar signs: `$E_k$` inline, or `$$` on its own line for display math. Invalid LaTeX is shown as typed.

Each field holds up to three images. Paste or drop them onto the field. PNG, JPEG, GIF, and WebP are supported, up to 20 MB each. Click an image during a session to zoom in.

## Managing card types

**Card types** on a deck's menu opens the card type manager. Card types are shared across the whole collection, not per deck.

A card type is a set of fields plus front and back templates that reference those fields as `{{Front}}`. **Only when** holds a card back until a named field is filled; Vocabulary uses it so the third card is only made when Example has content.

The four built-in types cannot be deleted, and neither can a type that still has cards. Saving a template change updates every existing card of that type.

## Related

- [First steps](./first-steps.md) covers what makes a card worth writing.
- [Organizing the library](./organizing-the-library.md) covers tags and filters in the deck view.
