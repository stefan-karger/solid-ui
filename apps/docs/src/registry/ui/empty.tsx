import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const Empty: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="empty"
      class={cn(
        "cn-empty flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        local.class
      )}
      {...others}
    />
  )
}

const EmptyHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="empty-header"
      class={cn(
        "cn-empty-header flex max-w-sm flex-col items-center gap-2 text-center",
        local.class
      )}
      {...others}
    />
  )
}

const emptyMediaVariants = cva(
  "cn-empty-media flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-empty-media-variant-default bg-transparent",
        icon: "cn-empty-media-variant-icon bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type EmptyMediaProps = ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>

const EmptyMedia: Component<EmptyMediaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <div
      data-slot="empty-icon"
      data-variant={local.variant}
      class={cn(emptyMediaVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  )
}

const EmptyTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="empty-title"
      class={cn("cn-empty-title text-lg font-medium tracking-tight", local.class)}
      {...others}
    />
  )
}

const EmptyDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="empty-description"
      class={cn(
        "cn-empty-description text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      {...others}
    />
  )
}

const EmptyContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="empty-content"
      class={cn(
        "cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        local.class
      )}
      {...others}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
  emptyMediaVariants,
}
