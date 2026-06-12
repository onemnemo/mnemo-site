---
title: Import and export
description: The coordinator and adapter model, the format matrix, and Anki specifics.
category: Features
order: 43
---

All import and export flows through one coordinator and a set of format adapters. UI code never does file IO for content; it asks `ImportExportCoordinator` (`Mnemo.Infrastructure/Services/ImportExport/`) for the adapters that handle a content type, and the adapter does the rest.

## The adapter model

`IContentFormatAdapter` couples a content type (notes, flashcards, mindmaps) with a file format and implements import, export, or both. Adapters register in `Bootstrapper`:

| Format ID | Extension | Import | Export |
| :--- | :--- | :---: | :---: |
| `notes.markdown` | `.md` | yes | yes |
| `notes.mnemo` | `.mnemo` | yes | yes |
| `flashcards.anki` | `.apkg` | yes | yes |
| `flashcards.csv` | `.csv` | yes | yes |
| `flashcards.mnemo` | `.mnemo` | yes | yes |
| `mindmaps.mnemo` | `.mnemo` | yes | yes |

A new format means a new adapter class plus one registration line. PDF export is intentionally outside this system; it is a rendering concern handled by `NotePdfExportService` (QuestPDF) and has no import direction.

## The Anki adapter

`FlashcardsAnkiFormatAdapter` is the most involved adapter. An `.apkg` is a ZIP holding an Anki SQLite database (`collection.anki2` or `anki21`) plus numbered media files with a JSON name map. Import reads notes and cards from SQLite, converts HTML field content to block content, copies media into Mnemo's image store, detects cloze markers, and maps Anki due dates onto Mnemo's scheduling fields. Two deliberate simplifications: imported decks are assigned the FSRS scheduler regardless of the source, and Anki's internal scheduler state is not translated; FSRS memory state is rebuilt from the first Review session onward. Complex multi-field note types degrade to front and back.

## The .mnemo package

The package format itself (ZIP, manifest, payload handlers) is documented on the [storage page](/docs/developers/platform/storage#the-mnemo-package). The `.mnemo` adapters above are thin wrappers that delegate to `MnemoPackageService` with a payload filter.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Coordinator | `Mnemo.Infrastructure/Services/ImportExport/ImportExportCoordinator.cs` |
| Adapters | same folder, `*FormatAdapter.cs` |
| Packaging | `Mnemo.Infrastructure/Services/Packaging/` |
| PDF export | `Mnemo.Infrastructure/Services/Notes/Pdf/` |
| Tests | `ImportExportCoordinatorTests`, `MnemoPackageServiceTests` |
