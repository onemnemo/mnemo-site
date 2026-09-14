---
title: Running the tests
description: The xUnit suites, the Vitest suite, and the CI gate they feed.
order: 2
---

Every push to `main` and every pull request against it runs the same checks you can run locally. Run the half you touched before every push, and both halves before a pull request.

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

Tests default to a Node environment; files that need a DOM opt in with a `// @vitest-environment jsdom` pragma on their first line. Linting and typechecking are separate, fast passes:

```bash
npm run lint
```

```bash
npx tsc -b
```

## What CI checks

The workflow runs two jobs. The web job guards against NUL bytes in tracked source files, installs with `npm ci`, then typechecks, lints, and tests. The solution job builds `MnemoApp.sln` in Release and runs the two xUnit projects against that build.

## Related

- [Building from source](./building-from-source.md) for getting a build running first.
- [Commits and pull requests](../contributing/commits-and-pull-requests.md) for what a pull request needs besides green checks.
