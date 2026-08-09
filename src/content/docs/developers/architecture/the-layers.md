---
title: The layers
description: Core, Infrastructure, Host, and the web UI, and what belongs where.
order: 1
---

Mnemo is a local-first desktop app built as strict layers. The rule that holds everything together: contracts point inward, implementations point outward, and nothing reaches across.

## The four layers

**Mnemo.Core** is the contract layer: service interfaces, domain models, enums, and pure logic. It depends on essentially nothing and contains no implementations. If you are defining what a feature _is_, the interface lives here.

**Mnemo.Infrastructure** implements those contracts against real technology: SQLite persistence, the FSRS scheduler, markdown conversion, spellcheck, the import/export adapters, the AI stack. It references Core and nothing above it.

**Mnemo.Host** is the delivery layer for the new UI: an ASP.NET Core minimal API bound strictly to loopback, plus the native window that hosts the web app. It composes the whole service graph, exposes it as REST endpoints under `/api`, and pushes server events to the UI over a server-sent-events channel. See [The local API](./the-local-api.md).

**mnemo-web** is the React SPA: React, TypeScript, Vite, with the ProseMirror-based notes editor. It holds presentation state and talks to the Host through a small typed fetch wrapper; business rules stay on the C# side. Source is organized folder-by-feature (`src/notes`, `src/flashcards`, `src/settings`, and so on).

During the port, the original Avalonia app (**Mnemo.UI**) still builds and runs beside all of this. The Host temporarily references it for module discovery; that link is severed when the port completes.

## Modules

Features are modules implementing `IModule`, with hooks for registering services, translations, keybind manifests, and sidebar entries. Modules are discovered by reflection rather than hard-coded, which is why adding a feature does not mean editing a central registry. The Host replays each module's backend-side hooks and substitutes headless implementations for anything that used to touch Avalonia directly, so both UIs run from the same registrations.

## Where code goes

| You are writing                     | It goes in                             |
| ----------------------------------- | -------------------------------------- |
| A service interface or domain model | `Mnemo.Core`                           |
| An implementation of one            | `Mnemo.Infrastructure`                 |
| An HTTP endpoint                    | `Mnemo.Host`, in that feature's folder |
| A screen, component, or UI state    | `mnemo-web/src/<feature>`              |

When a change spans layers, it usually lands as: interface in Core, implementation in Infrastructure, endpoint in Host, consumption in mnemo-web, in that order.
