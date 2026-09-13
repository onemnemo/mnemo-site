---
title: Images in notes
description: Importing, captions, resizing, and where pictures are stored.
order: 6
---

An image in a note is a block like any other: it drags, duplicates, and deletes the same way text does.

## Adding an image

Three ways, in rough order of frequency:

1. **Paste.** Copy an image anywhere, including from a browser, and paste it into the note.
2. **Drop.** Drag image files straight into the editor; each becomes its own block, and the whole drop undoes as one step.
3. **The slash menu.** Insert an Image block and click it to open a file picker.

PNG, JPEG, GIF, WebP, and BMP work, up to 20 MB per image.

Pasting a picture that already lives in another note restages it as a fresh copy of its own, so the two notes never point at the same file; while that runs, a progress card reports how many images are done and offers a cancel, which drops the whole paste before anything lands in the note.

## Captions, size, and alignment

Every image carries an editable caption line that travels with it, a drag handle on its edge for resizing, and controls to sit it left, center, or right.

<!-- image idea: an image block selected, showing resize handle and align controls -->

## The image menu

Right-click a picture, or hover it for its **Image options** button, for **Replace image**, **Crop and reposition**, **Caption**, **Align**, and **Size**, then **Copy image** and **Download**, then **Delete**.
**Crop and reposition** opens the crop dialog: pick an aspect preset or crop freely, then drag the window to frame the picture; dropping or pasting a different picture in while the dialog is open replaces the image outright.
**Size** snaps the width to 25%, 50%, 75%, or 100% of the column.
**Copy image** and **Download** act on the picture as cropped, not the original file behind it.
**Delete** removes the block, or the whole selection when several blocks are selected.

## Where images live

Images are stored inside Mnemo's local data folder and referenced by the note rather than embedded in it. A pasted picture is uploaded as actual pixels, not hotlinked, so the note never depends on some website staying up.
