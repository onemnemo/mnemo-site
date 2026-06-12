---
title: State and history
description: How shared state, change notification, and undo/redo work.
category: Architecture
order: 14
---

Mnemo has no global message bus and no Redux-style store. State management is a small set of conventions applied consistently.

## The patterns

| Pattern | Used for | Examples |
| :--- | :--- | :--- |
| Singleton services | App-wide shared state | `SettingsService`, `NotesLibrarySession`, `NavigationService` |
| Transient view models | Screen state, discarded on navigation | every route view model |
| Session objects | In-memory working state of an open editor | `NotesEditorSession`, `MindmapEditorSession` |
| CommunityToolkit `ObservableObject` | Property change notification | view models, some Core models |
| Plain .NET events | Domain notifications | `IHistoryManager.StateChanged`, `Navigated`, `LanguageChanged` |

There is deliberately no event aggregator. Components subscribe to the specific service they care about.

## Settings as the change hub

`SettingsService` (`Mnemo.Infrastructure/Services/SettingsService.cs`) is more than preferences storage. It keeps an in-memory cache over the SQLite store and raises `SettingChanged` on every write. Much of the app's reactivity hangs off this one event: theme switching, sidebar visibility, AI gating in navigation, spellcheck configuration, editor typography, and the AI tool host all subscribe to it. If you need an app-wide toggle, a setting plus `SettingChanged` is the established pattern.

## Undo and redo

The history system is two layers: a generic operation stack and per-editor facades.

**The stack.** `IHistoryManager` (`Mnemo.Core/History/`) with `HistoryManager` (`Mnemo.Infrastructure/History/`) holds undo and redo stacks of `IHistoryOperation` objects. It supports batching: `BeginBatch`/`CommitBatch` groups operations into a single `CompositeOperation`, which is how a burst of typing undoes as one step. Pushes during an active undo or redo are blocked.

**The facades.** The manager is registered as a singleton, but it is used as if it were per-document. `NotesEditorHistory` clears it when the selected note changes; `MindmapViewModel` clears it when a map loads. This works because only one editor route is active at a time. The interface comment says "one per active document" while DI says singleton; the discipline of explicit clears is what keeps those consistent. If Mnemo ever shows two editors at once, this design has to change.

**The operations.** The block editor pushes two kinds (`Mnemo.UI/Components/BlockEditor/History/`): `TextEditOperation` for batched typing inside one block, and `DocumentOperation` for structural changes, which snapshots the affected blocks plus caret position. Undo tries to restore blocks in place to avoid rebuilding the UI. The mind map editor is simpler: `MindmapStateOperation` snapshots graph state.

History is in-memory only. It does not survive app restart, and `Clear()` also lets the image asset service garbage-collect images that are no longer referenced by any reachable state.

## Threading

The UI thread owns all view state. Infrastructure services that need to touch UI-bound state (AI tools that navigate, toasts, update prompts) go through `IMainThreadDispatcher`, implemented by `AvaloniaMainThreadDispatcher` over `Dispatcher.UIThread`. Storage writes serialize JSON on the thread pool before hitting SQLite, so a large note autosave does not block typing. `StatisticsManager` serializes its writes with a semaphore.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| History contracts | `Mnemo.Core/History/IHistoryManager.cs` |
| History implementation | `Mnemo.Infrastructure/History/HistoryManager.cs` |
| Notes facade | `Mnemo.UI/Modules/Notes/Services/NotesEditorHistory.cs` |
| Block editor operations | `Mnemo.UI/Components/BlockEditor/History/` |
| Settings hub | `Mnemo.Infrastructure/Services/SettingsService.cs` |
| Dispatcher | `Mnemo.UI/Services/AvaloniaMainThreadDispatcher.cs` |
