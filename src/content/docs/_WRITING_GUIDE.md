---
title: Writing guide
draft: true
---

This file is ignored by the build (underscore prefix). It defines how Mnemo
documentation is written. Every page in `src/content/docs` should follow it.

## Principles

1. Document reality. Every claim must be verifiable in the codebase today.
  If a feature is experimental, say so plainly. If something does not exist,
   it does not appear in the docs.
2. Accuracy over completeness. A short correct page beats a long vague one.
3. No filler. Do not explain what a sidebar is, what clicking does, or other
  things any computer user already knows. Explain only what is specific to
   Mnemo.
4. No promises. Never reference planned features, roadmaps, or "coming soon".

## Voice

Write like Linear, Tailscale, and Anthropic docs: clear, calm, grounded.

- Plain English. Short sentences. One concrete idea per sentence.
- No hype, buzzwords, marketing language, or startup tone.
- No exclamation marks.
- No em dashes. Use commas, periods, or parentheses instead.
- Avoid jargon where a plain word works. When a technical term is needed
(and it often is in developer docs), use the precise one.
- Address the reader as "you". Refer to the project as "Mnemo".
- Avoid AI-sounding patterns: "delve", "seamless", "powerful", "robust",
"comprehensive", "Let's explore", rhetorical questions, rule-of-three
adjective lists.

## Audiences

Student pages (`students/`): explain the tool, not how to think.

- What a feature does, how to use it, its settings, its limits.
- No productivity advice, no learning theory, no note-taking philosophy.
- Mention keyboard shortcuts and syntax precisely.
- AI features: only document what is actually reachable in the released app,
and label it experimental.

Developer pages (`developers/`): explain systems, not every type.

- For each system: what it does, why it exists, how it connects to other
systems, and where the code lives.
- Name real classes, interfaces, and file paths. Verify them before writing.
- Explain design decisions and tradeoffs when they are visible in the code.
- Not an API reference. Link to code instead of duplicating signatures,
except for small contracts (interfaces) that anchor a whole system.

## Page structure

Frontmatter (see `_TEMPLATE.md` for field meanings):

```yaml
---
title: Short noun phrase, sentence case
description: One sentence for meta tags and landing cards.
category: Sidebar group label
order: 10
---
```

- The page body must not repeat the H1 title; the layout renders it.
- Start with one or two paragraphs that orient the reader before any heading.
- Use `##` for sections, `###` sparingly. Headings are sentence case.
- Prefer prose for explanation, tables for enumerable facts (shortcuts,
formats, options), and code blocks for anything the user types.
- End developer pages with a "Where the code lives" table or section when
the page covers a system spread across files.
- Cross-link related pages with absolute paths like `/docs/students/notes`.

## Terminology

Use these terms consistently:

- "note", "folder", "deck", "card", "mindmap" (one word), "learning path", "sketch", "workspace", "module" (developer docs only).
- File and class names in backticks: `Bootstrapper`, `Mnemo.Core/Services`.
- UI labels in bold matching the actual label: **Settings**, **Check now**.
- Keyboard shortcuts in backticks with `+`: `Ctrl+P`, `Ctrl+Shift+F`.

## Diagrams and media

- Mermaid diagrams render on the docs site. Use them when structure or flow
is genuinely clearer as a picture: architecture, pipelines, lifecycles.
Keep them small; a diagram with more than ~12 nodes needs splitting.
- Use placeholders for media the maintainer will add later, on their own
line: `[SCREENSHOT: Theme settings]`, `[VIDEO: Creating a note]`.
- Do not add a diagram just to have one. Most pages need none.

## Accuracy workflow

Before publishing a page:

1. Verify every class name, path, setting label, and shortcut against the
  `mnemo-new` repository.
2. Remove any sentence you cannot trace to code.
3. Mark experimental systems: one short note at the top of the page, not
  scattered warnings.

