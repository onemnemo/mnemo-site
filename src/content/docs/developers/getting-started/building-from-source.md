---
title: Building from source
description: "Two processes, one handshake: the backend host and the web UI."
order: 1
---

Mnemo is mid-transition from its original Avalonia desktop UI to a React UI hosted by a C# backend. Active development currently happens on the React port branch (`port/react-ui`); the default branch keeps the stable Avalonia app intact until the port is finished. Check the repository if the branch name has moved on since this was written.

## Prerequisites

- The .NET 10 SDK
- A current Node.js LTS (the frontend uses Vite, which wants a recent Node)
- Git

## Clone and run

```bash
git clone https://github.com/onemnemo/mnemo.git
cd mnemo
git checkout port/react-ui
```

Development runs as two processes. Start the backend host first:

```bash
dotnet run --project Mnemo.Host -- --dev
```

Then, in a second terminal, the web UI:

```bash
cd mnemo-web
npm install
npm run dev
```

Order matters: in dev mode the host binds its API to `127.0.0.1:47210` and writes a small handshake file (`mnemo-web/.dev/api.json`) containing the port and a per-launch auth token. Vite's proxy reads that file and attaches the token to every API request, which is why the frontend never handles credentials in dev. The host waits for the Vite server to come up, then opens the app window pointed at it, hot reload and all.

## A note on data

A development build reads and writes the same local data folder as an installed Mnemo. If you want to hack without your real study library in the blast radius, point the app at a scratch folder first:

```bash
MNEMO_DATA_DIR=/tmp/mnemo-dev dotnet run --project Mnemo.Host -- --dev
```

## The Avalonia app

The original desktop UI still builds and runs on this branch, and is what releases currently package:

```bash
dotnet run --project Mnemo.UI
```

## When something breaks

- Search [existing issues](https://github.com/onemnemo/mnemo/issues) first; build environment problems are usually already reported.
- If it looks new, open an issue with your OS, toolchain versions, and the full error output.
