---
title: AI assistant
description: The experimental, fully local AI assistant; how to enable it and what it can do.
category: AI assistant
order: 40
---

Mnemo includes an experimental AI assistant. It is disabled by default, runs entirely on your own machine, and is still under heavy development. Expect rough edges.

## Enabling it

1. Open **Settings → AI Tools** and turn on the assistant. A warning dialog explains the experimental status first.
2. Open the model manager from the same page and download the local models. Mnemo detects your hardware and suggests a model tier; stronger machines get larger models.

Once enabled, a **Chat** entry appears in the sidebar and an assistant panel becomes available at the right edge of the window. Models load on the first message, so the first response after a cold start takes noticeably longer than later ones.

## What it can do

- **Chat** with streamed answers and conversation history. Response length is adjustable (short, normal, detailed), and you can choose between a fast model and a stronger reasoning model, or let Mnemo route automatically.
- **Work inside the app.** The assistant can read, create, and edit notes, build and edit mind maps, look up your study statistics, change settings, and navigate to pages, when you ask it to.
- **See images.** Attach an image to a message and the assistant can describe or answer questions about it, if the optional vision models are installed.
- **Take dictation.** Voice input is transcribed locally with Whisper.
- **Remember context.** Long conversations are summarized in the background so the assistant keeps track without rereading everything.

The assistant also powers [learning paths](/docs/students/learning-paths).

## What it cannot do yet

- Generate flashcards from notes.
- Read non-image file attachments in chat. You can attach them, but their contents are not passed to the model.

## Hardware and performance

The models run through llama.cpp on your CPU, or on your GPU when **GPU acceleration** is enabled in the AI settings. Idle models are unloaded after a configurable timeout to free memory. Response quality and speed depend directly on your hardware and the chosen model tier.

## Privacy

Everything stays on your machine. Prompts, answers, chat history, and the models themselves are local. The only network traffic the AI features create is the one-time model download from GitHub. There is no API key, no cloud account, and no telemetry.
