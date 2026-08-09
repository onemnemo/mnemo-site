---
title: Commits and pull requests
description: The message format, sign-off, and what makes a PR easy to merge.
order: 3
---

Mnemo's history is unusually readable, and keeping it that way is part of contributing. The conventions are few and consistently applied.

## Commit messages

The format is `type(scope): subject`, with the subject lowercase and imperative:

```text
feat(notes): teach the sidebar tree to drag folders into folders
fix(host): answer 409 with the stored version on stale note writes
perf(notes): mint identity for a pasted run in one grouped step
```

- **Types** in use: `feat`, `fix`, `perf`, `refactor`, `test`, `chore`.
- **Scope** is the feature area: `notes`, `web`, `host`, `i18n`, `dnd`, `repo`, and friends.
- When the change needs explaining, the body is prose paragraphs about _why_, not a bullet list of _what_; the diff already shows the what.

## Sign-off and license

Contributions are made under Apache-2.0, and you keep your copyright. The project uses the Developer Certificate of Origin, so sign your commits off:

```bash
git commit -s -m "fix(web): keep the toast host above overlays"
```

One related heads-up: the Mnemo name and logo are trademarks and not part of the code license, which matters if you fork. The repo's `BRAND.md` covers what is and is not fine.

## Pull requests

- **Open an issue first** for large features, architecture changes, or major UI work; for small fixes, just send the PR.
- Keep it focused: one concern per PR, no drive-by reformatting of untouched code.
- Say what and why in the description, link the issue, and attach screenshots or clips for anything visual.
- Run [the tests](../getting-started/running-the-tests.md); there is no CI to catch it for you yet.
- New to the project? The `good first issue` label is curated for exactly you.

Review is a conversation with a founder-led project: the maintainer has final say, and questions in both directions are the normal texture of getting something merged.
