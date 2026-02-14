import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const Empty: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-empty flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
        local.class
      )}
      data-slot="empty"
      {...others}
    />
  )
}

const EmptyHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-empty-header flex max-w-sm flex-col items-center gap-2 text-center",
        local.class
      )}
      data-slot="empty-header"
      {...others}
    />
  )
}

const emptyMediaVariants = cva(
  "cn-empty-media mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-empty-media-variant-default bg-transparent",
        icon: "cn-empty-media-variant-icon flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type EmptyMediaProps = ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>

const EmptyMedia: Component<EmptyMediaProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <div
      class={cn(emptyMediaVariants({ variant: local.variant }), local.class)}
      data-slot="empty-icon"
      data-variant={local.variant}
      {...others}
    />
  )
}

const EmptyTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-empty-title font-medium text-lg tracking-tight", local.class)}
      data-slot="empty-title"
      {...others}
    />
  )
}

const EmptyDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-empty-description text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="empty-description"
      {...others}
    />
  )
}

const EmptyContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-empty-content flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        local.class
      )}
      data-slot="empty-content"
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
  emptyMediaVariants
}
