---
title: The map library
description: Folders, filing, and the badge that ties maps to study.
order: 2
---

The library is what the mindmaps module opens on: every map you have made, drawn as itself, because a map is recognized by its shape long before its title is read.

<!-- image idea: the mindmap library in grid view with a folder card, several map thumbnails, and a due badge -->

## Folders and filing

**New** creates either a **Map** or a **Folder** at whatever level is open, and folders nest. Filing a map is a drag: drop it on a folder card or row to move it in, or on a crumb in the breadcrumb trail, the root crumb included, to move it back out.

Every card also carries a menu: an overflow button that appears on hover, or a right-click anywhere on the card, and either opens the same list.

A map's menu holds **Rename**, **Duplicate**, **Export**, and **Delete**; a folder's holds just **Rename** and **Delete**, since filing one is the drag above, not a menu item.

**Delete** does not ask you to confirm. It moves the map or folder to the trash and raises an undo toast instead; see [Trash](../../customization/trash.md) for how long it waits there and what a restore brings back.

## The due badge does not appear yet

A map card can carry a badge counting the cards waiting in the decks that map is linked to, and a folder header the same sum for its subtree. The link is stored with the map, and nothing in this beta writes one, so no badge appears in practice. A node pointing at a deck is a reference you can follow, not that link.

## Making a map

**New** and then **Map** opens a small dialog holding a name and a starting template. Six ship: **Dawn Classic**, the default, plus **Rainbow Branches**, **Monochrome**, **Study**, **Org Chart**, and **Blueprint**. The template is asked for here because changing it later restyles a map you have already made decisions about.

<!-- image idea: the new mindmap dialog with the starting template row and one template selected -->

## Related

- [First steps](./first-steps.md): build your first map once the library has made you one.
- [Node types and styling](./node-types-and-styling.md): what a template actually changes.
- [Export and import](./export-and-import.md): the **Transfer** button in the library header, in full.
