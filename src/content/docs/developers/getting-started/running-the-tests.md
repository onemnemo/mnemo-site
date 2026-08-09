---
title: Running the tests
description: The xUnit suites, the Vitest suite, and why local checks matter.
order: 2
---

There is no CI running tests on pull requests yet, which makes the local run the only run. Treat it as part of the change, not a courtesy.

## Backend tests

The C# side has two xUnit projects, covering Infrastructure (schedulers, stores, import/export, the mindmap engine) and the Host (asset handling, lifecycle, i18n). One command runs both:

```bash
dotnet test MnemoApp.sln
```

## Frontend tests

The web UI uses Vitest, with test files co-located next to the code they cover (`something.test.ts` beside `something.ts`). From `mnemo-web/`:

```bash
npm run test
```

Tests default to a Node environment; files that need a DOM opt in with a `// @vitest-environment jsdom` pragma on their first line. Linting is a separate, fast pass:

```bash
npm run lint
```

## The habit that matters

Run the half you touched before every push, and both halves before a pull request. The suites are fast precisely so that this is a reasonable ask.
