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
3. **Transactional note commits**: note bodies are written through a commit store with optimistic concurrency. Every write carries the version it was based on; a stale write is answered with 409 and the stored version, and the client decides how to rebase. This is what makes "Mnemo never overwrites another writer" true all the way down.

Migrations run at startup, before the API accepts its first request.

## Assets are files, not blobs

Images and attachments are stored as files and referenced by id from the database, never embedded as blobs. Orphaned note images are reclaimed by a mark-and-sweep pass with a grace window, which stands down while any editing session (or a second app instance) could still be holding references.

## The .mnemo package

Portable import/export uses the `.mnemo` format: a ZIP with a `manifest.json` and per-module payload folders, handled by pluggable payload handlers (notes, flashcards, mindmaps, settings). Format adapters layer on top for foreign formats: Markdown for notes, CSV and Anki packages for flashcards. If you are adding a new exportable thing, you are implementing a payload handler, not inventing a format.
