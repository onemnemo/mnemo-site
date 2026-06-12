---
title: Developer Documentation
description: Architecture, setup, and contribution guides for working on Mnemo itself.
category: Start here
order: 0
---

Read **top to bottom** for onboarding; skip ahead only when you already know the layers.

## Principles

We document **systems**, not every type in the repo. Each architecture page follows the same structure:

1. **Purpose** — what problem it solves.
2. **Code location** — where to open in the tree.
3. **Main interfaces / classes** — contracts you actually implement or inject.
4. **Startup / registration** — how it wires into DI and bootstrap.
5. **How to extend** — concrete steps.
6. **Gotchas** — ways contributors break things.

## Reading Order

| Step | Doc |
| --- | --- |
| 1 | [Setup](/docs/developers/setup) |
| 2 | [Architecture overview](/docs/developers/architecture/overview) |
| 3 | Layer docs: [Core](/docs/developers/architecture/core), [Infrastructure](/docs/developers/architecture/infrastructure), [UI](/docs/developers/architecture/ui) |
| 4 | [Startup flow](/docs/developers/architecture/startup-flow) |
| 5 | [Dependency injection](/docs/developers/architecture/dependency-injection) |
| 6 | [Module system](/docs/developers/architecture/module-system) |
| 7 | [Data storage](/docs/developers/architecture/data-storage), [AI and RAG pipeline](/docs/developers/architecture/ai-rag-pipeline) |
| 8 | [Contributing](/docs/developers/contributing), [Coding standards](/docs/developers/coding-standards), [Testing](/docs/developers/testing), [Release process](/docs/developers/release-process) |

## Looking for User Guides?

If you want to study with Mnemo rather than build it, the [student documentation](/docs/students) is the place to start.
