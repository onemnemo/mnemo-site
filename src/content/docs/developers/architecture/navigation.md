---
title: Navigation
description: View-model-first routing, view resolution by convention, and AI route gating.
category: Architecture
order: 13
---

Navigation is view-model-first. A route is a string key that maps to a view model type. Navigating resolves the view model from DI, and Avalonia finds the matching view by naming convention. Views never navigate to other views directly.

## The flow

1. Something calls `INavigationService.NavigateTo(route, parameter)`. Usually the sidebar, sometimes a feature view model (for example, the deck list navigating to `flashcard-deck`).
2. `NavigationService` (`Mnemo.UI/Services/NavigationService.cs`) looks the route up in its registry and resolves the view model type from the service provider. Route view models are transient, so each navigation gets a fresh instance.
3. If the view model implements `INavigationAware`, `OnNavigatedTo(parameter)` runs. This is how detail pages receive their subject, for example which deck to show.
4. The previous view model is disposed if it implements `IDisposable`, `CurrentViewModel` changes, and the `Navigated` event fires.
5. `MainWindow.axaml` binds a `ContentControl` to `Navigation.CurrentViewModel`. The global `ViewLocator` (`Mnemo.UI/ViewLocator.cs`) maps the view model type to a view by replacing `ViewModels` with `Views` and `ViewModel` with `View` in the type name, then instantiates it.

The convention in step 5 is the one hard requirement: a view model in `...ViewModels.FooViewModel` must have a view at `...Views.FooView`, or the workspace shows nothing.

## Route registration

Modules register routes during bootstrap:

```csharp
registry.RegisterRoute("flashcard-deck", typeof(FlashcardDeckDetailViewModel));
```

Route keys are referenced from sidebar items, search results (`SearchNavigationTarget`), and AI tools (`navigate_to`), so treat them as a public, stable surface.

## AI gating

`NavigationService` watches the `AI.EnableAssistant` setting. The routes `chat`, `path`, and `path-detail` redirect to `overview` while the assistant is disabled. Turning the assistant off while on one of those routes resets the stack and navigates home. If you add an AI-only route, this is where the gate lives.

## Known limitation: the back stack

The history stack is push-only. `CanGoBack` is exposed, but there is no `GoBack()`; nothing ever pops except the AI-disable reset. Breadcrumb navigation pushes a new entry rather than truncating the trail. Treat the back stack as unfinished; do not build features that depend on it.

## Side effects

`NavigationStatisticsTracker` subscribes to `Navigated` and records dwell time per route into the statistics store. The keybind system also follows navigation: `IKeyMap.SetActiveRoute` switches which local keybind namespace is active.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Contracts | `Mnemo.Core/Services/INavigationService.cs`, `INavigationRegistry.cs`, `INavigationAware.cs` |
| Implementation | `Mnemo.UI/Services/NavigationService.cs` |
| View resolution | `Mnemo.UI/ViewLocator.cs`, registered in `Mnemo.UI/App.axaml` |
| Host control | `Mnemo.UI/Views/MainWindow.axaml` |
| Dwell tracking | `Mnemo.UI/Services/NavigationStatisticsTracker.cs` |
