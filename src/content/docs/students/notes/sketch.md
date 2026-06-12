---
title: Sketch Diagrams
description: A text-to-diagram engine that generates visual layouts from plain text descriptions.
category: Notes
order: 14
---

Sketch is a text-to-diagram engine that generates visual layouts from plain text descriptions. Instead of manually positioning shapes and connectors, you define the relationships between entities, and Sketch handles the positioning and rendering.

Sketch is designed for flowcharts, concept maps, system architectures, process diagrams, timelines, and study guides.

---

## Quick Start

The fundamental building block is a connection between two nodes.

```text
Student -> Book
Student -> Teacher
Teacher -> Whiteboard
```

### Adding Labels

Append a colon (`:`) followed by the label text:

```text
Student -> Book : reads
Student -> Teacher : asks questions
Teacher -> Whiteboard : explains
```

---

## Syntax and Core Concepts

### Nodes and Identifiers

By default, any single word is treated as a node. For names with spaces or when you need stable references, use an explicit **ID** (in brackets) and a **Label** (in quotes):

```text
# Simple nodes
Cell -> Nucleus

# Explicit IDs and Labels
[student] "Student"
[textbook] "Biology Textbook"

[student] -> [textbook] : reads
```

- **ID (`[student]`):** The internal key used to reference the node.
- **Label (`"Biology Textbook"`):** The text displayed visually in the diagram.

Using explicit IDs decouples your layout logic from the displayed text — you can rename labels without breaking connections.

### Connection Types

| Syntax | Type | Use Case |
| :--- | :--- | :--- |
| `A -> B` | Directed (one-way) | Flows, sequences, dependencies |
| `A <-> B` | Bidirectional | Mutual interaction |
| `A -- B` | Undirected | General associations |

---

## Styling and Reusability

### Inline Styles

Customize individual nodes with a property block:

```text
Student {
  fill: blue
  shape: rounded-rect
  stroke: darkblue
  stroke-width: 2.5
}
```

**Supported properties:**

- `fill` — background color
- `stroke` — border color
- `stroke-width` — border thickness (numeric)
- `shape` — node geometry: `rect`, `rounded-rect`, `circle`, `diamond`

### Classes

Define reusable styles with `class` to avoid repetition:

```text
class person {
  shape: rounded-rect
  fill: blue
}

Student { class: person }
Teacher { class: person }

Administrator {
  class: person
  fill: green
}
```

---

## Layout and Structure

### Groups

Use `group` to visually cluster related nodes:

```text
group classroom "Classroom" {
  Student
  Teacher
  Whiteboard
}

Student -> Teacher : asks
Teacher -> Whiteboard : explains
```

### Diagram-wide Settings

Configure global parameters with a `sketch` block:

```text
sketch {
  title: "Application Architecture"
  layout: dag
  direction: left-to-right
}
```

| Property | Options |
| :--- | :--- |
| `title` | Any string |
| `layout` | `dag` (directed acyclic graph) |
| `direction` | `left-to-right`, `top-to-bottom`, `right-to-left`, `bottom-to-top` |

---

## Additional Features

### Interactive Nodes

Add hover tooltips or hyperlinks:

```text
Book {
  tooltip: "A source of information"
  link: "https://example.com/book"
}
```

Deep-link to internal Mnemo notes or blocks:

```text
Mitosis {
  opens: "block://biology/mitosis"
}
```

### Comments

Use `#` for comments — the renderer ignores these lines:

```text
# This is a comment and will not render
Cloud -> Rain : falls
```

---

## Complete Example

```text
sketch {
  title: "Educational Ecosystem"
  layout: dag
  direction: left-to-right
}

class human {
  shape: rounded-rect
  fill: blue
}

class asset {
  shape: rect
  fill: yellow
}

group classroom "Physical Classroom" {
  [student]
  [teacher]
  [board]
}

[student] "Student" {
  class: human
  tooltip: "Classroom learner"
}

[teacher] "Teacher" {
  class: human
}

[book] "Textbook" {
  class: asset
}

[board] "Whiteboard" {
  class: asset
}

[student] -> [teacher] : asks questions
[student] -> [book] : reads
[teacher] -> [board] : explains
```

---

## Syntax Reference

### Basic Syntax

| Goal | Syntax |
| :--- | :--- |
| Node with implicit ID | `NodeName` |
| Node with explicit ID/Label | `[node_id] "Display Label"` |
| Directed connection | `A -> B` |
| Labeled connection | `A -> B : Label` |
| Bidirectional connection | `A <-> B` |
| Undirected connection | `A -- B` |
| Comments | `# Comment text` |

### Styling & Configuration

| Goal | Syntax |
| :--- | :--- |
| Inline style block | `Node { fill: red; shape: circle }` |
| Define a class | `class name { fill: red }` |
| Apply a class | `Node { class: name }` |
| Create a group | `group id "Label" { Node1 Node2 }` |
| Global configuration | `sketch { title: "Title"; direction: left-to-right }` |
| Interactivity | `Node { tooltip: "Info"; link: "url" }` |
