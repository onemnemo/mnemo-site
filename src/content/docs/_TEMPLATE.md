---
title: Page title (required)
description: One sentence used for meta tags and landing page cards.
category: Sidebar group label
order: 10
draft: true
---

This file is ignored by the build because its name starts with an underscore.
Copy it to create new pages.

How the structure works:

- Put files under `src/content/docs/students/` or `src/content/docs/developers/`.
  The folder decides which section the page belongs to. Subfolders are fine
  and become part of the URL, for example `students/notes/sketch.md` is served
  at `/docs/students/notes/sketch`.
- `category` groups pages in the sidebar. Pages with the same category string
  are listed together. Pages without one land in a group called "Overview".
- `order` sorts pages within their category, lowest first. Categories
  themselves are ordered by the lowest order value they contain, so give each
  category its own number range: Start here 0 to 9, Modules 10 to 19, and so
  on.
- A file named `index.md` inside a section folder becomes that section's
  landing page, for example `students/index.md` is served at `/docs/students`.
- Set `draft: true` to keep a page out of the build entirely.

Headings (`##` and `###`) automatically appear in the "On this page" rail.
