---
title: Core Layer
description: Mnemo.Core holds shared contracts, domain models, and enums used across the codebase.
category: Architecture
order: 11
---

## Purpose

**Mnemo.Core** holds shared **contracts** (interfaces), **domain models**, and enums used by Infrastructure and UI. It stays free of Avalonia, SQLite drivers, and concrete AI stacks so tests and alternative hosts can reference it cheaply.

## Code Location

- `Mnemo.Core/` — projects split by area (`Models`, `Services`, etc.).

## Main Interfaces / Classes

| Area | Examples |
| --- | --- |
| Modules | `IModule`, `IServiceRegistrar` |
| Navigation | `INavigationService`, `INavigationRegistry` |
| Shell services | `ILocalizationService`, `ISettingsService` |
| Search | `ISearchProvider` and related contracts |

Browse `Mnemo.Core/Services` for the authoritative list.

## Startup / Registration

Core types do **not** self-register. **`Bootstrapper`** in UI registers implementations that satisfy Core interfaces.

## How to Extend

1. Add or extend an **interface** in `Mnemo.Core` if multiple implementations are plausible or you need abstraction for tests.
2. Keep **DTOs and enums** close to the feature domain in `Mnemo.Core/Models`.

## Gotchas

- Do **not** add package references that drag UI or database drivers into Core.
- Avoid fat interfaces that force every consumer to depend on unrelated methods — split by role.

---

Related: [Infrastructure](/docs/developers/architecture/infrastructure) · [Dependency injection](/docs/developers/architecture/dependency-injection)
