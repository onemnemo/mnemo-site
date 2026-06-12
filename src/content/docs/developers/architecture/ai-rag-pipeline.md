---
title: AI and RAG Pipeline
description: Local inference, tool dispatch, embeddings, and retrieval in Mnemo.
category: Architecture
order: 18
---

## Purpose

Orient contributors to **local inference**, **tool dispatch**, **embeddings**, and **retrieval** without dumping every method in `AIOrchestrator`.

## Code Location

| Concern | Typical Paths |
| --- | --- |
| Orchestration | `Mnemo.Infrastructure/Services/AI/AIOrchestrator.cs`, `OrchestrationLayerService` |
| Models / servers | `LlamaCppServerManager`, `LlamaCppHttpTextService`, `ModelRegistry`, `AIModelsSetupService` |
| Tools / skills | `SkillRegistry`, `ToolDispatcher`, feature `*ToolService` classes |
| Embeddings / vector | `OnnxEmbeddingService` (`IEmbeddingService`), `SqliteVectorStore` (`IVectorStore`) |
| Knowledge facade | `KnowledgeService` (`IKnowledgeService`) |

## Main Interfaces / Classes

| Type | Role |
| --- | --- |
| `IAIOrchestrator` | High-level assistant flows coordinating tools and models |
| `ITextGenerationService` | Delegates between local Llama HTTP and teacher/cloud paths (`DelegatingTextGenerationService`) |
| `IKnowledgeService` | Retrieval and ingestion orchestration over vector store |
| `ISkillRegistry` | Discoverable agent skills/tools |

## Startup / Registration

`Bootstrapper` registers AI infrastructure early as singletons; **`LlamaCppServerManager`** may spin processes when generation routes first hit. **`ResourceGovernor`** participates in constraining concurrent work.

## How to Extend

- **New tool**: register handler via appropriate `*ToolRegistrar` from an **`IModule.RegisterTools`** path; keep orchestration side effects out of ViewModels.
- **New retrieval source**: extend knowledge ingestion pipeline through **`KnowledgeService`** hooks and vector store schema — avoid duplicating embedding logic in UI.

## Gotchas

- **First-call latency**: cold-starting local servers affects perceived hang — surface status in UI rather than blocking silently.
- **GPU / ONNX**: embedding and inference hardware probes can fail open — verify logs when users report slow RAG.
- **Disposal**: embedding/runtime native resources disposed from `App` exit handler — match lifetime when adding new native-backed singletons.

---

Related: [Infrastructure](/docs/developers/architecture/infrastructure) · [Startup flow](/docs/developers/architecture/startup-flow)
