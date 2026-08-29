---
title: Building from source
description: "Two processes, one handshake: the backend host and the web UI."
order: 1
---

Mnemo is one desktop application built from two halves: a React frontend in `mnemo-web`, and a .NET backend in `Mnemo.Host` that opens the PhotinoX window, runs the local API, and serves the frontend. `main` is that build, so there is no branch to check out after cloning.

## Prerequisites

- **The .NET 10 SDK,** which the whole backend targets.
- **Node.js 22 or later, with npm.**
- **Git,** and on Linux or macOS **`jq`,** which the Typst restore script uses to read its manifest.

## Clone and restore

```bash
git clone https://github.com/onemnemo/mnemo.git
cd mnemo
```

Install the frontend dependencies:

```bash
cd mnemo-web
npm install
cd ..
```

Then restore the bundled Typst binary, roughly 52 MB per platform and therefore not committed. On Windows:

```bash
./scripts/restore-typst.ps1
```

On Linux or macOS:

```bash
./scripts/restore-typst.sh
```

The script fetches the release pinned in `scripts/typst-manifest.json` and checks the archive against a recorded hash. Run it once after cloning; pass `-Force` (or `--force`) to fetch again. Skipping it still builds, so the failure surfaces late and quietly: PDF export from notes stops working.

## Running a development build

On Windows, `dev.bat` runs the whole sequence: install web dependencies if `node_modules` is missing, clear the stale handshake file, start the host, wait for the new handshake, start Vite.

```bash
dev.bat
```

Everywhere else, run the two processes yourself. The host goes first:

```bash
dotnet run --project Mnemo.Host -- --dev
```

Then, in a second terminal, the web UI:

```bash
cd mnemo-web
npm run dev
```

There is one application to run. `Mnemo.UI`, the original Avalonia project, is still in the solution but only as a library; the publish deletes its stray executable so nobody starts a second, broken copy. See [The layers](../architecture/the-layers.md).

## Two processes, one handshake

Order matters, and the reason is a file. In dev mode the host binds its API to `127.0.0.1:47210` and writes `mnemo-web/.dev/api.json` carrying that port and a bearer token minted for this launch. The Vite proxy reads the port once when its config loads, and the token on every proxied request, attaching it as an Authorization header; the frontend never handles a credential itself. The host then waits for the Vite server to answer before it opens the app window pointed at it.

Start Vite first and it pins itself to the default port and proxies without a token until you restart it, which surfaces as unauthorized API calls rather than an obvious error.

## Where a development build keeps its data

A development build reads and writes the same local data folder as an installed Mnemo. To keep your real library out of the blast radius, point `MNEMO_DATA_DIR` at a scratch folder:

```bash
MNEMO_DATA_DIR=/tmp/mnemo-dev dotnet run --project Mnemo.Host -- --dev
```

In PowerShell, set the variable first:

```bash
$env:MNEMO_DATA_DIR = "C:\mnemo-dev"
dotnet run --project Mnemo.Host -- --dev
```

## When something breaks

Search [existing issues](https://github.com/onemnemo/mnemo/issues) first; build environment problems are usually already reported. If it looks new, open an issue with your OS, toolchain versions, and the full error output.

## Related

- [Running the tests](./running-the-tests.md) for the suites you owe before a pull request.
- [The local API](../architecture/the-local-api.md) for the token and the loopback binding.
- [How to contribute](../contributing/how-to-contribute.md) once the build runs.
