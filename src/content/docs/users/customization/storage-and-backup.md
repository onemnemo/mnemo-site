---

title: Storage and backup
description: Find your data, create backups, and restore your library.
order: 7
---

Manage your local data under **Settings → Storage & data**.

Mnemo stores your library on your device. Backups let you save a copy of that data in a single file.

## Data folder

Use **Data folder → Open** to open Mnemo's data folder in your file manager.

| Platform        | Data folder                                      |
| --------------- | ------------------------------------------------ |
| Windows         | `%LOCALAPPDATA%\Mnemo`                           |
| macOS and Linux | `Mnemo` in your local application data directory |

You can set `MNEMO_DATA_DIR` to use a different data folder.

## Create a backup

Choose **Back up** to create a `.mnemo-backup` file.

A backup includes:

* notes and folders
* flashcards
* mindmaps
* saved conversations
* trash
* images and attachments
* settings that can move between devices

Sensitive or device-specific data, including API keys, sign-ins, and downloaded models, is not included.

<!-- image idea: the Storage and data page showing the backup and restore rows -->

## Restore a backup

Choose **Choose backup** and select a `.mnemo-backup` file.

Mnemo will show a summary of the backup before restoring it, including when it was created and what it contains.

Restoring a backup replaces your current library. Mnemo restarts to complete the restore.

Your previous data is kept temporarily in the `restore-recovery` folder inside the Mnemo data folder in case you need to recover it.

## Copy the data folder manually

You can also back up Mnemo by copying the entire data folder.

Close Mnemo before copying it.

Unlike a `.mnemo-backup` file, a full folder copy also includes device-specific data such as local settings and API keys.

## Related

* [Trash](./trash.md)
* [Installing Mnemo](../getting-started/installation.md)
* [Import and export](../modules/flashcards/import-and-export.md)
