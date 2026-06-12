---
title: Infrastructure Layer
description: Mnemo.Infrastructure implements storage, AI/RAG, and other IO-heavy services.
category: Architecture
order: 12
---

## Purpose

**Mnemo.Infrastructure** implements durable storage, AI/RAG, statistics, import/export, speech, spellcheck, updates, and other **long-running or IO-heavy** services behind Core interfaces.

## Code Location

- `Mnemo.Infrastructure/` — mirrored feature folders (`Services/Notes`, `Services/AI`, `Services/Flashcards`, …).

## Main Interfaces / Classes

| System | Examples |
| --- | --- |
| Storage | `SqliteStorageProvider` (`IStorageProvider`) |
| Notes | `NoteService` (`INoteService`) |
| Knowledge / RAG | `KnowledgeService` (`IKnowledgeService`), `SqliteVectorStore` (`IVectorStore`) |
| AI | `AIOrchestrator` (`IAIOrchestrator`), `SkillRegistry`, model/registry helpers |
| Updates | `VelopackUpdateService` (`IUpdateService`) |

Use IDE search on `Mnemo.Infrastructure` + interface name from Core for the canonical implementation.

## Startup / Registration

All concrete singletons are wired in **`Bootstrapper.Build()`** before modules run (`Mnemo.UI/Services/Bootstrapper.cs`).

## How to Extend

1. Implement the Core interface (or add a new interface in Core first).
2. Register in **`Bootstrapper`** with appropriate lifetime (`Singleton` for heavy/shared services).
3. Expose module-specific behavior via **`IModule.RegisterTools`** only if the product needs it — avoid circular lazy grabs between services.

## Gotchas

- **Disposal**: some services implement `IDisposable`; `App` tears down selected singletons on exit — follow existing patterns when adding native resources.
- **Async SQLite**: respect cancellation and avoid blocking UI thread from Infrastructure APIs called by ViewModels.

---

Related: [Data storage](/docs/developers/architecture/data-storage) · [AI and RAG pipeline](/docs/developers/architecture/ai-rag-pipeline)
