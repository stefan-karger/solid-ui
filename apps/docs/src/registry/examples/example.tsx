import type { ComponentProps } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

function ExampleWrapper(props: ComponentProps<"div">) {
  const others = omit(props, "class")

  return (
    <div class="w-full bg-muted dark:bg-background">
      <div
        data-slot="example-wrapper"
        class={cn(
          "mx-auto grid min-h-screen w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 md:grid-cols-2 md:gap-8 lg:p-12 2xl:max-w-6xl",
          props.class
        )}
        {...others}
      />
    </div>
  )
}

function Example(
  props: ComponentProps<"div"> & {
    title?: string
    containerClass?: string
  }
) {
  const others = omit(props, "title", "class", "containerClass", "children")

  return (
    <div
      data-slot="example"
      class={cn(
        "mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none",
        props.containerClass
      )}
      {...others}
    >
      {props.title ? (
        <div class="px-1.5 py-2 text-xs font-medium text-muted-foreground">{props.title}</div>
      ) : null}
      <div
        data-slot="example-content"
        class={cn(
          "flex min-w-0 flex-1 flex-col items-start gap-6 rounded-xl bg-card p-12 text-foreground *:[div:not([class*='w-'])]:w-full",
          props.class
        )}
      >
        {props.children}
      </div>
    </div>
  )
}

export { Example, ExampleWrapper }
