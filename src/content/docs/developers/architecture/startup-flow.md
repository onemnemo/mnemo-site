---
title: Startup Flow
description: Ordering guarantees during cold start — what runs before and after ServiceProvider exists.
category: Architecture
order: 14
---

## Purpose

Describe **ordering guarantees** during cold start: what runs before `ServiceProvider` exists, what runs after, and where modules plug in.

## Code Location

- `Mnemo.UI/App.axaml.cs` — Avalonia lifetime; creates `MainWindow`.
- `Mnemo.UI/Services/Bootstrapper.cs` — DI composition, module discovery, post-build registration.

## Main Interfaces / Classes

- **`Bootstrapper.Build`** — static factory returning root `IServiceProvider`.
- **`App`** — assigns `Services`, applies theme continuation, shows main window synchronously (no `Task.Run` around shell creation).

## Lifecycle

1. **App starts** (`App.OnFrameworkInitializationCompleted`).
2. **`Bootstrapper.Build()`** creates `ServiceCollection`.
3. **Infrastructure + shared UI services** register (storage, AI stack, navigation hosts, registries, …).
4. **`DiscoverModules()`** scans loaded `Mnemo.*` assemblies for concrete **`IModule`** types and instantiates them via `Activator.CreateInstance`.
5. **Translation sources** aggregate → **`LocalizationService`** registers.
6. Each module **`ConfigureServices`** runs via **`ServiceRegistrar`** wrapping the same `IServiceCollection`.
7. **Keybind manifests** aggregate → **`KeyMapService`** builds after repositories register.
8. **`BuildServiceProvider()`**.
9. Each module **`RegisterRoutes`**, **`RegisterSidebarItems`**, **`RegisterTools`**, **`RegisterWidgets`** with live `IServiceProvider`.
10. **`MainWindow`** shown; **`MainWindowViewModel`** resolves from DI.

## How to Extend

- Hook feature work in **`IModule`** methods — avoid ad hoc registration scattered outside bootstrap unless it is truly cross-cutting.
- Background seed tasks (e.g. welcome content) follow patterns inside `Bootstrapper` — do not block UI thread on DB.

## Gotchas

- Module discovery **silently skips** types that throw on construction — misconfigured parameterless constructors vanish without logs until you add diagnostics.
- Ordering: **`RegisterTranslationSources`** runs **before** provider build; tools/widgets run **after**, so they may resolve real services.

---

Related: [Dependency injection](/docs/developers/architecture/dependency-injection) · [Module system](/docs/developers/architecture/module-system)
