---
title: Module System
description: How Mnemo discovers and loads feature modules for routes, sidebar, DI, and more.
category: Architecture
order: 16
---

## Purpose

Explain how Mnemo **discovers** and **loads** feature modules: routes, sidebar entries, DI, translations, AI tools, widgets, and keybind manifests — without hard-coding every feature in one startup file.

## Code Location

- Contract: `Mnemo.Core/Services/IModule.cs`
- Discovery + orchestration: `Mnemo.UI/Services/Bootstrapper.cs`
- Implementations: `Mnemo.UI/Modules/**/*.cs` (e.g. `NotesModule`, `MindmapModule`, `CoreUIModule`)

## Key Concepts

| Concept | Meaning |
| --- | --- |
| Module contract | `IModule` — feature package entry point |
| Auto-discovery | Reflection scan for assignable types in loaded `Mnemo.*` assemblies |
| DI registration | `ConfigureServices(IServiceRegistrar)` adds VMs/services |
| Navigation integration | `RegisterRoutes(INavigationRegistry)` maps route keys to view model types |
| Sidebar integration | `RegisterSidebarItems(ISidebarService)` supplies icons, order, grouping |
| AI tools / widgets | `RegisterTools`, `RegisterWidgets` after `IServiceProvider` exists |

## The IModule Interface

```csharp
public interface IModule
{
    void ConfigureServices(IServiceRegistrar services);
    void RegisterTranslationSources(ITranslationSourceRegistry registry);
    void RegisterRoutes(INavigationRegistry registry);
    void RegisterSidebarItems(ISidebarService sidebarService);
    void RegisterTools(IFunctionRegistry registry, IServiceProvider services);
    void RegisterWidgets(IWidgetRegistry registry, IServiceProvider services);
    void RegisterKeybindManifest(IKeybindManifestRegistry registry);
}
```

Reference implementation: `Mnemo.UI/Modules/Notes/NotesModule.cs`.

## Lifecycle

1. App starts → `Bootstrapper.Build()`.
2. Core/Infrastructure/UI shell services register.
3. **`DiscoverModules()`** collects `IModule` instances.
4. **`RegisterTranslationSources`** → localization provider registers.
5. **`ConfigureServices`** for each module → VMs/providers available at resolve time.
6. **`RegisterKeybindManifest`** aggregates chords.
7. **`BuildServiceProvider()`**.
8. **`RegisterRoutes`**, **`RegisterSidebarItems`**, **`RegisterTools`**, **`RegisterWidgets`**.
9. UI shows **`MainWindow`**; **`NavigationService`** drives workspace VM from route IDs.

## Adding a New Module

1. Create `Mnemo.UI/Modules/YourFeature/YourFeatureModule.cs` implementing **`IModule`** (public class, **parameterless ctor**).
2. **`ConfigureServices`**: `AddTransient` for view models; register **`ISearchProvider`** if the feature participates in global search.
3. **`RegisterTranslationSources`**: embed JSON resources if localized strings live with the module.
4. **`RegisterRoutes`**: `registry.RegisterRoute("your-route", typeof(YourViewModel))` — key must stay stable for deep links.
5. **`RegisterSidebarItems`**: supply localized title key, route id, `avares://` icon path, section name, sort order.
6. **`RegisterTools`**: optional — delegate to a registrar class pattern to keep the module lean.
7. **`RegisterWidgets`**: optional dashboard tiles.
8. **`RegisterKeybindManifest`**: optional static chord declarations for user-editable binds.
9. Build — discovery picks up any new **`IModule`** in the `Mnemo.UI` assembly automatically.

## Gotchas

- **Silent ctor failures**: exceptions inside `Activator.CreateInstance` are swallowed during discovery — your module simply never loads.
- **Order**: route IDs must not collide; last registration wins depends on registry implementation — avoid duplicate keys.
- **Sidebar vs routes**: mismatch between sidebar `route` argument and `RegisterRoute` key breaks navigation clicks.
- **Plugins**: external modules must be loaded into `AppDomain` early enough to appear in the assembly scan.

---

Related: [Startup flow](/docs/developers/architecture/startup-flow) · [UI](/docs/developers/architecture/ui)
