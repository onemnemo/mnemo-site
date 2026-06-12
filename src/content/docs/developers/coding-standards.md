---
title: Coding Standards
description: Naming conventions, layering rules, async guidelines, and Avalonia-specific patterns.
category: Contributing
order: 41
---

## Canonical Source

The living checklist for naming, layering, async, errors, and UI lives in:

**`.cursor/rules/coding-standard.mdc`**

Open that file in-repo for full detail (PascalCase, `I*` interfaces, `Async` suffixes, DI rules, Avalonia notes).

## Summary

| Topic | Rule |
| --- | --- |
| Layers | Core = contracts/models; Infrastructure = implementations; UI = Avalonia + modules |
| DI | Inject interfaces; avoid service locator except bootstrap/module patterns |
| Async | No `.Result` / `.Wait()` on async APIs |
| Modules | Features expose `IModule`; avoid manual registration lists |

## UI Reminder

`StackPanel` / `Grid`: **no padding or corner radius on the panel** — use **Margin** or wrap in **Border** (project convention).

---

Related: [Contributing](/docs/developers/contributing)
