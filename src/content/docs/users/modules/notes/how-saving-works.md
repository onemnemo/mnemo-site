---
title: How saving works
description: Autosave, the save pill, and why Mnemo never overwrites your work.
order: 7
---

There is no save button. Mnemo saves a moment after you stop typing, and never lets more than a few seconds of work sit unsaved. Most days you will never think about it; this page exists for the days you do.

## The save pill

A quiet pill in the bar above the editor tells you where things stand:

- **Unsaved changes**, then **Saving...**, then **Saved** is the normal heartbeat of a writing session.
- **Couldn't save** means a save failed. Mnemo retries a few times on its own, and any new edit starts the cycle again.
- **Changed somewhere else** is the special one, covered below.

Closing the window is safe: Mnemo finishes the final save before it lets the window go.

## Changed somewhere else

If the note was written by something else since you opened it, Mnemo stops saving rather than overwrite that other version. This is deliberate; the app refuses to pick a winner between two versions of your work.

The pill offers a Reload button, which adopts the other version. Anything you typed in this window that had not saved yet is not in that version, so if you wrote something you care about, copy it out before reloading.

## Where your notes live

Everything is stored locally in Mnemo's data folder, as covered in [Installing Mnemo](../../getting-started/installation.md#where-your-data-lives). Back that folder up and your notes are backed up.
