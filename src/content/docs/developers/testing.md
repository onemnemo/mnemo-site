---
title: Testing
description: What is tested, how to run the suite, and where new tests belong.
category: Contributing
order: 61
---

One test project covers the codebase: `Mnemo.Infrastructure.Tests`, on xUnit with coverlet for coverage. It references Infrastructure (with `InternalsVisibleTo`), which transitively covers the pure logic in Core. There are no UI tests.

```powershell
dotnet test MnemoApp.sln
# or one project while iterating
dotnet test Mnemo.Infrastructure.Tests\Mnemo.Infrastructure.Tests.csproj
```

## What is covered

The suite is around two dozen files concentrated on the systems where regressions hurt most:

| Area | Tests |
| :--- | :--- |
| Sketch compiler | `SketchCompilerTests`, `NotePdfSketchExportTests` |
| Note blocks and markdown | `NoteBlockMarkdownConverterTests`, `BlockJsonTwoColumnTests`, `BlockJsonImageTests` |
| Import, export, packaging | `ImportExportCoordinatorTests`, `MnemoPackageServiceTests`, `NotesMnemoPayloadHandlerTests` |
| Flashcards | `FlashcardSchedulingTests`, `FlashcardDeckServiceTests`, `FlashcardSessionQueueBuilderTests` |
| Keybinds | five files covering the codec, formatter, conflict analyzer, repository, and `KeyMapService` |
| Statistics | `StatisticsManagerTests`, `StatisticsToolServiceTests` |
| Other | updates gate policy, spellcheck, search matching, AI tool result formatting |

## Conventions

- Test pure logic and Infrastructure services against mocked Core interfaces. If something is hard to test, that usually means the logic should move out of the UI layer.
- Tests that touch SQLite use temp paths; follow the patterns in the keybind repository tests.
- The scheduling, parsing, and conversion code is deliberately placed in Core or Infrastructure so it can be tested without Avalonia. Keep new logic on that side of the line.

There is no CI running these tests; they only run when you run them.
