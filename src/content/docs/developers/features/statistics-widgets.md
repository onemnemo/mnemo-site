---
title: Statistics and widgets
description: The schema-validated statistics store and the dashboard widget framework.
category: Features
order: 44
---

These two systems pair up: statistics record what the user does, and the Overview dashboard widgets are their main consumer.

## Statistics

The statistics system is a namespaced, schema-validated store in `mnemo.db` (its own `Statistics` table, not the key-value `Storage` table). Records are addressed by namespace, kind, and key, with JSON field payloads.

| Namespace | Kinds | Records |
| :--- | :--- | :--- |
| `flashcards` | `daily.summary`, `deck.summary`, `session.log`, `totals` | Practice activity, per-deck summaries, streaks |
| `notes` | `daily.summary`, `totals` | Create, edit, delete counts |
| `path` | `daily.summary`, `path.summary`, `totals` | Path creation and unit generation |
| `app` | `daily.summary`, `totals` | Launches, per-route dwell time, XP |

`StatisticsManager` validates writes against registered schemas, including which source modules may write a namespace, and serializes writes behind a semaphore. `StatisticsModule` registers the built-in schemas at startup; it has no UI of its own. `StatisticsRecorder` is the convenience layer features actually call (record a flashcard session, record app launch). Route dwell times arrive via `NavigationStatisticsTracker`.

When the AI assistant is enabled, the Analytics skill exposes a sizable `stats_*` tool surface (`StatisticsToolService`) so the assistant can query and write records.

There is no statistics page in the UI. Consumers today are the Overview widgets and the optional gamification badge in the top bar (XP and streak, behind `App.EnableGamification`).

## Widgets

The Overview dashboard is a widget grid. `IWidgetRegistry` holds widget metadata and factories; `OverviewViewModel` renders registered widgets in a drag-and-drop grid with resize and an add-widget gallery, persisting the layout to the `overview_dashboard_layout` storage key.

Any module can register widgets in `IModule.RegisterWidgets`, which runs after the service provider is built so factories can resolve dependencies. In practice only `OverviewModule` registers any, five of them:

| Widget | Data source |
| :--- | :--- |
| Flashcard stats | Lifetime and daily flashcard totals |
| Recent decks | Per-deck summaries plus live deck data |
| Study goals | Today's summary against hardcoded targets (50 cards, 3 sessions, 30 minutes) |
| Recent notes | Six most recently modified notes |
| Usage summary | App launches and per-feature time today |

The study goal targets being hardcoded is a known limitation, not a settings bug.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Schemas and types | `Mnemo.Core/Models/Statistics/` |
| Manager and store | `Mnemo.Infrastructure/Services/` (`StatisticsManager`, `SqliteStatisticsStore`, `StatisticsRecorder`) |
| Module | `Mnemo.UI/Modules/Statistics/StatisticsModule.cs` |
| Widget framework | `Mnemo.Core/Models/Widgets/`, widget registry in Core services |
| Dashboard and widgets | `Mnemo.UI/Modules/Overview/` |
| Tests | `StatisticsManagerTests`, `StatisticsToolServiceTests` |
