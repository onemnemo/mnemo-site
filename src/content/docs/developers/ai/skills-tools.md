---
title: Skills and tools
description: Declarative skill manifests, the function registry, and the agentic tool loop.
category: AI systems
order: 52
---

Skills are how the assistant knows what it can do, and tools are how it does it. The design goal: features describe their AI capabilities declaratively and implement them against their own service layer, while the orchestration loop stays generic.

## Skills

A skill is a folder under `Mnemo.Infrastructure/skills/` (copied to the app output) containing `skill.json`, metadata plus a system prompt fragment, and `tools.json`, the function schemas shown to the model. Shipped skills:

| Skill | Notes |
| :--- | :--- |
| Core | Always merged; skill discovery and navigation basics |
| Application | Version, current route, open settings |
| Notes | Full note CRUD and search |
| Mindmap | List, read, create, edit mind maps |
| Settings | Read and write allowlisted settings |
| Path | Contains `create_learning_path`, currently `"enabled": false` |
| Analytics | The `stats_*` surface; hidden from skill discovery |

`SkillRegistry` loads manifests from disk lazily, only when `AI.EnableAssistant` turns on (`AiAssistantToolHost`). Per message, the manager model classifies which skills are relevant (`OrchestrationLayerService`), and `SkillSystemPromptComposer` injects only those prompt fragments and tool schemas. The assistant can also pull skills in mid-conversation through the `inject_skill` tool, with per-conversation overrides in `SkillInjectionOverrideStore`. Keeping the tool surface small per turn matters because the local models are small.

## Tools

The execution side is `IFunctionRegistry`. Modules register handlers in `IModule.RegisterTools` (which runs after DI build) via per-feature registrar classes: `NotesToolRegistrar`, `MindmapToolRegistrar`, `SettingsToolRegistrar`, `StatisticsToolRegistrar`, `ApplicationToolRegistrar`, `SkillDiscoveryToolRegistrar`. Each registrar delegates to a `*ToolService` in Infrastructure that calls the same services the UI uses. Tools that end up touching UI state, navigation for example, marshal through `IMainThreadDispatcher`.

During generation, `ToolCallParser` accumulates streamed tool calls, `ToolDispatcher` executes them against the registry, and results are formatted back into the conversation for the next round. The loop allows up to eight tool rounds per user message.

Parameter types for tools live in `Mnemo.Core/Models/Tools/` so schemas and handlers stay in sync.

## Adding a tool

1. Define the schema in your feature's `tools.json` (and the skill's prompt fragment if behavior guidance is needed).
2. Add the parameter model under `Mnemo.Core/Models/Tools/`.
3. Implement the handler in a `*ToolService` and register it in your module's registrar.
4. Keep handlers thin: validate, call the feature service, return a structured result. `ToolResultFormatterTests` shows the expected result shapes.

Known stubs: the Path skill's only tool is disabled, and the notes backlink tool returns an "unavailable" marker.

## The training folder

The `training/` directory in the main repository generates synthetic datasets (routing, summarization, tool use) for fine-tuning the local models, mirroring the in-app dataset logger formats documented in `docs/datasets/`. It is Python tooling for maintainers and is not part of the shipped application.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Skill manifests | `Mnemo.Infrastructure/skills/` |
| Registry and composition | `SkillRegistry.cs`, `SkillSystemPromptComposer.cs` in `Mnemo.Infrastructure/Services/AI/` |
| Dispatch | `ToolDispatcher.cs`, `ToolCallParser` (same area) |
| Tool services | `Mnemo.Infrastructure/Services/Tools/` |
| Parameter models | `Mnemo.Core/Models/Tools/` |
| Lazy loading | `Mnemo.UI/Services/AiAssistantToolHost.cs` |
