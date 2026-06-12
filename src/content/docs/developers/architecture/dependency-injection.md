---
title: Dependency Injection
description: How Mnemo centralizes service construction and keeps ViewModels testable via Core interfaces.
category: Architecture
order: 15
---

## Purpose

Centralize construction of long-lived services and keep ViewModels testable by depending on **interfaces** from Core.

## Code Location

- Registration: `Mnemo.UI/Services/Bootstrapper.cs`
- Core abstraction: `Mnemo.Core/Services/IServiceRegistrar.cs`
- Adapter: `Mnemo.UI/Services/ServiceRegistrar.cs` → forwards to `Microsoft.Extensions.DependencyInjection.IServiceCollection`

## Main Interfaces / Classes

| Type | Role |
| --- | --- |
| `IServiceRegistrar` | Module-facing minimal API (`AddSingleton`, `AddTransient`) without exposing full MS DI surface to Core consumers |
| `ServiceRegistrar` | Bridges `IServiceRegistrar` calls to `ServiceCollection` |
| `IServiceProvider` | Resolved root from `services.BuildServiceProvider()` |

## Startup / Registration Flow

1. **Bootstrapper** registers Infrastructure singletons and UI shell services directly on `ServiceCollection`.
2. **`ServiceRegistrar`** wraps the same collection for **`IModule.ConfigureServices`**.
3. Provider built once; modules then receive **`IServiceProvider`** for **`RegisterTools`** / **`RegisterWidgets`**.

## How to Extend

- **Cross-cutting singleton**: add in **`Bootstrapper`** near related peers (logging, storage, AI).
- **Feature-scoped VM or service**: register inside the feature **`IModule.ConfigureServices`** with transient vs singleton deliberately (VMs often transient).

## Gotchas

- Modules instantiate via **`Activator.CreateInstance`** — **parameterless constructors required** for module classes themselves.
- Capturing **`IServiceProvider`** in long-lived objects — prefer typed dependencies; service locator spread makes testing harder.

---

Related: [Module system](/docs/developers/architecture/module-system)
