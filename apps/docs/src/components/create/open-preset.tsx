import { type JSX } from "@solidjs/web"
import { createSignal, Show } from "solid-js"

import type { Preset } from "~/lib/presets/decode"
import { parseEditorPreset } from "~/lib/presets/editor"
import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/registry/ui/drawer"
import { Input } from "~/registry/ui/input"

export const createActionClass =
  "h-8 min-w-0 flex-1 rounded-lg border border-border bg-transparent px-2 text-sm text-foreground hover:bg-secondary hover:text-foreground dark:bg-transparent dark:hover:bg-secondary md:w-full md:flex-none pointer-coarse:h-10"

export function OpenPreset(props: {
  open: boolean
  mobile: boolean
  onOpenChange: (open: boolean) => void
  onImport: (preset: Preset) => void
}) {
  const [input, setInput] = createSignal("")
  const parsed = () => parseEditorPreset(input())
  const invalid = () => input().trim().length > 0 && !parsed()
  function changeOpen(open: boolean) {
    if (!open) setInput("")
    props.onOpenChange(open)
  }
  const description = "Paste a preset code to load a saved configuration."
  function form(cancel: JSX.Element) {
    return (
      <form
        class="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          const preset = parsed()
          if (!preset) return
          props.onImport(preset)
          changeOpen(false)
        }}
      >
        <div>
          <label for="create-open-preset-code" class="sr-only">
            Preset code
          </label>
          <Input
            id="create-open-preset-code"
            value={input()}
            onInput={(event) => setInput(event.currentTarget.value)}
            placeholder="b2Whd5Ob2 or --preset b2Whd5Ob2"
            autocapitalize="none"
            autocomplete="off"
            spellcheck={false}
            aria-invalid={invalid() ? "true" : "false"}
            aria-describedby={invalid() ? "create-preset-error" : undefined}
            class="w-full rounded-lg border-input bg-input/30 px-3"
          />
          <Show when={invalid()}>
            <p id="create-preset-error" class="mt-2 text-sm text-red-300">
              Enter a valid shadcn preset code beginning with b.
            </p>
          </Show>
        </div>
        <div class="flex justify-end gap-2">
          {cancel}
          <Button
            type="submit"
            disabled={!parsed()}
            class="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Open
          </Button>
        </div>
      </form>
    )
  }
  return (
    <Show
      when={props.mobile}
      fallback={
        <Dialog open={props.open} onOpenChange={changeOpen}>
          <DialogTrigger
            render={(part) => (
              <Button {...part} variant="outline" class={createActionClass} />
            )}
          >
            Open Preset
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            class="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-5 text-card-foreground"
          >
            <DialogHeader>
              <DialogTitle>Open Preset</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {form(
              <DialogClose
                render={(part) => <Button {...part} variant="outline" />}
              >
                Cancel
              </DialogClose>
            )}
          </DialogContent>
        </Dialog>
      }
    >
      <Drawer open={props.open} onOpenChange={changeOpen}>
        <DrawerTrigger
          render={(part) => (
            <Button
              {...part}
              variant="outline"
              class={createActionClass}
              aria-label="Open Preset"
            />
          )}
        >
          Open
        </DrawerTrigger>
        <DrawerContent class="gap-4 rounded-t-2xl bg-card p-5 text-card-foreground">
          <DrawerHeader class="p-0">
            <DrawerTitle>Open Preset</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {form(
            <DrawerClose
              render={(part) => <Button {...part} variant="outline" />}
            >
              Cancel
            </DrawerClose>
          )}
        </DrawerContent>
      </Drawer>
    </Show>
  )
}
