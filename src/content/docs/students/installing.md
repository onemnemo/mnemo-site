---
title: Installation
description: How to install Mnemo on Windows, Linux, and macOS, and how updates work.
category: Start here
order: 1
---

Mnemo is free and open source. Installers for every release are published on [GitHub Releases](https://github.com/onemnemo/mnemo/releases/latest).

## Supported platforms

| Platform | Package | Notes |
| :--- | :--- | :--- |
| Windows (x64) | `Setup.exe`, portable `.zip` | Primary platform |
| Linux (x64, arm64) | `.AppImage` | |
| macOS (Intel, Apple Silicon) | `.pkg` | Least tested |

Windows receives the most testing. On Linux and macOS you may hit rough edges.

## Install

1. Download the package for your platform from the [releases page](https://github.com/onemnemo/mnemo/releases/latest).
2. Run it. The installer sets up the app and launches it when finished.

On Windows you can also use the portable `.zip`. Extract it anywhere and run `Mnemo.exe`. Portable installs cannot update themselves in place; you replace the folder with a newer zip instead.

### Windows SmartScreen

Mnemo is not code-signed yet, so Windows may show a "Windows protected your PC" warning. Click **More info**, then **Run anyway**. Only do this for installers downloaded directly from the official [onemnemo/mnemo](https://github.com/onemnemo/mnemo) repository.

## First launch

A short onboarding wizard asks for your display name, theme, and language. After that you land on the **Overview** dashboard. Mnemo creates one welcome note so the notes list is not empty.

## Updates

Mnemo updates itself through its own update feed. On launch, the app checks for a new version (at most once every six hours). When an update is found you get a toast notification, or a badge on the bell icon if toasts are disabled.

To check manually, open **Settings → Updates** and click **Check now**. The same page shows your current version.

Installed builds download and apply updates in place, then restart. The Windows portable build cannot do this; it points you to the releases page instead.

## Uninstalling

Uninstalling removes the application but keeps your data folder (see [where your data lives](/docs/students#where-your-data-lives)). Delete that folder too if you want to remove all notes, decks, and settings.
