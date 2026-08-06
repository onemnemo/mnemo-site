---
title: The coding standard
description: The six priority rules, and the conventions around them.
order: 2
---

The repository's `coding-standard.md` is the source of truth; this page is the orientation tour. If the two ever disagree, the repo wins.

## The six priority rules

1. **Layer boundaries are strict.** Core holds interfaces and models with zero implementation dependencies; Infrastructure holds implementations; UI layers hold presentation. See [The layers](../architecture/the-layers.md).
2. **UI logic lives in view models and services**, never in views or code-behind.
3. **Dependencies are interfaces, injected.** No service news up another service.
4. **Async is real async.** `Task`-returning, cancellation-aware, and never blocked on with `.Result` or `.Wait()`.
5. **Exceptions are never swallowed.** Throw for exceptional failures, use `Result<T>` or `bool` for expected ones, and log with context at clear boundaries.
6. **Avalonia layout controls follow the layout rules**: `StackPanel` and `Grid` never get `Padding` or `CornerRadius`; use `Margin` or wrap in a `Border`.

## Naming, briefly

PascalCase for public members, `I`-prefixed interfaces, `Async`-suffixed async methods, singular class names, `_camelCase` allowed for private fields, one class per file. Descriptive beats short: `TaskScheduler`, not `TskMgr`.

## The web side

The written standard predates the React UI, so the web half's conventions are lighter and live closer to the code: folder-by-feature under `mnemo-web/src`, TypeScript throughout, co-located tests, and oxlint as the enforced floor (hook rules are errors, not warnings). The practical rule is the oldest one: make your change look like it was written by whoever wrote the file.

## When a request conflicts with the standard

It happens: a quick fix wants `.Result`, a view wants a little logic. The standard exists precisely for those moments. Do it the standard's way, or open an issue arguing the standard should change; silently deviating creates the kind of codebase this project is trying not to be.
