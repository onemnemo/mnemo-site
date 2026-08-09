---
title: Soma
description: Your study companion, and the rules it plays by.
order: 4
---

Soma is Mnemo's study companion: the same axolotl that lives in the app's margins, and, when you want it, a chat that can act inside the app, searching your notes, editing mindmaps, adjusting settings, and reading your study statistics. The point is help for your memory, not a replacement for it. It is genuinely optional, currently experimental, and this page is the honest version of both.

## Off by default, on by choice

Mnemo works fully without AI. Soma's chat ships disabled and stays invisible until you enable it in Settings under AI & Tools, where the switch itself warns you that AI is still in heavy development. Expect rough edges; that warning is not a formality.

## Bring your own model

Soma runs on cloud models through [OpenRouter](https://openrouter.ai): you paste your own API key, test the connection, and pick which model answers you. There is no Mnemo server in the middle and no account with us, because there are no accounts at all. Local models are planned but not shipped yet.

Two model slots exist: the assistant model that chats with you, and a cheaper writing-tools model for background tasks. Sensible defaults are picked for both.

## What agent mode means

With agent mode on, Soma can use tools: create and edit notes, search your library, work with mindmaps, change settings, and record or read statistics. Every step it takes is shown live in a process trace right in the conversation, above the answer it is working on, so you always see what Soma is doing and where it looked. Turn agent mode off and it becomes a plain chat with no reach into your data.

## Privacy, concretely

- Your API key is stored locally and is write-only: the app can use it, but nothing can read it back out, not even the settings screen.
- Conversations and their memory live on your machine like everything else.
- Only what a chat needs is sent to the model you chose. Files you attach to a chat are stored and displayed, but they are not fed to the model yet.

And the standing rule: Soma can make mistakes. Double-check the important information.
