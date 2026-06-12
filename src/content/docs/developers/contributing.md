---
title: Contributing
description: Workflow, documentation duties, and review expectations for Mnemo contributors.
category: Contributing
order: 40
---

## Workflow

1. **Discuss or track** larger changes before massive refactors (issue / maintainer channel — follow repo norms).
2. **Branch** from the integration branch your team uses (`main` / `develop`).
3. Keep PRs **focused** — documentation and behavior should match; avoid unrelated formatting sweeps.
4. Run **`dotnet build`** and relevant **`dotnet test`** before pushing.

## Documentation Duty

When you change behavior visible to users or alter bootstrap/module contracts, update:

- User docs when UX changes.
- Developer docs under the architecture section when registration flow, storage, or AI pipeline semantics shift.

## Review Expectations

- **Layering:** no new Infrastructure references from Core.
- **Modules:** prefer `IModule` extension over growing `Bootstrapper` conditionals.

See [Coding standards](/docs/developers/coding-standards) and the repository `.cursor/rules/coding-standard.mdc`.
