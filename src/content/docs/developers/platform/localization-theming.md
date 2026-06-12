---
title: Localization and theming
description: Translation sources and merge order; theme dictionaries and runtime switching.
category: Data and platform
order: 33
---

## Localization

Translations are namespaced key-value JSON, merged from multiple sources at load time.

`LocalizationService` (`Mnemo.Infrastructure/Services/LocalizationService.cs`) aggregates `ITranslationSource` implementations. The built-in source reads embedded files from `Mnemo.Infrastructure/Languages/{culture}.json`; modules contribute their own strings through `EmbeddedJsonTranslationSource` pointing at a `Translations/` folder inside the module (Notes, Mindmap, Flashcards, and the Overview widgets do this). Sources merge in registration order, later sources overriding earlier ones, which lets a module override a built-in string if it must.

The JSON shape is `{ "Namespace": { "Key": "Value" } }`. Lookup is `T(key, namespace)`; with a namespace, a missing key returns the key itself, which is how untranslated strings become visible in the UI.

Shipped languages are hard-coded in `GetAvailableLanguagesAsync`: English, Spanish, German, Norwegian Bokmål, and Japanese. If a culture loads empty, the service falls back to English. The chosen language persists as the `App.Language` setting and is loaded during bootstrap. `LanguageChanged` notifies live UI such as the sidebar and settings page.

Adding a language means adding the embedded JSON files (core plus each module that has translations) and the entry in the hard-coded list. Note that spellcheck dictionaries are a separate system with a different language set; see the [block editor](/docs/developers/editor/block-editor) page.

## Theming

Themes are Avalonia resource dictionaries under `Mnemo.UI/Themes/Core/{Name}/`, each with a `theme.axaml` that merges `Colors.axaml`, `Typography.axaml`, and `Controls.axaml`. Three ship: **Dawn** (light, default), **Noon** (warm light), and **Dusk** (dark).

`ThemeService` (`Mnemo.UI/Services/ThemeService.cs`) switches themes at runtime by replacing the `StyleInclude` whose source path contains `/Themes/Core/` in `Application.Styles`, then persists `Appearance.Theme`. The saved theme is applied during startup in `App.axaml.cs` before the window shows.

Feature views should consume theme resources dynamically (`{DynamicResource ...}`) rather than hard-coding brushes; every color a feature needs should exist as a key in each theme's `Colors.axaml`. The sketch renderer's `theme(...)` color tokens resolve against these same resources.

Not implemented: user-defined themes and accent colors. `ThemeService.ImportAsync` always returns false, and the export and file-watching members are stubs. Treat theme import/export as dead surface until someone builds it.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Localization service | `Mnemo.Infrastructure/Services/LocalizationService.cs` |
| Built-in strings | `Mnemo.Infrastructure/Languages/` |
| Module strings | `Mnemo.UI/Modules/{Feature}/Translations/` |
| Theme service | `Mnemo.UI/Services/ThemeService.cs` |
| Theme dictionaries | `Mnemo.UI/Themes/Core/{Dawn,Noon,Dusk}/` |
