export const presetPreviewPath = "/preview"
export const presetUpdateMessage = "solid-ui:preset-update"
export const presetShortcutMessage = "solid-ui:preset-shortcut"

export function presetShortcut(event: KeyboardEvent) {
  const target = event.target
  if (
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    (target instanceof Element &&
      target.closest(
        "input, textarea, select, [contenteditable], [role=dialog], [role=combobox], [role=listbox], [role=menu]"
      ))
  )
    return null
  return event.key === "r" || event.key === "o" ? event.key : null
}
