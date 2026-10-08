---

title: Installing Mnemo
description: Download Mnemo, install it, and find where your data is stored.
order: 1
---

Mnemo is a desktop app. There is no account to create, and your library stays on your computer.

## Download Mnemo

Mnemo 0.8 is launching in beta. This is the first proper release since the app was rebuilt on a different framework. Expect bugs and quirks, and frequent updates as more people try it on different hardware.

| Platform             | Download                      | Status  |
| -------------------- | ----------------------------- | ------- |
| Windows 10/11, x64   | Installer or portable zip     | Most tested |
| macOS, Apple silicon | Installer or portable archive | Verified |
| Linux, x64           | AppImage or portable archive  | Limited testing |

Windows is further along and has had substantially more testing. The macOS build has been installed and verified on an Apple silicon Mac and is notarized by Apple, but it has had less testing than Windows. There is no Intel Mac build. Linux has had less development attention and only limited testing.

Use the [download page](https://mnemo.one/download) for the current version and direct downloads, or browse [all GitHub releases](https://github.com/onemnemo/mnemo/releases). Beta builds are numbered release candidates, such as `v0.8.1-rc.1`. A finished release has no suffix, such as `v0.8.1`. Downloads appear when the release and its files are published.

All release candidates are beta software. Bugs can cause data loss. Keep a separate [backup of your library](../customization/storage-and-backup.md), especially before updating. Early updates may include urgent fixes as well as improvements and new features.

For most people, the installer is the best option. Portable builds run without installation and can be moved between folders or drives.

## First launch

The Windows build is not code signed yet, so Windows may show a warning the first time you open it. Choose **More info** → **Run anyway**.

The macOS build is notarized by Apple, so Gatekeeper lets it open without an override. macOS still asks you to confirm the first time you open an app downloaded from the internet.

Mnemo will then take you through a short setup wizard.

### Windows requirements

Mnemo needs the [Microsoft Edge WebView2 Evergreen Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/consumer/). It is usually already installed on Windows 10 and 11. If Mnemo will not start, check that this runtime is present.

### Linux requirements

The x64 build targets Ubuntu 22.04 or newer. The AppImage needs permission to run: open its file properties and enable execution, or run `chmod +x` with the downloaded filename.

Linux needs GTK 3, WebKitGTK 4.1, JavaScriptCoreGTK, libnotify, and FUSE 2. On Ubuntu 24.04, install them with:

```bash
sudo apt install libfuse2t64 libwebkit2gtk-4.1-0 libjavascriptcoregtk-4.1-0 libgtk-3-0t64 libnotify4
```

Package names differ on other distributions. The portable archive also needs the native runtime libraries; it does not need FUSE to unpack.

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

* **Stable**: finished releases
* **Beta**: new features earlier, with a higher chance of bugs
* **Nightly**: latest development builds

Use **Check for updates** to check manually, or **Release notes** to view the changelog.

## Next

[Your first session](./your-first-session.md) walks through creating your first deck and starting a review.

[Customization](../customization/index.md) covers themes, language, and other preferences.
