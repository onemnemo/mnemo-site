---
title: Developer documentation
description: How Mnemo is built, where the systems live, and how to work on it.
category: Start here
order: 0
---

Mnemo is a desktop study app built with C# on .NET 10 and Avalonia. The codebase is a single solution with three production projects and a test project. These docs explain the systems inside it: what each one does, why it exists, how it connects to the rest, and where the code lives.

The docs describe what is in the repository today. Experimental areas are labeled as such. When docs and code disagree, the code wins; please fix the doc.

## How this section is organized

| Category | Covers |
| :--- | :--- |
| Architecture | Layers, startup, modules, navigation, state |
| Editor systems | The block editor and the custom LaTeX, markdown, and sketch engines |
| Data and platform | Storage, settings, keybinds, localization, theming |
| Features | Flashcards, mind maps, search, import/export, statistics |
| AI systems | Local inference, RAG, skills and tools (experimental) |
| Contributing | Workflow, tests, releases |

## Suggested onboarding order

1. [Setup](/docs/developers/setup): build and run the app.
2. [Architecture overview](/docs/developers/architecture/overview): the three layers and the dependency rule.
3. [Startup flow](/docs/developers/architecture/startup-flow): what happens between `Main` and the first window.
4. [Module system](/docs/developers/architecture/module-system): how features plug in. Most feature work happens inside a module.
5. The system page for whatever you are changing.

An experienced contributor can jump straight to a system page; each one stands alone and ends with a map of the relevant files.
