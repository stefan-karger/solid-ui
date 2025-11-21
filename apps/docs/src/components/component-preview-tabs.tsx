"use client"

import { type ComponentProps, type JSX, Show, Suspense, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

type ComponentPreviewTabsProps = ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  component?: JSX.Element
  source?: JSX.Element
}

export function ComponentPreviewTabs(props: ComponentPreviewTabsProps) {
  const [local, other] = splitProps(props, [
    "class",
    "align",
    "hideCode",
    "chromeLessOnMobile",
    "component",
    "source"
  ])

  return (
    <div
      class={cn("group relative mt-4 mb-12 flex flex-col gap-2 rounded-lg border", local.class)}
      {...other}
    >
      <div data-slot="preview">
        <div
          class={cn(
            "preview flex w-full justify-center data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center",
            local.chromeLessOnMobile ? "sm:p-10" : "h-[450px] p-10"
          )}
          data-align={local.align}
        >
          {local.component}
        </div>
        <Show when={!local.hideCode}>
          <div
            class="[&_[data-rehype-pretty-code-figure]]:!m-0 overflow-hidden [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-[400px]"
            data-slot="code"
          >
            <div class="relative">{local.source}</div>
          </div>
        </Show>
      </div>
    </div>
  )
}
