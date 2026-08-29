---
title: How saving works
description: The save shortcut, the conflict warning, and turning autosave off.
order: 10
---

Mnemo saves as you write, and there is no save button. `Ctrl+S` (`Cmd+S` on macOS) writes immediately.

## When a save goes wrong

The status line in the note's top right corner is blank until a save fails: **Retrying...** covers three attempts, **Couldn't save** means they ran out, and **Recovered** means a later one landed.

**Changed somewhere else** is the one to act on. The note was written by something else since you opened it, so Mnemo stopped saving rather than overwrite that version. **Reload** adopts the other version and discards whatever you typed here that had not saved yet, so copy that out first.

## Turning autosave off

**Auto-save** lives in Settings under Editor and is on by default. With it off you decide when the note is committed, with `Ctrl+S`. Closing a note or the window saves either way.

## Related

- [Tuning the editor](../../customization/editor-appearance.md) for the rest of Settings under Editor.
