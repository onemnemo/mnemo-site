---
title: Installing Mnemo
description: Which platforms have a build, and where your library lives.
order: 1
---

Mnemo is a desktop app with no account to create and no server to connect to, so downloading it is most of the setup.

## What is published today

Mnemo is in the 0.8.0 beta, and all three desktop platforms have a packaged build.

| Platform               | Build                                 | Status                                  |
| ---------------------- | ------------------------------------- | --------------------------------------- |
| Windows 10 and 11, x64 | Installer or portable zip             | Used daily, unsigned                    |
| macOS, Apple silicon   | Installer package or portable archive | First preview, unsigned and not notarized |
| Linux, x64             | AppImage or portable archive          | First preview                           |

Windows has had months of daily use. The macOS and Linux packages are new and still need wider hardware coverage, so treat them as previews and report anything platform specific.

Releases go to the [download page](https://mnemo.one/download) and to [GitHub Releases](https://github.com/onemnemo/mnemo/releases/latest). The installer is the normal route; the portable build is the same app in a folder you can move, and it cannot install an update into itself, so Mnemo sends you back to GitHub for the next version.

## The first launch

No build is code signed yet, so the operating system warns the first time you open Mnemo: on Windows, SmartScreen wants **More info**, then **Run anyway**, and on macOS, Gatekeeper warns before the first run.

A short setup wizard runs once; every answer lives in Settings afterwards, and **Skip setup** counts as finishing, so it does not come back.

A beta build then says once that it is a beta, because some parts still have rough edges. The notice carries a button that makes the same one file backup Settings offers and a link to the issue form, and it appears once per beta version rather than on every launch.

## Where your data lives

Mnemo creates a data folder on first launch and keeps your decks, notes, maps, and the images and files inside them there: `%LOCALAPPDATA%\Mnemo` on Windows, and the per-user local application data directory on macOS and Linux. Setting `MNEMO_DATA_DIR` points the app at a different root, which is how a second install runs against its own profile.

Copying that folder is not the only way to keep a copy: [Storage and backup](../customization/storage-and-backup.md) covers the single restorable file Settings under Storage & data writes, and restoring from one.

## Staying up to date

Settings under Updates holds the controls. **Check for updates automatically** is on by default and asks GitHub for a newer version when Mnemo starts, rate limited so it does not ask on every launch. When an automatic check finds one, a notification says which version is ready and offers **Update now** or **Later**; it waits for an answer rather than fading, and dismissing it counts as **Later**. After the restart, Mnemo confirms once which version it came up as.

**Release channel** decides how close to development you sit: Stable carries finished releases only, Beta gets new features earlier and can contain bugs, and Nightly carries the latest development changes and can be unstable. Each channel offers its own builds and every calmer channel's, so Beta still gets the finished release when it lands. **Check for updates** runs a check on demand, and **Release notes** opens the changelog on GitHub.

## Related

- [Your first session](./your-first-session.md) turns a fresh install into a deck you review tomorrow.
- [Customization](../customization/index.md) covers the theme and language the wizard asked for.
