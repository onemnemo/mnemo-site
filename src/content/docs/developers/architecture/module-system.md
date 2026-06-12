---
title: Module system and DI
description: How features plug into the app through IModule, and how dependency injection is wired.
category: Architecture
order: 12
---

Every feature in Mnemo is a module. A module is one class implementing `IModule` that declares everything its feature contributes: services, routes, sidebar entries, translations, keybinds, AI tools, and dashboard widgets. The bootstrapper discovers modules by reflection, so adding a feature never means editing a central list.

## The contract

```csharp
// Mnemo.Core/Services/IModule.cs
public interface IModule
{
    void ConfigureServices(IServiceRegistrar services);
    void RegisterTranslationSources(ITranslationSourceRegistry registry);
    void RegisterRoutes(INavigationRegistry registry);
    void RegisterSidebarItems(ISidebarService sidebarService);
    void RegisterTools(IFunctionRegistry registry, IServiceProvider services);
    void RegisterWidgets(IWidgetRegistry registry, IServiceProvider services);
    void RegisterKeybindManifest(IKeybindManifestRegistry registry) { }
}
```

The first three registration methods run before the DI container is built; `RegisterTools` and `RegisterWidgets` run after and receive the live provider. The [startup flow](/docs/developers/architecture/startup-flow) page shows the exact ordering.

`IServiceRegistrar` exists so modules can register services without Core taking a dependency on `Microsoft.Extensions.DependencyInjection`. It is a thin wrapper over `IServiceCollection` (`Mnemo.UI/Services/ServiceRegistrar.cs`) exposing `AddSingleton` and `AddTransient`, including factory overloads.

## The modules that exist

| Module | Routes | Notes |
| :--- | :--- | :--- |
| `CoreUIModule` | none | Shell view models, global and editor keybind manifests, app-level AI tools |
| `OverviewModule` | `overview` | Dashboard and its five widgets |
| `NotesModule` | `notes` | Notes library session, search provider, editor keybinds |
| `MindmapModule` | `mindmap`, `mindmap-detail` | Custom view-model factory, mind map AI tools |
| `FlashcardsModule` | `flashcards`, `flashcard-deck`, `flashcard-practice` | |
| `ChatModule` | `chat` | AI-gated |
| `PathModule` | `path`, `path-detail` | AI-gated |
| `SettingsModule` | `settings` | Settings AI tools |
| `OnboardingModule` | none | First-run overlay only |
| `UpdatesModule` | none | Update orchestrator |
| `StatisticsModule` | none | Statistics schemas and AI tools, no UI |

All live under `Mnemo.UI/Modules/<Feature>/`, except `CoreUIModule` which sits at the folder root. `NotesModule` is the best reference implementation.

## Lifetimes

The conventions are consistent across the codebase:

- **Singletons** for shared state and infrastructure: storage, settings, navigation, the notes library session, history manager, all AI services.
- **Transients** for route view models. The navigation service resolves a fresh view model per navigation and disposes the previous one.
- **Factory registrations** where a view model needs a private object graph. `MindmapModule` registers `MindmapViewModel` through a factory so the editor session, history, and graph mutator all share one graph state per instance; resolving them independently would break editing.

Module classes themselves are created with `Activator.CreateInstance` and therefore need a public parameterless constructor. Dependencies belong in the services a module registers, not in the module class.

## Adding a module

1. Create `Mnemo.UI/Modules/YourFeature/YourFeatureModule.cs` implementing `IModule`.
2. `ConfigureServices`: register your view models as transients and any feature services. Register an `ISearchProvider` if the feature should appear in global search.
3. `RegisterRoutes`: map a stable route key to your view model type.
4. `RegisterSidebarItems`: pass the localized title key, route, `avares://` icon path, section, and sort order.
5. Optional: translations (embedded JSON under a `Translations/` folder), a keybind manifest, AI tools, widgets.
6. Build. Discovery picks the class up automatically.

## Pitfalls

- A module constructor that throws is silently skipped during discovery. The feature just never appears.
- Route keys must be unique across all modules, and the sidebar item's route string must match the registered route exactly. A mismatch breaks sidebar clicks without an error.
- Discovery order is not deterministic. Do not rely on one module registering before another.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Contract | `Mnemo.Core/Services/IModule.cs` |
| Registrar abstraction | `Mnemo.Core/Services/IServiceRegistrar.cs`, `Mnemo.UI/Services/ServiceRegistrar.cs` |
| Discovery | `Mnemo.UI/Services/Bootstrapper.cs` |
| Reference module | `Mnemo.UI/Modules/Notes/NotesModule.cs` |
