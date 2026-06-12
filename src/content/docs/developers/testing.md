---
title: Testing
description: How to run and write tests for Mnemo's Infrastructure and Core layers.
category: Contributing
order: 42
---

## Purpose

Guard Infrastructure logic and pure Core behavior without requiring a running Avalonia shell for every change.

## Code Location

- `Mnemo.Infrastructure.Tests/` — primary test assembly.

## Running Tests

From repo root:

```powershell
dotnet test
```

Target one project:

```powershell
dotnet test Mnemo.Infrastructure.Tests\Mnemo.Infrastructure.Tests.csproj
```

## Conventions

- Prefer testing **Infrastructure services** and **pure algorithms** with mocked interfaces from Core.
- UI interaction tests are heavier — reserve for regressions that truly need visual tree automation.

## Gotchas

- Tests touching SQLite or ONNX may need **deterministic temp paths** — follow patterns in existing tests when present.
