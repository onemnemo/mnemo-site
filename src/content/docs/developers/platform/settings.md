---
title: Settings system
description: How settings are stored, observed, and exposed in the UI, and which keys exist.
category: Data and platform
order: 31
---

The settings system is small but central: it stores user preferences and serves as the app's change-notification hub. See [State and history](/docs/developers/architecture/state-and-history) for the latter role.

## Architecture

`ISettingsService` (Core) is implemented by `SettingsService` (`Mnemo.Infrastructure/Services/SettingsService.cs`). It keeps a `ConcurrentDictionary` cache in front of the SQLite `Storage` table, where each setting is its own row keyed by a dotted name like `Appearance.Theme`. Values are JSON-serialized, so settings can be any serializable type. Every `SetAsync` raises `SettingChanged`, which is subscribed throughout the app.

There is no settings schema or registry; a setting exists once some code reads or writes its key. Defaults live at the call sites.

## Key namespaces

| Prefix | Examples |
| :--- | :--- |
| `User.` | `DisplayName`, `ProfilePicture` |
| `App.` | `Language`, `LaunchAtStartup`, `EnableGamification`, `DeveloperMode`, `Icon` |
| `Editor.` | `AutoSave`, `SpellCheck`, `SpellCheckLanguages`, `Width` |
| `Markdown.` | `FontSize`, `LineHeight`, `BlockSpacing`, `MathFontSize`, `RenderMath` |
| `Appearance.` | `Theme` |
| `Mindmap.` | `GridType`, `GridSize`, `MinimapVisibility` |
| `AI.` | `EnableAssistant`, `EnableRAG`, `GpuAcceleration`, `UnloadTimeout`, `SmartUnitGeneration` |
| `Chat.` | `StreamingReveal`, `WipeInputForDictation` |
| `Developer.` | `ChatDatasetLogging`, teacher model keys |

## The settings UI

`SettingsViewModel` (`Mnemo.UI/Modules/Settings/`) builds the categories shown to users: Account, General, Editor, AI Tools, Appearance, Mindmap, Updates, Hotkeys, and a gated Developer category. Each row is a small view model (`ToggleSettingViewModel`, `ActionSettingViewModel`, dropdowns) bound to a key. The Developer category unlocks after tapping the settings title seven times, which sets a gate key.

A subset of settings is exposed to the AI assistant through `SettingsToolService`, which keeps an explicit allowlist so the model cannot write arbitrary keys.

## Known loose ends

These exist in the UI but are not wired up; do not document them as features and prefer fixing over working around:

- `Editor.AutoSave` is read by nothing; autosave always runs.
- The **Clear cache** action has no command handler.
- The Hotkeys category contains a placeholder "New note" rebind row.
- `SettingsMnemoPayloadHandler` exports legacy `Theme.Current`/`Theme.Mode` keys while the runtime uses `Appearance.Theme`.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Service | `Mnemo.Infrastructure/Services/SettingsService.cs` |
| Settings UI | `Mnemo.UI/Modules/Settings/` |
| AI allowlist | `Mnemo.Infrastructure/Services/Tools/SettingsToolService.cs` |
| Package export | `Mnemo.Infrastructure/Services/Packaging/PayloadHandlers/` (settings handler) |
