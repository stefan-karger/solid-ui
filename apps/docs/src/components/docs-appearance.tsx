import { Toggle as SdkToggle } from "@ui-sdk/solid/toggle"
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
import { Button } from "~/registry/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/registry/ui/select"

export default function DocsAppearance(props: { defaultStyle?: DocsStyle }) {
  const [style, setStyle] = createSignal<DocsStyle>(
    props.defaultStyle ?? "nova"
  )
  const [mode, setMode] = createSignal<ColorMode>("light")
  createEffect(
    () => true,
    () => {
      const media = matchMedia("(prefers-color-scheme: dark)")
      const sync = () => {
        const appearance = readAppearance(
          { getItem: (key) => localStorage.getItem(key) },
          media.matches,
          props.defaultStyle
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
    <div class="flex items-center gap-1 sm:gap-2" data-docs-appearance>
      <Select<DocsStyle>
        value={style()}
        onValueChange={(value) => {
          if (!isDocsStyle(value)) return
          setStyle(value)
          saveAppearance(value, mode())
        }}
      >
        <SelectTrigger
          aria-label="Preview style"
          size="sm"
          class="w-[4.75rem] capitalize sm:w-24"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent class="ring-border">
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
      <SdkToggle
        aria-label="Toggle theme"
        pressed={mode() === "dark"}
        onPressedChange={(pressed) => {
          const next = pressed ? "dark" : "light"
          setMode(next)
          saveAppearance(style(), next)
        }}
        render={(part) => (
          <Button
            {...part}
            variant="ghost"
            size="icon-sm"
            class="extend-touch-target size-8 shrink-0"
          />
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-[18px]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18m0-12 4.65-4.65M12 14.3l7.37-7.37M12 19.6l8.85-8.85" />
        </svg>
      </SdkToggle>
    </div>
  )
}
