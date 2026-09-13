---
title: The layers
description: Core, Infrastructure, Host, and the web UI, and what belongs where.
order: 1
---

Mnemo is a local-first desktop app built as strict layers. The rule that holds everything together: contracts point inward, implementations point outward, and nothing reaches across.

## The four layers

**Mnemo.Core** is the contract layer: service interfaces, domain models, enums, and pure logic. It depends on essentially nothing and contains no implementations.

**Mnemo.Infrastructure** implements those contracts against real technology: SQLite persistence, the FSRS scheduler, markdown conversion, spellcheck, the import/export adapters, the AI stack. It references Core and nothing above it.

**Mnemo.Host** is the delivery layer for the new UI: an ASP.NET Core minimal API bound strictly to loopback, plus the native window that hosts the web app. It composes the whole service graph and exposes it as REST endpoints under `/api`. See [The local API](./the-local-api.md).

**mnemo-web** is the React SPA: React, TypeScript, Vite, with the ProseMirror-based notes editor. It holds presentation state and talks to the Host through a small typed fetch wrapper; business rules stay on the C# side. Source is organized folder-by-feature (`src/notes`, `src/flashcards`, `src/settings`, and so on). For the toast, dialog, modal, and tooltip primitives a feature reaches for instead of building its own, see [Web UI primitives](../ui/index.md).

## Modules

Features are modules implementing `IModule`, with hooks for registering services, translations, keybind manifests, sidebar entries, and widgets. Modules are discovered by reflection rather than hard-coded, so adding a feature does not mean editing a central registry. `Mnemo.Host/Composition/HostComposition.cs` replays each module's hooks itself: `ConfigureServices` builds the service graph while the Host is starting up, and `RegisterSidebarItems` and `RegisterWidgets` run once it is built. The Host's own headless shell, in `Mnemo.Host/HeadlessShell`, then satisfies the Core interfaces those services expect, such as `IThemeService`, `IOverlayService`, `IToastService`, and `INavigationService`, in place of a UI toolkit.

## Where code goes

| You are writing                     | It goes in                             |
| ----------------------------------- | -------------------------------------- |
| A service interface or domain model | `Mnemo.Core`                           |
| An implementation of one            | `Mnemo.Infrastructure`                 |
| An HTTP endpoint                    | `Mnemo.Host`, in that feature's folder |
| A screen, component, or UI state    | `mnemo-web/src/<feature>`              |

A change that spans layers lands as: interface in Core, implementation in Infrastructure, endpoint in Host, consumption in mnemo-web, in that order.

## Related

- [Web UI primitives](../ui/index.md) for the toast, dialog, modal, and tooltip building blocks most `mnemo-web` features reach for.
- [The local API](./the-local-api.md) for how mnemo-web reaches the Host.
