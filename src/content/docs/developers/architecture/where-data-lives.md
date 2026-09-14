---
title: Where data lives
description: One SQLite file, three storage shapes, and the .mnemo package.
order: 3
---

All user data sits in a per-user data folder (on Windows, `%LOCALAPPDATA%\Mnemo`; overridable with the `MNEMO_DATA_DIR` environment variable). The centerpiece is a single SQLite database, `mnemo.db`, with asset files beside it: note images, shared block assets, chat attachments.

## Three shapes in one database

Different data has different consistency needs, so `mnemo.db` hosts three storage patterns:

1. **A generic key-value table** of JSON documents, behind the `IStorageProvider` interface. Settings and most module state live here.
2. **A relational flashcard schema**: folders, decks, cards, presets, scheduling, and the append-only review log, running in WAL mode with a single serialized writer and pooled readers.
3. **Transactional note commits**: note bodies are written through a commit store with optimistic concurrency. Every write carries the version it was based on; a stale write is answered with 409 and the stored version, and the client decides how to rebase.

Migrations run at startup, before the API accepts its first request.

## Assets are files, not blobs

Images and attachments are stored as files and referenced by id from the database, never embedded as blobs. Orphaned note images are reclaimed by a mark-and-sweep pass with a grace window, which stands down while any editing session (or a second app instance) could still be holding references.

## The .mnemo package

Portable import/export uses the `.mnemo` format: a ZIP with a `manifest.json` and per-module payload folders, handled by pluggable payload handlers (notes, flashcards, mindmaps, settings). Format adapters layer on top for foreign formats: Markdown for notes, CSV and Anki packages for flashcards. If you are adding a new exportable thing, you are implementing a payload handler, not inventing a format.

## Profile backup and restore

`Mnemo.Host/Backup/ProfileBackupEndpoints.cs` maps `/api/backups/export`, `/api/backups/select`, `/api/backups/restore`, and `/api/backups/restore/restart`. A backup is a `.mnemo-backup` ZIP: a `manifest.json` (creation time, source app version, a collection id, a content summary) beside a sanitized `profile.db` snapshot and copies of the managed asset directories. `ProfileBackupService.CreateAsync` takes the snapshot inside a rolled-back SQLite transaction, so the export is internally consistent without holding writers for longer than the copy takes.

Restore is a validated handoff, not an in-place overwrite. Selecting a file returns an inspection (source version, whether it is from this same collection) and a short-lived grant; `/api/backups/restore` stages the archive under `restore-staging` without touching the live profile; `/api/backups/restore/restart` restarts the app, and the swap itself runs in `ProfileRestoreStartup.ApplyPendingAsync` before the database opens. The previous `mnemo.db` and asset directories move into `restore-recovery/<timestamp>-<operationId>` first, and a journal on disk rolls an interrupted swap back automatically on the next start; only the most recent recovery copy is kept.

## The application trash

Deleting a deck, a note, or a mindmap leaves its rows and files in place. Each module owns an `ITrashSource` per kind it deletes and captures the item into a shared ledger, with the snapshot the trash needs to put it back, in one module transaction. Retention is 30 days from deletion (`TrashRetention.Days`).

`Mnemo.Host/Trash/TrashEndpoints.cs` maps `/api/trash` (listing, paged and filterable), single and bulk `restore`, `restore` by batch, `DELETE /api/trash/{entryId}` to purge, and `/api/trash/empty`. A purge that would strand rows another entry still owns answers with a 409 naming them, instead of a bare error.

`TrashMaintenance` runs a background loop, started only once Kestrel is listening: it reconciles the ledger against each source at startup, then sweeps expired entries and hands orphaned files to `AssetCleanupWorker`, hourly or on demand.

## Related

- [Storage and backup](../../users/customization/storage-and-backup.md) is the user-facing side of backup and restore.
- [Trash](../../users/customization/trash.md) is the user-facing side of the trash ledger.
