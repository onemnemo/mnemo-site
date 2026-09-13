---
title: Storage and backup
description: The data folder, the one file backup, and restoring from it.
order: 7
---

Everything Mnemo knows sits in one folder on your machine, and Settings under Storage & data folds that folder into a single file and puts it back. Nothing holds a second copy for you, so the backup you make is the only one there is.

## Where your data lives

**Location** carries one row, **Data folder**, whose **Open** button shows the folder in your file manager. Mnemo creates it on first launch and keeps the database, your images, and the files attached to notes, maps, and conversations there.

| Platform        | Data folder                                                        |
| --------------- | ------------------------------------------------------------------ |
| Windows         | `%LOCALAPPDATA%\Mnemo`                                             |
| macOS and Linux | A `Mnemo` folder in the per-user local application data directory  |

Setting `MNEMO_DATA_DIR` overrides that root wholesale, which is how a second install runs against its own profile. The logs move with it: Settings under About has a **Log folder** row with an **Open** button of its own, and it resolves inside whichever root is in force.

## Making a backup

**Back up your data** writes one `.mnemo-backup` file wherever you choose to put it, named for the date. **Back up** opens the save dialog; once the destination is settled, a toast named after the file tracks the work and turns into **Backup complete** or **Backup failed**.

The file carries your notes, flashcards, mind maps, conversations, trash, the settings that travel between machines, and the images and files inside all of them. API keys, sign-ins, downloaded models, and settings describing this particular machine are stripped as the file is written, so they are not in it to leak and not in it to restore.

<!-- image idea: the Storage and data page showing the backup and restore rows -->

## Restoring one

**Choose backup** opens a file picker, and Mnemo validates the archive before offering you anything, so a file it cannot read is refused here instead of halfway through. What passes opens a preview, **Restore this backup?**, showing when it was made, the Mnemo version that made it, whether it came from this collection or another, and a count for each of **Notes and folders**, **Flashcards**, **Mind maps and folders**, **Items in trash**, **Saved conversations**, and **Images and files**.

A restore replaces everything, so it happens on the way up rather than inside a running app: **Restore backup** asks once more, and **Restore and restart** closes Mnemo, swaps the profile before the database opens, and starts again. The data that was here is not deleted; it moves into `restore-recovery` inside the data folder, and the toast after the restart names the copy. Only the newest copy is kept. Restoring needs the desktop app.

## Copying the folder by hand

The fallback is the folder itself: close Mnemo, then copy the whole data folder somewhere safe. Putting that copy back restores the application whole, machine settings and API keys included, which the backup file deliberately leaves out. Copy it with Mnemo closed, or you capture a database mid-write.

## Related

- [Trash](./trash.md) covers the other recovery path, for one deleted item rather than everything.
- [Installing Mnemo](../getting-started/installation.md) has the rest of what first launch creates.
- [Import and export](../modules/flashcards/import-and-export.md) moves single decks instead of the whole profile.
