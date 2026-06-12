---
title: Data Storage
description: Where local durable state lives — SQLite databases, blob paths, and settings.
category: Architecture
order: 17
---

## Purpose

Documents where **local durable state** lives conceptually: SQLite databases, blob paths, and settings — not every table name.

## Code Location

- Abstraction: `IStorageProvider` (Core) / `SqliteStorageProvider` (Infrastructure)
- Typical consumers: `Mnemo.Infrastructure/Services/Notes`, flashcard services, vector store, statistics, settings

## Main Interfaces / Classes

| Interface | Responsibility |
| --- | --- |
| `IStorageProvider` | Connection/path abstraction for SQLite-backed features |
| `ISettingsService` | Key/value application settings |
| `INoteService` / folder services | Note graph atop storage |

Inspect `Mnemo.Infrastructure` for concrete paths and migration hooks when you change schema.

## Startup / Registration

`SqliteStorageProvider` registers as a **singleton** in **`Bootstrapper`** before modules; services depending on storage resolve after provider build.

## How to Extend

1. Prefer **schema migrations** co-located with the service that owns the table set — avoid ad hoc `Ensure*` scattered unless pattern already established.
2. New export formats go through **import/export coordinators** (`IContentFormatAdapter`, package handlers) rather than raw file operations from UI.

## Gotchas

- Long migrations on main thread freeze UI — follow async patterns and existing background seeds (`Task.Run` fire-and-forget only when explicitly intentional).
- **Backups**: document user-facing backup paths per installer when shipping docs for compliance.

---

Related: [Infrastructure](/docs/developers/architecture/infrastructure)
