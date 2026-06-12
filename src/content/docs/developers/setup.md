---
title: Setup
description: Build, run, and test Mnemo from source.
category: Start here
order: 1
---

## Prerequisites

- **.NET 10 SDK**. All projects target `net10.0`. There is no `global.json`, so any 10.x SDK works.
- A desktop OS supported by Avalonia: Windows, Linux, or macOS.

No other tooling is required for a normal build. The AI features need no setup at build time; models are downloaded at runtime by the app itself.

## Build and run

From the repository root:

```powershell
dotnet build MnemoApp.sln
cd Mnemo.UI
dotnet run
```

The app starts with a fresh local database in your user data folder on first run (Windows: `%LocalAppData%\Mnemo\`). Deleting that folder resets the app to a first-run state.

## Tests

```powershell
dotnet test MnemoApp.sln
```

Tests live in `Mnemo.Infrastructure.Tests` (xUnit). There is no CI on pull requests; run the tests locally before pushing. See [Testing](/docs/developers/testing).

## IDE notes

Visual Studio, Rider, and VS Code with the C# Dev Kit all work. Views are plain AXAML files; the Avalonia previewer is optional.

## Useful scripts

| Script | Purpose |
| :--- | :--- |
| `scripts/pack-local.ps1` | Builds a local Velopack installer for testing the packaged app, without uploading anything. Parameters: `-Rid` (default `win-x64`), `-Version`. |
| `scripts/GeneratePerfNotes/` | Console tool that generates `.mnemo` packages full of large notes (25 to 1500 blocks) for editor performance testing. |

## Developer mode

The app has a hidden developer settings section (tap the Settings page title seven times). It exposes performance diagnostics, chat dataset logging, and the experimental cloud teacher-model toggles used for AI training work. None of this is needed for ordinary development.
