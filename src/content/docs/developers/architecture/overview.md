---
title: Architecture Overview
description: The three layers of Mnemo and the direction dependencies flow.
category: Architecture
order: 10
---

## Purpose

Give contributors a single mental model before touching files: **what runs where**, and **which direction dependencies flow**.

## Code Location

- **Solution**: multiple projects under repo root; primary boundaries are `Mnemo.Core`, `Mnemo.Infrastructure`, `Mnemo.UI`.

## The Three Layers

| Layer | Responsibility | Depends on |
| --- | --- | --- |
| **Mnemo.Core** | Domain models, service interfaces, cross-cutting contracts without implementations | Baseline BCL / nothing UI |
| **Mnemo.Infrastructure** | SQLite storage, AI orchestration, note/flashcard services, import/export, platform glue | Core interfaces |
| **Mnemo.UI** | Avalonia views/view models, module classes, shell (`MainWindow`), user-visible workflows | Core + Infrastructure |

**Rule of thumb:** Core never references Infrastructure or UI. UI references Infrastructure for composition root wiring inside `Bootstrapper`.

## Main Interfaces / Classes

- **`Bootstrapper`** (`Mnemo.UI/Services/Bootstrapper.cs`) — composition root: registers Infrastructure + UI services, discovers `IModule`, builds `IServiceProvider`.
- **`IModule`** (`Mnemo.Core/Services/IModule.cs`) — feature plugin contract for routes, sidebar, DI, tools, widgets, translations, keybind manifests.

## How to Extend

- New **business capability** that must stay testable: define interface in **Core**, implement in **Infrastructure**, consume from UI/modules.
- New **screen**: implement or extend an **IModule** in UI (see [Module system](/docs/developers/architecture/module-system)).

## Gotchas

- Putting implementations in Core breaks layering, and bloating Core models with UI types pollutes everyone.
- Starting async work inside `App.OnFrameworkInitializationCompleted` incorrectly can break Avalonia desktop lifetime — follow patterns in `App.axaml.cs`.

---

Next: [Core](/docs/developers/architecture/core) · [Infrastructure](/docs/developers/architecture/infrastructure) · [UI](/docs/developers/architecture/ui)
