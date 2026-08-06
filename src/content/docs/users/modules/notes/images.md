---
title: Images in notes
description: Importing, captions, resizing, and what happens to pasted pictures.
order: 5
---

An image in a note is a block like any other: it drags, duplicates, and deletes the same way text does. Getting pictures in is designed to be the fast part.

## Adding an image

Three ways, in rough order of frequency:

1. **Paste.** Copy an image anywhere, including from a browser, and paste it into the note. Mnemo uploads the actual pixels and stores them locally, so the note never depends on some website staying up.
2. **Drop.** Drag image files straight into the editor; each becomes its own block, and the whole drop undoes as one step.
3. **The slash menu.** Insert an Image block and it appears as a card reading "Click to import image", which opens a file picker.

PNG, JPEG, GIF, WebP, and BMP work, up to 20 MB per image.

## Captions, size, and alignment

Below every image sits an editable caption line ("Add a caption..."), which stays attached to the image wherever it goes. Hover the image and drag the handle on its edge to resize it, or use the alignment controls that appear to sit it left, center, or right. Each adjustment is a single undo step.

<!-- image idea: an image block selected, showing resize handle and align controls -->

## Where images live

Images are stored inside Mnemo's local data folder and referenced by the note, not embedded in it. You do not need to manage that folder: when an image is no longer referenced by any note, Mnemo cleans it up on its own after a grace period, so deleted pictures do not haunt your disk.
