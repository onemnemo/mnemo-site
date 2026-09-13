---
title: Modals and overlays
description: The Modal shell, stacking order, and the overlay mount convention.
order: 2
---

Two things share a name here and should not be confused. `Modal` is a real component you import; `<Feature>Overlay` is a file-naming convention for a mount point, not a shared primitive.

## The Modal shell

`mnemo-web/src/components/ui/modal.tsx` is hand-built rather than a Radix dialog, because the body of a Mnemo dialog is a row, not a column: the widget gallery puts a category rail beside a scrolling grid and both have to reach the dialog's full height. The rule in `standards/04-web.md` still stands for everything anchored to a control: "Popovers, dropdowns, and context menus use Radix. Do not hand-roll portals, anchoring, or flip logic." A modal anchors to nothing, which is why it is the one surface built by hand.

```tsx
interface ModalBaseProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  eyebrow?: ReactNode
  headerExtra?: ReactNode
  headerRight?: ReactNode
  footer?: ReactNode
  dismissOnBackdrop?: boolean // default true
  suspended?: boolean // default false
  width?: number // default 720
  maxHeight?: string // default "min(680px, 88vh)"
  surface?: HTMLAttributes<HTMLDivElement>
  children: ReactNode
  className?: string
}

type ModalCloseControl =
  | {
      closeButton?: true
      /** Accessible name for the close button, localized by the caller. */
      closeLabel: string
    }
  | { closeButton: false; closeLabel?: undefined }
```

The union is the interesting part: the close button is there by default, and the type refuses to compile without a localized name for it. A dialog whose footer carries the only way out passes `closeButton: false` instead.

## What the shell already handles

**Focus.** Focus moves to the first control on open and back to the opener on close, and Tab wraps inside the surface. The trap steps aside while focus sits in a menu opened from inside, since those portal out to the body.

**Escape.** The handler runs on `document` in the capture phase, so it fires before a page that also answers Escape. A Radix menu, select, or dialog opened afterwards gets first refusal: every surface stamps `data-open-order` on open, and an earlier dialog waits its turn.

**The backdrop.** A click on the wash closes the dialog unless `dismissOnBackdrop` is false.

**Suspension.** `suspended` keeps the dialog mounted while another surface owns the window: it fades, ignores keys and pointer input, goes `aria-hidden`, and restores the control that had focus once that surface settles.

## Stacking

`Modal` portals to `document.body` at `Z_LAYERS.modal`. The tiers live in `mnemo-web/src/lib/z-layers.ts`.

| Key          | Value | What sits there                       |
| ------------ | ----- | ------------------------------------- |
| `peek`       | 90    | The overlaying side peek              |
| `menu`       | 95    | Menus, context menus, popovers        |
| `onboarding` | 130   | The onboarding wizard                 |
| `modal`      | 140   | Every `Modal`                         |
| `modalMenu`  | 150   | A menu opened from inside a `Modal`   |
| `toast`      | 220   | Toasts                                |
| `dialog`     | 230   | `DialogHost`, through `getTopLayer()` |

Menus portal to the body, so one opened inside a dialog paints behind it at the normal tier. Add `MODAL_MENU_CLASS` from `mnemo-web/src/components/ui/modal-menu.ts` to opt it up to 150, as `ProofingWordsDialog` does for its row menus. Tooltips sit above everything at a hardcoded `z-[300]` in `components/ui/tooltip/TooltipHost.tsx`.

`Modal` stamps `role="dialog"` and `data-state="open"`, which is what `isModalOpen()` in `mnemo-web/src/lib/modal.ts` queries. Every window-level key handler checks it first, so Space does not grade a card the reader can no longer see.

A real call site, from `overview/config/WidgetConfigOverlay.tsx`:

```tsx
<Modal
  open
  onClose={onClose}
  title={title}
  subtitle={t("WidgetConfig", "Subtitle")}
  closeLabel={t("WidgetConfig", "Cancel")}
  width={420}
  footer={
    <>
      <div />
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onClose}>
          {t("WidgetConfig", "Cancel")}
        </Button>
        <Button onClick={() => { onApply(draft); onClose() }}>{t("WidgetConfig", "Save")}</Button>
      </div>
    </>
  }
>
```

## Overlays are a convention, not a component

There is no `Overlay` primitive to import. The suffix marks a component that decides whether a feature's surface is on screen at all, and it takes three shapes today.

- **Store-driven, mounted once.** `FactEditorOverlay`, `CardTypeOverlay`, `ReviewSettingsOverlay`, and `TransferOverlay` are mounted unconditionally in `App.tsx`. Each reads a small zustand store, returns `null` while it holds no target, and `lazy`-loads the content behind a `Suspense` fallback that portals a skeleton of the dialog's chrome to the body.
- **A direct `Modal` wrapper.** `overview/config/WidgetConfigOverlay.tsx` is rendered by its parent and returns a `Modal`.
- **A positioned panel that is not a `Modal`.** `notes/find/FindReplaceOverlay.tsx` is a `role="dialog"` card pinned beside the editor, mounted as its sibling and driven by `useNoteFind` rather than by a store.

## Adding a new overlay

Pick the first shape when several screens open the surface and none of them should hold its state.

```text
mnemo-web/src/<feature>/<thing>/store.ts            zustand: target, open(), close()
mnemo-web/src/<feature>/<thing>/<Thing>Dialog.tsx   the Modal and its content, lazy-loaded
mnemo-web/src/<feature>/<thing>/<Thing>Overlay.tsx  reads the store, renders null or Suspense
```

Then mount `<ThingOverlay />` in `mnemo-web/src/App.tsx` beside the existing four, unconditionally and with no props. Key the lazy content on the target so reopening for a different subject rebuilds the form rather than leaving the last one's edits in the boxes. Give the `Modal` a `closeLabel` from `useT()`, and add `MODAL_MENU_CLASS` to any menu inside it.

## Related

- [Toasts and dialogs](./toasts-and-dialogs.md) for the queued confirmation host a modal suspends for.
- [Popovers and tooltips](./popovers-and-tooltips.md) for the Radix surfaces that stack above one.
- [The layers](../architecture/the-layers.md) for where UI state belongs.
