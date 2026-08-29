---
title: Soma
description: Your study companion, and the rules it plays by.
order: 4
---

Soma is Mnemo's study companion: the axolotl from the app's margins, and, when you want it, a chat that can act inside the app. It helps your memory rather than replacing it, and it is genuinely optional and currently experimental.

## Off by default, on by choice

Mnemo works fully without AI. Soma's chat ships disabled and stays invisible until you enable it in Settings under AI & Tools, where the switch itself warns that AI is still in heavy development. That warning is not a formality.

## Bring your own model

Soma runs on cloud models through [OpenRouter](https://openrouter.ai): you paste your own API key, test the connection, and pick which model answers you. There is no Mnemo server in the middle and no account with us, because there are no accounts at all. Local models are planned but not shipped yet.

Two slots exist, both with sensible defaults: an assistant model that chats with you, and a cheaper writing-tools model for background tasks.

## What agent mode means

With agent mode on, Soma can use tools: create and edit notes, search your library, work with mindmaps, change settings, and record or read statistics. Every step appears live in a process trace above the answer, so you see where Soma looked. Off, it is a plain chat with no reach into your data.

## Privacy, concretely

- Your API key is stored locally and is write-only: the app can use it, but nothing can read it back out, not even the settings screen.
- Conversations and their memory live on your machine like everything else.
- Only what a chat needs is sent to the model you chose. Files you attach are stored and displayed, but they are not fed to the model yet.

And the standing rule: Soma can make mistakes. Double-check the important information.
