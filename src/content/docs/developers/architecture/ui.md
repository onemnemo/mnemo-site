---
title: UI Layer
description: Mnemo.UI is the Avalonia desktop shell with windows, view models, feature modules, and navigation.
category: Architecture
order: 13
---

## Purpose

**Mnemo.UI** is the Avalonia **desktop shell**: windows, controls, view models, feature **modules**, themes, and navigation. It references Infrastructure only for composition and typed services injected into VMs.

## Code Location

| Area | Path |
| --- | --- |
| App entry | `Mnemo.UI/App.axaml.cs` |
| Composition root | `Mnemo.UI/Services/Bootstrapper.cs` |
| Root shell | `Mnemo.UI/Views/MainWindow.axaml(.cs)` |
| Modules | `Mnemo.UI/Modules/**` |
| Shared components | `Mnemo.UI/Components/**`, `Mnemo.UI/Themes/**` |

## Main Interfaces / Classes

- **`MainWindowViewModel`** — sidebar, top bar, navigation host, right sidebar VM wiring.
- **`NavigationService` / `INavigationService`** — resolves which view model occupies the workspace (`MainWindow` binds `Navigation.CurrentViewModel`).
- **`IModule`** implementations — one class per feature package (Notes, Flashcards, Path, …).

## MainWindow Layout

**MainWindow** is the root window: **left `Sidebar`**, **`Topbar`**, central **`WorkspaceKeybindHost`** hosting `Navigation.CurrentViewModel`, optional **`RightSidebar`**, and **`ToastHost`**. Global keybind tunneling hooks live in code-behind for chords that must work shell-wide.

## How to Extend

- Prefer adding or extending an **`IModule`** instead of editing `Bootstrapper` for every route — keep bootstrap for cross-cutting singletons only.
- New controls: place under `Components/` with AXAML + code-behind partials matching existing patterns.

## Gotchas

- Avalonia layout: **`StackPanel` / `Grid` do not support padding or corner radius** on the panel itself — use **Margin** or wrap in **`Border`** (team rule).
- Theme resources are dynamic — avoid hard-coded brushes in feature views when a theme key exists.

---

Related: [Module system](/docs/developers/architecture/module-system) · [Architecture overview](/docs/developers/architecture/overview)
