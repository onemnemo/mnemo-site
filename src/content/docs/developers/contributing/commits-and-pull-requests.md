---
title: Commits and pull requests
description: The message format, sign-off, and what makes a PR easy to merge.
order: 3
---

Mnemo's git conventions are few: a message format, a sign-off, and one rule about trailers.

## Commit messages

The format is `type(scope): subject`, with the subject lowercase and imperative:

```text
feat(notes): teach the sidebar tree to drag folders into folders
fix(host): answer 409 with the stored version on stale note writes
perf(notes): mint identity for a pasted run in one grouped step
```

- **Types** in use: `feat`, `fix`, `perf`, `refactor`, `test`, `chore`.
- **Scope** is the feature area: `notes`, `web`, `host`, `i18n`, `dnd`, `repo`, and friends.
- When the change needs explaining, the body opens with a one-line summary, then a bullet for each distinct part. Bullets are terse by default, stating what changed; a reason gets added to a bullet only when the change is non-obvious, a bug fix, a migration, or a deliberate divergence.
- A single-idea change skips the bullet altogether: no summary line, just the reason, since the subject already says what changed.

```text
fix(notes): read the paste progress strings from the namespace they live in

The overlay used the Notes namespace, but the three clipboard keys are
registered under Keybinds, so every user saw raw key strings whenever
more than one image was pasted.
```

## Sign-off and license

Contributions are made under Apache-2.0, and you keep your copyright. The project uses the Developer Certificate of Origin, so sign your commits off:

```bash
git commit -s -m "fix(web): keep the toast host above overlays"
```

- **`Signed-off-by` is required.** It is the line `git commit -s` adds, and it is the only trailer a commit carries.
- **Every other trailer is forbidden.** No `Co-Authored-By`, no attribution line of any kind, in a commit or in a pull request body. The commit author is the author.

The Mnemo name and logo are trademarks and not part of the code license, which matters if you fork; `BRAND.md` covers what is and is not fine.

## Pull requests

- **Open an issue first** for large features, architecture changes, or major UI work; for small fixes, send the PR.
- Keep it focused: one concern per PR, no drive-by reformatting of untouched code.
- Say what and why in the description, link the issue, and attach screenshots or clips for anything visual.
- Run [the tests](../getting-started/running-the-tests.md) before you push; the same checks gate every push and pull request against `main`.
