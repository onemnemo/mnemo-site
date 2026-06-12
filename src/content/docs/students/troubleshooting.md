---
title: Troubleshooting
description: Common problems, log locations, and how to file a useful bug report.
category: Help
order: 50
---

## First steps

1. Restart the app. Transient issues often clear on a fresh launch.
2. Update. Open **Settings → Updates** and click **Check now**; your problem may already be fixed.
3. Search the [issue tracker](https://github.com/onemnemo/mnemo/issues) for existing reports.

## Installation

- **Windows SmartScreen blocks the installer.** Mnemo is not code-signed yet. Click **More info**, then **Run anyway**. See [Installation](/docs/students/installing#windows-smartscreen).
- **macOS or Linux problems.** These platforms get less testing than Windows. Check the release notes on the [releases page](https://github.com/onemnemo/mnemo/releases/latest) for platform-specific notes.

## AI assistant

- **Chat or Learning Path is missing from the sidebar.** The assistant is off. Enable it under **Settings → AI Tools**.
- **The first answer takes very long.** Models start on the first message after launch. Later messages are faster. Models also unload after sitting idle, which causes the same delay once.
- **Answers fail or models are missing.** Open the model manager in **Settings → AI Tools** and confirm the models finished downloading.
- **Slow answers.** Try a smaller model tier, or enable **GPU acceleration** if you have a supported GPU.

## Your data and logs

| What | Where (Windows) |
| :--- | :--- |
| Notes, decks, maps, settings | `%LocalAppData%\Mnemo\mnemo.db` |
| Images used in notes | `%LocalAppData%\Mnemo\images\` |
| Logs | `%LocalAppData%\Mnemo\logs\` |
| AI models | `%LocalAppData%\mnemo\models\` |

On Linux the equivalent root is `~/.local/share/Mnemo/`, on macOS `~/Library/Application Support/Mnemo/`.

There is no automatic backup. To make one yourself, export a [`.mnemo` package](/docs/students/import-export) or copy `mnemo.db` and the `images` folder while the app is closed.

## Reporting a bug

Open an issue on [GitHub](https://github.com/onemnemo/mnemo/issues/new) and include:

- Your operating system and version.
- The Mnemo version from **Settings → Updates**.
- Steps to reproduce the problem.
- The relevant log file from the logs folder, if the issue produces an error.
