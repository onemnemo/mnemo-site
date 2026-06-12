---
title: Contributing
description: Workflow expectations and the coding conventions that reviews enforce.
category: Contributing
order: 60
---

## Workflow

1. Discuss larger changes in an issue before building them.
2. Branch from the integration branch, keep pull requests focused on one change.
3. Run `dotnet build MnemoApp.sln` and `dotnet test` before pushing. There is no CI on pull requests, so local checks are the only checks.
4. Update documentation in the same change when you alter user-visible behavior or a system contract (modules, storage shapes, routes, keybinds).

## Coding conventions

The canonical standard lives in the repository at `coding-standard.md`, mirrored as a Cursor rule in `.cursor/rules/coding-standard.mdc`. There are no analyzers or an `.editorconfig` enforcing it; review does. The rules that come up most:

**Layering.** Core holds contracts and models only; Infrastructure holds implementations; UI holds Avalonia and view models. Never add a UI or database dependency to Core. New capabilities get an interface in Core and an implementation in Infrastructure.

**Naming.** PascalCase types, `I` prefix for interfaces, `Async` suffix on async methods, `_camelCase` for private fields.

**Dependency injection.** Inject interfaces through constructors. Avoid service-locator patterns outside the bootstrap and module registration paths. Prefer extending a module over growing `Bootstrapper`.

**Async.** `async`/`await` for IO, accept `CancellationToken`s, `ConfigureAwait(false)` in library code, and never `.Result` or `.Wait()`.

**Errors.** Use `Result<T>` for expected failures, log with context, do not swallow exceptions.

**Avalonia.** Keep logic in view models. Localize user-facing strings through the translation system. One project-specific rule trips people up regularly: `StackPanel` and `Grid` must not be given `Padding` or `CornerRadius`; use `Margin` or wrap the panel in a `Border`.

**Storage.** Persist through `IStorageProvider`, version any schema you export, and route file formats through the import/export adapters rather than ad hoc file IO.

## Documentation duty

These docs describe the code as it is. If your change makes a page wrong, fixing the page is part of the change.
