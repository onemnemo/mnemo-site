---
title: The coding standard
description: What the standard covers, where it lives, and what gets a pull request sent back.
order: 2
---

Mnemo's standard lives in the repository under `standards/`, split by topic. That directory is the source of truth; where this page disagrees with it, the repo wins.

## Where the standard lives

`coding-standard.md` at the repository root is a router: a table of contents plus a ten-line short version. The eight topic files are indexed by `standards/README.md`; read the one covering what you are about to touch.

| File                             | Covers                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `00-principles.md`               | Engineering philosophy, and why the other rules exist                          |
| `01-architecture.md`             | Layer map, dependency injection, modules, persisted data, security invariants  |
| `02-naming-and-structure.md`     | Folder layout, the naming table for C# and TypeScript, file size               |
| `03-dotnet.md`                   | C#, async and cancellation, errors, lifecycle                                  |
| `04-web.md`                      | React and TypeScript, design tokens, component libraries, internationalization |
| `05-testing-and-verification.md` | What gets a test, how to run things, what a performance claim requires         |
| `06-comments-and-copy.md`        | Comment style, the no-dash rule, user-facing copy                              |
| `07-git.md`                      | Commit format, body shape, granularity, pull requests                          |

## The rules that get a pull request sent back

`AGENTS.md` at the root carries the non-negotiables. The ones reviewers catch most often:

- **No em dashes or en dashes, anywhere a person can read.** Comments, commit messages, translation JSON, release notes. Use a comma, parentheses, or a new sentence.
- **No `TODO`, `FIXME`, or `HACK` markers.** The follow-up goes into `future-review/` instead, with what is wrong and what a fix involves.
- **No references to internal documents in code or commits.** No milestone identifiers, no section numbers, no plan filenames; those files are private.
- **Every user-facing string is a translation key,** present in `en`, `de`, `es`, `ja`, and `nb`.
- **A performance number needs a proof of correct output from the same run.** A render optimization that renders nothing always wins the benchmark.

## What each side enforces

- **On the .NET side,** all I/O is `Task`-returning and cancellation-aware, `.Result` and `.Wait()` are banned outright, exceptions carry exceptional failures while `Result<T>` or a boolean carries expected ones, nothing is swallowed, and collaborators arrive by constructor injection.
- **On the web side,** `mnemo-web` styles through the design tokens in `src/styles/tokens.css`, with no hex colors and no `rgba()` in component code. Icons come from the `AppIcon` wrapper rather than a direct `lucide-react` import, popovers and menus use Radix, server state goes through React Query, and strings are translated with the `useT()` hook. oxlint is the enforced floor, and the hook rules are errors rather than warnings.

## When a rule gets in the way

If a rule in `standards/` conflicts with a principle in `00-principles.md`, the principle wins and the rule needs fixing; say so. If the standard itself looks wrong, open an issue arguing it should change. Deviating quietly is not an option.

## Related

- [Commits and pull requests](./commits-and-pull-requests.md) for the git half of the standard.
- [Running the tests](../getting-started/running-the-tests.md) for the commands the verification rules expect.
