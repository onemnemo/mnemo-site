---
title: Building from source
description: Clone the repository and run a development build.
order: 1
---

This guide gets a local development build of Mnemo running. It assumes you are comfortable with a terminal and have Git installed.

## Prerequisites

Check the repository's README for the currently required toolchain versions before installing anything; this page intentionally does not duplicate them, because the README is updated with the code.

## Clone and run

```bash
git clone https://github.com/onemnemo/mnemo.git
cd mnemo
```

From there, follow the setup steps in the repository's README. The standard flow is: install dependencies, then start the development target. When it works, you get a local build with hot reload against your working copy.

## Development data is separate

A development build keeps its data separate from any installed release, so you can hack on Mnemo without risking the library you actually study with.

## When something breaks

- Search [existing issues](https://github.com/onemnemo/mnemo/issues) first; build environment problems are usually already reported.
- If it looks new, open an issue with your OS, toolchain versions, and the full error output.
