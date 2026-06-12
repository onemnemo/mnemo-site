---
title: Markdown and text shortcuts
description: The two markdown systems, what each supports, and the typing replacement engine.
category: Editor systems
order: 22
---

Mnemo contains two separate markdown systems with different jobs. Knowing which one you are in saves a lot of confusion.

| System | Job | Parser | Location |
| :--- | :--- | :--- | :--- |
| Note converter | Import and export notes as `.md`, markdown clipboard fallback | Custom line parser for blocks, Markdig for inline runs only | `Mnemo.Infrastructure/Services/Notes/Markdown/` |
| Markdown renderer | Display AI chat output and learning path content | Markdig with advanced extensions, plus a custom pre-pass | `Mnemo.UI/Services/MarkdownRenderer.cs`, `Mnemo.Infrastructure/Services/MarkdownProcessor.cs` |

The note editor itself does not run on markdown at all; its document model is [blocks and spans](/docs/developers/editor/block-editor). Markdown only appears at the boundaries.

## The note converter

`NoteBlockMarkdownConverter` maps markdown lines to block types with hand-written rules, not Markdig: headings `#` to `####`, bullets (`-`, `*`, `+`), `1.` numbered items, `- [ ]` checklists, `>` quotes, fenced code (including ` ```sketch ` for sketch blocks), `---` dividers, `$$...$$` equation blocks, `![alt](path)` images, and `[[page:id]]` page embeds. One list item becomes one block; nested lists are not represented. Tables are not supported in notes at all.

Inline content inside each block goes through `InlineMarkdownParser`, which uses Markdig for emphasis, strikethrough, inline code, and links, and a custom rule that turns `\3/7` into a `FractionSpan`. The reverse direction, `InlineMarkdownSerializer`, writes `**bold**`, `*italic*`, `~~strike~~`, `` `code` ``, `[text](url)`, `$latex$` for equation spans, and `\n/d` for fractions.

One known gap: the inline parser has a code path for Markdig's `MathInline`, but the pipeline never registers the math extension, so `$...$` in imported markdown stays literal text. Inline equations survive Mnemo-to-Mnemo round trips because the serializer writes them and the in-app clipboard uses JSON, but third-party markdown with inline math does not import as math.

A second, partially duplicated implementation exists in `Mnemo.UI/Components/BlockEditor/BlockMarkdownSerializer.cs` for clipboard fallback. If you change markdown behavior, check both.

## The chat renderer

`MarkdownRenderer` builds Avalonia controls from markdown for AI-generated content. Before Markdig runs, `MarkdownProcessor` extracts constructs Markdig does not know: `$$...$$` and `$...$` math (rendered through the [LaTeX engine](/docs/developers/editor/latex)), `==highlight==`, `^sup^`, `~sub~`. This path supports tables via Markdig's advanced extensions, which is why chat can show tables but notes cannot.

## Live typing shortcuts

Two editor-side mechanisms convert text while typing; neither touches stored content.

**Block conversion.** `MarkdownShortcutDetector` (block editor) watches line prefixes and converts the current block when you type `#`, `-`, `>`, `1.`, `[]`, `---`, or a code fence.

<a id="text-shortcuts"></a>

**Text shortcuts.** `TextShortcutService` (`Mnemo.Infrastructure/Services/TextShortcuts/`) replaces ASCII sequences with Unicode as you type: arrows (`->`, `<->`), typography (`...`, `(c)`, `(tm)`, `-- ` with a trailing space so `---` still makes a divider), and explicit commands like `\pi`, `\sum`, `\leq`, `\approx`, `\EUR`. Replacement cascades up to 32 iterations, so building `<` plus an existing arrow can upgrade it to `<->`'s symbol. The catalog is `DefaultTextShortcutCatalog.cs`; `FractionShortcutResolver` handles `\3/7` fraction display. The service is invoked by `RichTextEditor` on text input.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Note block conversion | `Mnemo.Infrastructure/Services/Notes/Markdown/NoteBlockMarkdownConverter.cs` |
| Inline parse and serialize | same folder, `InlineMarkdownParser.cs`, `InlineMarkdownSerializer.cs` |
| Clipboard fallback copy | `Mnemo.UI/Components/BlockEditor/BlockMarkdownSerializer.cs` |
| Chat rendering | `Mnemo.UI/Services/MarkdownRenderer.cs`, `Mnemo.Infrastructure/Services/MarkdownProcessor.cs` |
| Text shortcuts | `Mnemo.Infrastructure/Services/TextShortcuts/`, models in `Mnemo.Core/Models/TextShortcuts/` |
