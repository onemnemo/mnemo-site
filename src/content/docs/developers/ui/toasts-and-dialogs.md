---
title: Toasts and dialogs
description: Fire-and-forget toasts, and promise-based confirm and prompt questions.
order: 1
---

Two surfaces are raised from code rather than rendered by a component: `toast.*` reports what happened, and `dialog.confirm` and `dialog.prompt` ask a question and wait for the answer. Each is a singleton store with one host, so either costs a call and no markup.

## The five toast types

Each type takes a title and options and returns the new toast's id. The union mirrors `Mnemo.Core`'s `ToastType`, so a toast pushed from the Host lands in the same buckets as one raised in the SPA:

```ts
export type ToastType = "info" | "success" | "warning" | "action" | "progress"
```

`info` is the only type `ToastHost` draws with a dot rather than an icon, `action` carries something to answer, and `progress` never expires on its own. The undo presenter in `mnemo-web/src/trash/undo.ts` is the shape to copy:

```ts
toast.action(t("Trash", "DeletedOneFormat", { 0: first.title }), {
  description: t("Trash", days === 1 ? "KeptForDay" : "KeptForDays", { 0: days }),
  durationMs: 9000,
  primary: { label: t("Trash", "Undo"), onClick: () => void undo() },
})
```

## What you can put on a toast

```ts
export interface ToastOptions {
  description?: string
  notificationAction?: { label: string; href: string }
  durationMs?: number
  primary?: ToastAction
  secondary?: ToastAction
  onDismissed?: () => void
}
```

- **`durationMs` defaults to `5000`, and `0` holds the toast until something dismisses it.** `toast.progress` forces `0`.
- **`primary` and `secondary` are `{ label, onClick, dismissAfter }`.** `dismissAfter` defaults to true, so a handler that leaves its toast standing opts out.
- **`notificationAction` is a link, not a callback.** A callback cannot outlive the toast that carried it; the notification list takes an `href` instead.
- **`onDismissed` fires only on the close control,** never on auto-dismiss and never after an action.

Strings arrive translated, since the stores are i18n-agnostic: callers resolve text with `t(namespace, key)`, from `useT` inside a component and `createTranslate` outside one. The standard is absolute: "Every string is a translation key, present in `en`, `de`, `es`, `ja`, `nb`."

## A progress toast becomes its own receipt

Do not raise a second toast when long work finishes. Keep the id and patch the card already on screen:

```ts
const id = toast.progress("Backing up")
toast.update(id, { type: "success", title: "Backup complete" })
```

Leaving `progress` restores the default duration, and the notification entry is re-dated and marked unseen, so the result floats to the top of the bell. `toast.dismiss(id)` clears the card and keeps the history entry; `toast.discard(id)` removes both, which is what cancelled work wants.

## The popup is a setting, the history is not

`App.EnableToasts` silences the popup card alone, and every spawn writes to the notification list either way, so turning it off loses the interruption and nothing else. Six are visible at once, and older ones fall off the stack while staying in a history capped at two hundred.

`ToastHost` sits in `AppShell`'s canvas at `Z_LAYERS.toast` (220), so a toast covers only a module's own content; the countdown is a drain line that pauses under the pointer.

## Asking a question and waiting for the answer

`dialog.confirm` resolves to a boolean, and `dialog.prompt` to the entered string or to `null` on cancel. `ConfirmOptions` takes `title`, `message`, `confirmLabel` (default `"Confirm"`), `cancelLabel` (default `"Cancel"`), and `destructive`, which paints the accept button in the danger colour. `InputOptions` swaps `destructive` for `defaultValue` and `placeholder`, and defaults `confirmLabel` to `"Save"`.

```ts
return dialog.confirm({
  title: t("Topbar", "ConfirmExitTitle"),
  message: t("Topbar", "ConfirmExitMessage"),
  confirmLabel: t("Topbar", "ConfirmExitButton"),
  cancelLabel: t("Common", "Cancel"),
})
```

`DialogHost` renders only the head of the queue, so overlapping questions serialize instead of stacking.

## When to reach for a modal instead

The rule: `dialog` is for one question with one answer, and anything with fields, validation, or a surface worth looking at is a Modal. `DialogHost` is one Radix dialog portalled into `getTopLayer()` at `Z_LAYERS.dialog` (230), above every modal, so a question raised from inside one stays answerable. `isModalOpen()` in `mnemo-web/src/lib/modal.ts` reads the `role="dialog"` and `data-state="open"` Radix stamps on both, and suppresses window-level keybinds while either is up. A dev build hangs both stores off `window.mnemo` for the console.

## Related

- [Modals and overlays](./modals-and-overlays.md) covers the component for a question with more than one field.
- [Popovers and tooltips](./popovers-and-tooltips.md) covers the lighter surfaces below these two.
- [The layers](../architecture/the-layers.md) explains why a store may raise UI at all.
- [Notifications](../../users/customization/notifications.md) is what the reader sees, including the switch that silences popups.
