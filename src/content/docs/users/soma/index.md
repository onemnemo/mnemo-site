---
title: Soma
description: Your study companion, and the rules it plays by.
order: 4
---

Soma is Mnemo's study companion: the axolotl from the app's margins, and, when you want it, a chat that can act inside the app. It helps your memory rather than replacing it, and it is genuinely optional and currently experimental.

## Off by default, on by choice

Mnemo works fully without AI. Soma is hidden throughout the beta while it is prepared for general use, which means there is no switch to find by wandering through Settings: reaching it takes a deliberate detour.

Tap the **Settings** title seven times within two seconds and a **Developer mode** switch appears under General. Turning that on lists an **AI & Tools** page, whose master switch is what actually enables the assistant, and that switch warns you before it will turn on. The warning is not a formality.

Both switches have to be on. Turning developer mode back off takes every AI surface with it, whatever the assistant switch was left at.

## Bring your own model

Soma runs on cloud models through [OpenRouter](https://openrouter.ai): you paste your own API key, test the connection, and pick which model answers you. There is no Mnemo server in the middle and no account with us, because there are no accounts at all. Local models sit in the provider dropdown but cannot be selected yet; they are planned, not shipped.

Two slots exist, both with sensible defaults: an **Assistant model** that chats with you, and a cheaper **Utility model** for background work.

## What agent mode means

With **Agent mode** on, Soma can use tools: create and edit notes, work with mindmaps, read and write statistics, change settings, and move you around the app. Every step appears live in a process trace above the answer, so you see where Soma looked. Off, it is a plain chat with no reach into your data.

Web search is its own switch, on by default, with its own provider: **DuckDuckGo** out of the box, **SearXNG** against an address you supply, **Brave** against an API key, or **None** to take the web away and leave the rest of the tools alone.

## Using the chat

Soma opens in a dock beside your work rather than on a page of its own, from the **Soma** entry in the sidebar or with `Ctrl+J` (`Cmd+J` on macOS). It pushes the canvas across instead of covering it, and it survives navigation, so the conversation stays while you move around the app.

Conversations are kept in a searchable list grouped by age, and each one can be renamed or deleted from its context menu. A fresh chat offers a few starting prompts instead of an empty box.

Hovering an answer reveals its actions: a thumb up or down kept with the conversation, copy, and regenerate, which leaves the old reply in place if the new attempt fails. Your own messages can be edited and sent again, which cuts the conversation back to that point.

## Privacy, concretely

- Your API key is stored locally and is write-only: the app can use it, but nothing can read it back out, not even the settings screen.
- Conversations and their memory live on your machine like everything else, and **AI & Tools** has a control that clears the lot.
- Only what a chat needs is sent to the model you chose. Files you attach are stored and displayed, but they are not fed to the model yet.

And the standing rule: Soma can make mistakes. Double-check the important information.
