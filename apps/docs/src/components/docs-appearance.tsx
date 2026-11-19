import { createEffect, createSignal, For, onCleanup } from "solid-js"

import {
  applyAppearance,
  isDocsStyle,
  readAppearance,
  saveAppearance,
  styles,
  type ColorMode,
  type DocsStyle
} from "~/lib/appearance"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Switch } from "~/registry/ui/switch"

export default function DocsAppearance() {
  const [style, setStyle] = createSignal<DocsStyle>("nova")
  const [mode, setMode] = createSignal<ColorMode>("light")
  createEffect(
    () => true,
    () => {
      const media = matchMedia("(prefers-color-scheme: dark)")
      const sync = () => {
        const appearance = readAppearance(
          { getItem: (key) => localStorage.getItem(key) },
          media.matches
        )
        setStyle(appearance.style)
        setMode(appearance.mode)
        applyAppearance(appearance.style, appearance.mode)
      }
      sync()
      window.addEventListener("storage", sync)
      media.addEventListener("change", sync)
      onCleanup(() => {
        window.removeEventListener("storage", sync)
        media.removeEventListener("change", sync)
      })
    }
  )
  return (
    <div class="flex items-center gap-3" data-docs-appearance>
      <Select<DocsStyle>
        value={style()}
        onValueChange={(value) => {
          if (!isDocsStyle(value)) return
          setStyle(value)
          saveAppearance(value, mode())
        }}
      >
        <SelectTrigger aria-label="Preview style" size="sm" class="min-w-24 capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <For each={styles}>
            {(name) => (
              <SelectItem
                value={name}
                label={name[0]!.toUpperCase() + name.slice(1)}
                class="capitalize"
              >
                {name}
              </SelectItem>
            )}
          </For>
        </SelectContent>
      </Select>
      <div class="flex items-center gap-2">
        <label for="docs-dark-mode" class="hidden text-xs text-muted-foreground sm:block">
          Dark mode
        </label>
        <Switch
          id="docs-dark-mode"
          aria-label="Dark mode"
          size="sm"
          checked={mode() === "dark"}
          onCheckedChange={(checked) => {
            const next = checked ? "dark" : "light"
            setMode(next)
            saveAppearance(style(), next)
          }}
        />
      </div>
    </div>
  )
}
