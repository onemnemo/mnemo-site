---
title: Release Process
description: High-level checklist for shipping desktop builds of Mnemo.
category: Contributing
order: 43
---

High-level checklist for shipping desktop builds. Exact CI names change — verify `.github/workflows` or Azure pipelines in-repo.

## Typical Steps

1. **Version bump** — assembly/package version per tooling your branch uses (Git tags semver optional).
2. **Build** — `dotnet publish` for `Mnemo.UI` with RID matching shipping targets (e.g. `win-x64`).
3. **Package** — installer generation via Velopack. Align packaging docs with the pipeline that produces artifacts.
4. **Smoke test** — install on a clean VM or disposable profile: launch, open notes path, trigger one AI path if applicable.
5. **Publish artifacts** — attach to GitHub Release or internal feed.
6. **Communicate** — add changelog entries mapping to user-facing docs when UX changes.

## Updates Channel

In-app updates depend on packaged metadata compatible with Velopack — coordinate bump metadata whenever installer layout changes.

---

Related: [Setup](/docs/developers/setup) · [Installing](/docs/students/installing)
