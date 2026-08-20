import { type ComponentProps, splitProps } from "solid-js"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

type EmptyProps = ComponentProps<"div">

const Empty = (props: EmptyProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-balance text-center",
        local.class
      )}
      data-slot="empty"
      {...others}
    />
  )
}

type EmptyHeaderProps = ComponentProps<"div">

const EmptyHeader = (props: EmptyHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn("cn-empty-header flex max-w-sm flex-col items-center", local.class)}
      data-slot="empty-header"
      {...others}
    />
  )
}

const emptyMediaVariants = cva(
  "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-empty-media-default",
        icon: "cn-empty-media-icon"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type EmptyMediaProps = ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>

const EmptyMedia = (props: EmptyMediaProps) => {
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

type EmptyTitleProps = ComponentProps<"div">

const EmptyTitle = (props: EmptyTitleProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn("cn-empty-title z-font-heading", local.class)}
      data-slot="empty-title"
      {...others}
    />
  )
}

type EmptyDescriptionProps = ComponentProps<"p">

const EmptyDescription = (props: EmptyDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "cn-empty-description text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="empty-description"
      {...others}
    />
  )
}

type EmptyContentProps = ComponentProps<"div">

const EmptyContent = (props: EmptyContentProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "cn-empty-content flex w-full min-w-0 max-w-sm flex-col items-center text-balance",
        local.class
      )}
      data-slot="empty-content"
      {...others}
    />
  )
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
