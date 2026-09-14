---

title: Installing Mnemo
description: Download Mnemo, install it, and find where your data is stored.
order: 1
---

Mnemo is a desktop app. There is no account to create, and your library stays on your computer.

## Download Mnemo

Mnemo 0.8.0 is available for Windows, macOS, and Linux.

| Platform             | Download                      | Status  |
| -------------------- | ----------------------------- | ------- |
| Windows 10/11, x64   | Installer or portable zip     | Beta    |
| macOS, Apple silicon | Installer or portable archive | Preview |
| Linux, x64           | AppImage or portable archive  | Preview |

Windows is currently the most tested platform. macOS and Linux builds are newer, so you may run into platform-specific issues.

Download Mnemo from the [download page](https://mnemo.one/download) or [GitHub Releases](https://github.com/onemnemo/mnemo/releases/latest).

For most people, the installer is the best option. Portable builds run without installation and can be moved between folders or drives.

## First launch

Mnemo is not code signed yet, so your operating system may show a warning the first time you open it.

On Windows, choose **More info** → **Run anyway**.

On macOS, you may need to allow Mnemo through Gatekeeper before opening it for the first time.

Mnemo will then take you through a short setup wizard.

## Where your data is stored

Mnemo stores your notes, decks, mindmaps, attachments, and other library data locally.

On Windows:

`%LOCALAPPDATA%\Mnemo`

On macOS and Linux, Mnemo uses the normal per-user application data directory.

You can set `MNEMO_DATA_DIR` to use a different data folder. This is useful for separate profiles or development installs.

For backups and restoring your library, see [Storage and backup](../customization/storage-and-backup.md).

## Updates

Update settings are available under **Settings → Updates**.

Automatic update checks are enabled by default. When a new version is available, Mnemo will let you update immediately or leave it for later.

You can also choose a release channel:

* **Stable** — finished releases
* **Beta** — new features earlier, with a higher chance of bugs
* **Nightly** — latest development builds

Use **Check for updates** to check manually, or **Release notes** to view the changelog.

## Next

[Your first session](./your-first-session.md) walks through creating your first deck and starting a review.

[Customization](../customization/index.md) covers themes, language, and other preferences.
