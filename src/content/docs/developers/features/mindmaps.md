---
title: Mind maps system
description: The graph model, the mutator-session-history trio, and layout services.
category: Features
order: 41
---

The mind map feature is a graph editor. Its interesting part is not the model, which is small, but the way editing state is composed so that undo, mutation, and rendering all see the same graph.

## Model

`Mindmap` (`Mnemo.Core/Models/Mindmap/`) holds nodes, edges, and a layout. `MindmapNode` has a node type (only `"text"` is implemented, content behind `IMindmapNodeContent`), plus style and metadata dictionaries for color, shape, and collapsed state. `MindmapEdge` has a kind: `Hierarchy` edges form the tree that layouts operate on; `Link` edges are free connections ignored by layout. Visual edge types (solid, dashed, dotted, double, arrow, bidirect) are presentation properties. Positions live in `MindmapLayout` as per-node rectangles.

Persistence follows the standard pattern: an index key `mindmaps_list` and one `mindmap_{id}` document each, through `MindmapService`. The service contains a stubbed version-migration hook with no logic behind it yet.

## Editing composition

`MindmapModule` registers `MindmapViewModel` through a DI factory rather than plain transient registration, and this is the part to understand before changing anything. One view model instance owns one object graph:

- `MindmapEditorSession`: the live graph state.
- `MindmapGraphMutator`: the only component allowed to mutate the graph.
- `MindmapEditorHistory`: snapshots graph state (`MindmapStateOperation`) into the shared history manager, cleared when a map loads.
- `MindmapClipboard`, layout service, and the camera.

If these resolved independently as transients, each would get its own graph and edits would silently diverge. The factory keeps them on one instance per navigation. Comments in `MindmapModule.cs` explain the same constraint.

## Layout

`MindmapLayoutService` implements three algorithms: vertical tree, horizontal tree, and radial. Layouts consume only hierarchy edges. Applying one rewrites `MindmapLayout`; manual node drags afterward update individual entries.

## Export and AI

PNG export renders the canvas (`MindmapView.Export.cs`); it is one-way. Round-trip transport is the `.mnemo` package, whose mindmap payload is a JSON list of maps. When the assistant is enabled, the Mindmap skill exposes tools (`list_mindmaps`, `read_mindmap`, `create_mindmap`, `add_nodes`, `connect_nodes`, `style_nodes`, `apply_layout`, `open_mindmap`) implemented by `MindmapToolService` over the same service layer the UI uses.

## Where the code lives

| Concern | Path |
| :--- | :--- |
| Models | `Mnemo.Core/Models/Mindmap/` |
| Persistence | `Mnemo.Infrastructure/Services/MindmapService.cs` |
| UI module, mutator, session, history | `Mnemo.UI/Modules/Mindmap/` |
| AI tools | `Mnemo.Infrastructure/Services/Tools/` (mindmap), manifest `Mnemo.Infrastructure/skills/Mindmap/` |
