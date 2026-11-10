import {
  type ComponentProps,
  children,
  createMemo,
  createSignal,
  type ParentProps,
  Show,
  Suspense,
  splitProps
} from "solid-js"
import { Dynamic } from "solid-js/web"

import { getDocsExample } from "~/lib/docs-examples"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import { Tabs } from "~/registry/ui/tabs"

type ComponentPreviewProps = ParentProps<{
  name: string
  align?: "center" | "start" | "end"
  class?: string
  previewClass?: string
  hideCode?: boolean
  /**
   * Contain full-app demos (e.g. sidebar) whose components use
   * `position: fixed` inside the preview frame. `contain-layout` turns the
   * preview into the containing block of fixed descendants so they stop
   * escaping to the page viewport, and the data-slot overrides size the
   * sidebar primitives to the frame instead of the viewport.
   */
  contained?: boolean
}>

export function ComponentPreview(props: ComponentPreviewProps) {
  const [local, others] = splitProps(props, [
    "name",
    "align",
    "class",
    "previewClass",
    "hideCode",
    "contained",
    "children"
  ])
  const [expanded, setExpanded] = createSignal(false)
  const source = children(() => local.children)
  const example = createMemo(() => getDocsExample(local.name))

  return (
    <div
      class={cn(
        "group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-2xl border",
        local.class
      )}
      data-not-typeset
      data-slot="component-preview"
      {...others}
    >
      <div
        class={cn(
          "preview relative flex min-h-72 w-full justify-center p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center",
          local.contained && [
            "overflow-hidden contain-layout",
            "[&_[data-slot=sidebar-container]]:h-full",
            "[&_[data-slot=sidebar-wrapper]]:h-full [&_[data-slot=sidebar-wrapper]]:min-h-0"
          ],
          local.previewClass
        )}
        data-align={local.align ?? "center"}
        data-slot="preview"
      >
        <Show
          fallback={
            <p class="text-muted-foreground text-sm">
              Preview <code>{local.name}</code> was not found.
            </p>
          }
          when={example()}
        >
          {(Example) => (
            <Suspense>
              <Dynamic component={Example()} />
            </Suspense>
          )}
        </Show>
      </div>

      <Show when={!local.hideCode}>
        <div
          class="relative overflow-hidden border-t bg-neutral-100 dark:bg-zinc-900 [&_.expressive-code]:mx-0 [&_.expressive-code]:mt-0 [&_.expressive-code_.frame_pre]:rounded-none"
          data-expanded={expanded()}
          data-slot="component-preview-source"
        >
          <div
            class={cn(
              "relative",
              expanded() ? "max-h-72 overflow-auto" : "max-h-[108px] overflow-hidden"
            )}
          >
            {source()}
          </div>
          <Show when={!expanded()}>
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-neutral-100 via-neutral-100/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/80" />
          </Show>
          <Show when={!expanded()}>
            <div class="absolute inset-0 flex items-center justify-center pb-4">
              <Button
                class="relative z-10 rounded-lg bg-background shadow-none"
                onClick={() => setExpanded(true)}
                size="sm"
                type="button"
                variant="outline"
              >
                View Code
              </Button>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  )
}

export function ComponentSource(props: ParentProps<{ class?: string }>) {
  const [local, others] = splitProps(props, ["class", "children"])
  return (
    <div
      class={cn("relative mt-6 [&_.expressive-code]:mt-0", local.class)}
      data-not-typeset
      data-slot="component-source"
      {...others}
    >
      {local.children}
    </div>
  )
}

export function CodeTabs(props: ComponentProps<typeof Tabs>) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Tabs
      class={cn(
        "relative mt-6 w-full gap-2 [&>[data-slot=tabs-list]>[data-slot=tabs-trigger]]:rounded-none [&>[data-slot=tabs-list]>[data-slot=tabs-trigger]]:px-0 [&>[data-slot=tabs-list]>[data-slot=tabs-trigger]]:py-1 [&>[data-slot=tabs-list]]:gap-6 [&>[data-slot=tabs-list]]:p-0",
        local.class
      )}
      data-not-typeset
      defaultValue="cli"
      {...others}
    />
  )
}
