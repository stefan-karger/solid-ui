import { type Component, type ComponentProps, splitProps, type ValidComponent } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const Empty: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
        local.class
      )}
      data-slot="empty"
      {...other}
    />
  )
}

const EmptyHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex max-w-sm flex-col items-center gap-2 text-center", local.class)}
      data-slot="empty-header"
      {...other}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type EmptyMediaProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComponentProps<"div">
> &
  VariantProps<typeof emptyMediaVariants>

const EmptyMedia = <T extends ValidComponent = "div">(props: EmptyMediaProps<T>) => {
  const [local, other] = splitProps(props, ["class", "variant"])

  return (
    <div
      class={cn(emptyMediaVariants({ variant: local.variant, class: local.class }))}
      data-slot="empty-icon"
      data-variant={local.variant}
      {...other}
    />
  )
}

const EmptyTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("font-medium text-lg tracking-tight", local.class)}
      data-slot="empty-title"
      {...other}
    />
  )
}

const EmptyDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "text-muted-foreground text-sm/relaxed [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="empty-description"
      {...other}
    />
  )
}

const EmptyContent: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        local.class
      )}
      data-slot="empty-content"
      {...other}
    />
  )
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }
