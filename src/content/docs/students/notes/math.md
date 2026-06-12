---
title: Math and equations
description: Writing LaTeX math in notes with Mnemo's built-in equation renderer.
category: Notes
order: 11
---

Mnemo renders math itself, with no web view and no internet connection. You write a subset of LaTeX and the editor draws it directly. Equations also render in PDF exports.

There are two kinds of equations:

- **Equation blocks** stand alone on their own line. Insert one from the `/` menu. Click a rendered block to edit its LaTeX source.
- **Inline equations** sit inside a line of text. Select text and choose the equation option in the formatting toolbar, then edit the source in the small editor that opens. An inline equation behaves as a single character when you move the caret or select around it.

[SCREENSHOT: Equation block with the edit flyout open]

## Supported LaTeX

Structures:

| Syntax | Result |
| :--- | :--- |
| `\frac{a}{b}` | Fraction |
| `\sqrt{x}`, `\sqrt[n]{x}` | Root with optional index |
| `x_1`, `x^2`, `x_i^2` | Subscript and superscript |
| `\left( ... \right)` | Brackets that grow with the content |
| `\begin{pmatrix} a & b \\ c & d \end{pmatrix}` | Matrix. Also `matrix`, `bmatrix`, `vmatrix`, `Vmatrix` |
| `\text{...}` | Upright text inside math |
| `\mathbb{R}`, `\mathbf{x}` | Blackboard bold and bold |
| `\quad`, `\qquad` | Horizontal spacing |

Symbols: around 200 commands are recognized, covering the common cases.

| Category | Examples |
| :--- | :--- |
| Greek letters | `\alpha`, `\beta`, `\pi`, `\Omega`, `\varepsilon` |
| Operators | `\sum`, `\int`, `\prod`, `\times`, `\cdot`, `\pm` |
| Relations | `\leq`, `\geq`, `\neq`, `\approx`, `\in`, `\subset` |
| Arrows | `\to`, `\Rightarrow`, `\mapsto`, `\leftrightarrow` |
| Logic and sets | `\forall`, `\exists`, `\wedge`, `\vee`, `\cup`, `\cap` |
| Misc | `\infty`, `\partial`, `\nabla`, `\cdots`, `\hbar` |

## Limitations

The renderer covers everyday math notation, not the full LaTeX language.

- Multi-line environments like `align` are not supported. Other `\begin{...}` environments besides the matrix family render their content without special layout.
- There are no color or font-size commands inside equations.
- A command the parser does not know is shown as its literal text rather than an error, so typos are easy to spot in the rendered output.

## Quick fractions

Outside of equations, typing `\3/7` in regular text inserts a compact inline fraction. This is a text feature, not LaTeX, and is useful for quick numeric fractions in prose.

## Export behavior

In Markdown exports, equation blocks become `$$...$$` and inline equations become `$...$`. PDF export renders equations exactly as they appear in the editor.
