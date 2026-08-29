---
title: Installing Mnemo
description: Which platforms have a build, and where your library lives.
order: 1
---

Mnemo is a desktop app with no account to create and no server to connect to, so downloading it is most of the setup.

## What is published today

Mnemo is at version 0.8.0-beta, and Windows is the only platform with a tested packaged release.

| Platform | Status            | What you get                    |
| -------- | ----------------- | ------------------------------- |
| Windows  | Published         | An installer, or a portable zip |
| macOS    | Not published yet | Compiles, not packaged yet      |
| Linux    | Not published yet | Compiles, not packaged yet      |

Releases go to the [download page](https://mnemo.one/download) and to [GitHub Releases](https://github.com/onemnemo/mnemo/releases/latest). The installer is the normal route; the portable zip is the same build in a folder you can move.

## The first launch

Windows builds are not code signed yet, so SmartScreen shows a warning the first time you open Mnemo. Choose **More info**, then **Run anyway**.

A short setup wizard runs once; every answer lives in Settings afterwards, and **Skip setup** counts as finishing, so it does not come back.

## Where your data lives

Mnemo creates a data folder on first launch and keeps your decks, notes, and maps in it: `%LOCALAPPDATA%\Mnemo` on Windows, and the equivalent per-user local data directory on macOS and Linux. Backing that folder up backs up your library; copy it to another machine and Mnemo picks it up on the next launch. Setting `MNEMO_DATA_DIR` points the app at a different root, which is how a second install runs against its own profile.

## Staying up to date

Settings under Updates holds the update controls: **Check for updates automatically** is on by default and checks GitHub on launch, and **Release channel** chooses between Stable, which carries finished releases only, and Beta, which gets new features earlier and can contain bugs.

## Related

- [Your first session](./your-first-session.md) turns a fresh install into a deck you review tomorrow.
- [Customization](../customization/index.md) covers the theme and language the wizard asked for.
