---
title: Storage
description: The SQLite key-value store, on-disk layout, file formats, and the .mnemo package.
category: Data and platform
order: 30
---

Mnemo persists everything locally. The design choice at the center: one SQLite database used as a key-value store of JSON documents, rather than a normalized schema. Services serialize whole domain objects (`Note`, `Mindmap`, the entire flashcard state) and store them under string keys. This keeps persistence code trivial and schema evolution a JSON concern, at the cost of no relational queries.

## On-disk layout

| Path (Windows) | Contents |
| :--- | :--- |
| `%LocalAppData%\Mnemo\mnemo.db` | Main database: content, settings, keybinds, statistics |
| `%LocalAppData%\Mnemo\knowledge.db` | RAG vector store, see [RAG](/docs/developers/ai/rag) |
| `%LocalAppData%\Mnemo\images\` | Image assets, one file per image block, `{blockId}.{ext}` |
| `%LocalAppData%\Mnemo\logs\` | Plain-text daily logs |
| `%LocalAppData%\mnemo\models\` | AI models (note the lowercase folder; a separate root used by the AI stack) |

Linux uses `~/.local/share/`, macOS `~/Library/Application Support/`. Paths come from `MnemoAppPaths` (`Mnemo.Infrastructure/Common/`), except the AI stack which hard-codes the lowercase `mnemo` root in `ModelRegistry`. Watch out for that split when touching paths.

## mnemo.db

Four table families share the file:

| Table | Owner | Shape |
| :--- | :--- | :--- |
| `Storage` | `SqliteStorageProvider` | `Key TEXT PRIMARY KEY, Value TEXT` (JSON) |
| `DbVersion` | `SqliteStorageProvider` | Stamped 1 on creation; no migration pipeline exists yet |
| `keybind_overrides` | `SqliteKeybindRepository` | Per-action JSON override documents |
| `Statistics` | `SqliteStatisticsStore` | Composite key (namespace, kind, key) plus JSON fields |

`IStorageProvider` is the Core abstraction nearly everything saves through. `SqliteStorageProvider` serializes JSON on the thread pool before writing, so large saves do not block the UI thread. Tables are created lazily on first access.

Key conventions in the `Storage` table:

| Key pattern | Content |
| :--- | :--- |
| `notes_index`, `note_{id}` | Note ID list, individual notes |
| `note_folders_index`, `note_folder_{id}` | Folder tree |
| `mindmaps_list`, `mindmap_{id}` | Mind maps |
| `flashcards.state.v2` | The whole flashcard domain in one document, including session history |
| `learning_paths_index`, `path_{id}` | Learning paths |
| `chat_module_history` | AI chat history |
| `overview_dashboard_layout` | Widget layout |
| `App.Language`, `Appearance.Theme`, ... | One row per setting |

## Versioning and migration

There is no migration framework. What exists today:

- `BlockJsonConverter` migrates legacy note JSON shapes on read (old `content` strings, `inlineRuns`).
- The flashcard state key carries a version suffix (`.v2`).
- `MindmapService` has a stubbed version check with no migration logic behind it.
- `DbVersion` is written but never read for upgrades.

If you change a persisted shape, follow the converter pattern: keep reading the old shape, write the new one.

## The .mnemo package

`.mnemo` is the portable export format: a ZIP with a `manifest.json` listing typed payload entries (`{ version: 1, format: "mnemo-package", entries: [...] }`). `MnemoPackageService` (`Mnemo.Infrastructure/Services/Packaging/`) dispatches each entry to a payload handler:

| Payload | Files inside the zip |
| :--- | :--- |
| `notes` | `notes.db` (a temp SQLite of note and folder JSON) plus `assets/images/` |
| `flashcards` | `flashcards.db` |
| `mindmaps` | `data.json` |
| `settings` | `settings.json` |

Package version must be exactly 1 or import is rejected. Import options support duplicating on conflict and strict handling of unknown payload types. Adding a new payload type means a new `IMnemoPackagePayloadHandler` plus registration.

## What does not exist

No automatic backups, no crash-recovery journal, and no cloud sync. Durability rests on debounced autosave to SQLite. Network access in the entire app is limited to update checks, AI model downloads, and the opt-in developer teacher model.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Paths | `Mnemo.Infrastructure/Common/MnemoAppPaths.cs` |
| Key-value store | `Mnemo.Infrastructure/Services/SqliteStorageProvider.cs` |
| Notes and folders | `Mnemo.Infrastructure/Services/NoteService.cs`, `NoteFolderService.cs` |
| Packages | `Mnemo.Infrastructure/Services/Packaging/` |
| Statistics store | `Mnemo.Infrastructure/Services/.../SqliteStatisticsStore.cs` |
