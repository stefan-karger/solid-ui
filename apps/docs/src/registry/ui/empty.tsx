import { type ComponentProps } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type EmptyProps = ComponentProps<"div">

const Empty = (props: EmptyProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn(
        "cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance",
        props.class
      )}
      data-slot="empty"
      {...others}
    />
  )
}

type EmptyHeaderProps = ComponentProps<"div">

const EmptyHeader = (props: EmptyHeaderProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-empty-header flex max-w-sm flex-col items-center", props.class)}
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

const EmptyMedia = (rawProps: EmptyMediaProps) => {
  const local = merge({ variant: "default" } as const, rawProps)
  const others = omit(rawProps, "class", "variant")
  return (
    <div
      class={cn(emptyMediaVariants({ variant: local.variant }), local.class)}
      data-slot="empty-media"
      data-variant={local.variant}
      {...others}
    />
  )
}

type EmptyTitleProps = ComponentProps<"div">

const EmptyTitle = (props: EmptyTitleProps) => {
  const others = omit(props, "class")
  return <div class={cn("cn-empty-title", props.class)} data-slot="empty-title" {...others} />
}

type EmptyDescriptionProps = ComponentProps<"p">

const EmptyDescription = (props: EmptyDescriptionProps) => {
  const others = omit(props, "class")
  return (
    <p
      class={cn(
        "cn-empty-description text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        props.class
      )}
      data-slot="empty-description"
      {...others}
    />
  )
}

type EmptyContentProps = ComponentProps<"div">

const EmptyContent = (props: EmptyContentProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn(
        "cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance",
        props.class
      )}
      data-slot="empty-content"
      {...others}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  emptyMediaVariants,
  type EmptyContentProps,
  type EmptyDescriptionProps,
  type EmptyHeaderProps,
  type EmptyMediaProps,
  type EmptyProps,
  type EmptyTitleProps
}
