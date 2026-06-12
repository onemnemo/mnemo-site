---
title: Setup
description: Clone, build, and run Mnemo locally.
category: Start here
order: 1
---

## Prerequisites

- **.NET SDK** matching the solution target (see repo `global.json` / `.csproj` `TargetFramework`; currently **net10.0** in active branches).
- **Git** and a desktop OS supported by Avalonia for local UI runs.

## Clone and Build

From the repository root:

```powershell
cd "<repository-root>"
dotnet build Mnemo.UI\Mnemo.UI.csproj
```

Run the UI project:

```powershell
cd Mnemo.UI
dotnet run
```

## IDE

Visual Studio, Rider, and VS Code with C# Dev Kit all work. Avalonia previewers may require extra tooling per IDE docs.

## Tests

```powershell
dotnet test
```

Scope to a test project when iterating:

```powershell
dotnet test Mnemo.Infrastructure.Tests\Mnemo.Infrastructure.Tests.csproj
```

---

Next: [Architecture overview](/docs/developers/architecture/overview)
