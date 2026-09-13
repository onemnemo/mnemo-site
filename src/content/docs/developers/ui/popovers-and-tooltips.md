---
title: Popovers and tooltips
description: The Radix popover wrapper and the single host that draws every tooltip.
order: 3
---

Two surfaces float over the chrome, and neither is built by hand: a popover is Radix under a thin wrapper, and every tooltip is one element that moves.

## Popovers are Radix, never hand-rolled

The rule is in `standards/04-web.md`: "Popovers, dropdowns, and context menus use Radix. Do not hand-roll portals, anchoring, or flip logic." Collision handling is the reason: a panel opened near the window edge has to flip and shift, and hand-rolling that is how a menu ends up half off the screen.

`mnemo-web/src/components/ui/popover.tsx` is the wrapper. Three exports are Radix parts renamed; only the content is wrapped.

```tsx
export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger
export const PopoverClose = RadixPopover.Close

export function PopoverContent({
  children,
  align = "start",
  side = "bottom",
  className,
}: {
  children: ReactNode
  align?: "start" | "center" | "end"
  /** Which way the panel opens. Set it when the trigger sits at the edge it would open into. */
  side?: "top" | "right" | "bottom" | "left"
  className?: string
})
```

The content portals out with `sideOffset={4}` and `collisionPadding={8}`, and paints at `z-[95]`, the `Z_LAYERS.menu` tier from `src/lib/z-layers.ts`, spelled literally because Tailwind reads class names from the source. `PopoverGroupLabel` is the only addition: a quiet heading over one group of choices, never a control.

## A panel that is a layout, not a list

The file comment draws the line: the menu next door is the right shape for a column of labelled actions and the wrong one for a grid of previews. Both carry the same surface, border, and shadow, so the two read as one family.

`mnemo-web/src/mindmap/chrome/MapStyleMenu.tsx` earns it: arrangements, materials, palettes, and backgrounds as tiles.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button type="button" title={t("Mindmap", "MapStyle")}>
      {algorithm ? t("Mindmap", LAYOUT_KEY[algorithm]) : t("Mindmap", "MapStyle")}
    </button>
  </PopoverTrigger>

  <PopoverContent align="end" className="w-[262px]">
    <PopoverGroupLabel>{t("Mindmap", "GroupArrangement")}</PopoverGroupLabel>
    <div className="grid grid-cols-3 gap-1 px-1">{/* one Tile per arrangement */}</div>
  </PopoverContent>
</Popover>
```

## One host draws every tooltip

`TooltipHost` mounts once, last in `App.tsx`, so its portal is topmost in the body and a hint is never drawn under the overlay whose button raised it; it renders at `z-[300]`, above the dialog tier.

The host listens on the document for `pointerover` and `focusin`, then walks up with `element.closest("[data-tooltip],[title]")`. A plain `title` is therefore already a Mnemo tooltip, with nothing to opt into.

It removes that `title` while the hint is up, since Chromium starts a tooltip timer of its own on the move that lands and nothing on the page can call it off. Where `title` was the only accessible name, the same words go back as `aria-label` until it is returned.

## When a hint needs more than a line

Reach for the component in `mnemo-web/src/components/ui/tooltip/Tooltip.tsx` when the hint needs a shortcut on a cap, or a side other than above.

```tsx
export interface TooltipProps {
  /** The line of text. An empty one leaves the child untouched. */
  label: string
  /** A canonical chord ("F", "Primary+Shift+H"), drawn as one cap per key. */
  chord?: string | null
  /** Preferred side. It still flips when there is no room. */
  side?: TooltipSide
  /** A single element that passes props through to a DOM node. */
  children: ReactElement
}
```

It renders nothing of its own: it clones its child with `data-tooltip`, adds `data-tooltip-chord` and `data-tooltip-side` when given, and clears the child's `title`. A mindmap toolbar slot in `mnemo-web/src/mindmap/chrome/bits.tsx`:

```tsx
<Tooltip label={label} chord={chord}>
  <button type="button" aria-label={label} aria-pressed={active} onClick={onClick}>
    {children}
  </button>
</Tooltip>
```

## Delay, warmth, and what never gets one

The first hint waits `SHOW_DELAY`, 400 ms of the pointer resting; for `WARM_WINDOW`, 320 ms after one closes, the next opens instantly, so a run along a toolbar reads as one surface answering rather than six controls each making you wait. A key press, a scroll, or the window losing focus hides it.

Four things raise nothing: a touch pointer, because a tooltip on tap is a control that ate your tap; a pointer already pressed; focus that is not `:focus-visible`; and anything inside `contenteditable`. The last is ProseMirror: moving an attribute on a node the editor owns is a document mutation, so editor chrome marks itself with `applyTooltip` from `src/components/ui/tooltip/apply.ts`.

## Related

- [Toasts and dialogs](./toasts-and-dialogs.md), for the surfaces that speak without being pointed at.
- [Modals and overlays](./modals-and-overlays.md), for the rest of the stacking order.
- [The layers](../architecture/the-layers.md), for where UI components sit in the whole.
