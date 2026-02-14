import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/ui/separator"

function ItemGroup(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("group/item-group flex flex-col", local.class)}
      data-slot="item-group"
      role="list"
      {...others}
    />
  )
}

function ItemSeparator(props: ComponentProps<typeof Separator>) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Separator
      class={cn("my-0", local.class)}
      data-slot="item-separator"
      orientation="horizontal"
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComponentProps<"div"> & VariantProps<typeof itemVariants>
>

function Item<T extends ValidComponent = "div">(props: ItemProps<T>) {
  const [local, others] = splitProps(props, ["class", "variant", "size"])
  return (
    <Polymorphic
      as="div"
      class={cn(itemVariants({ variant: local.variant, size: local.size }), local.class)}
      data-size={local.size}
      data-slot="item"
      data-variant={local.variant}
      {...others}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>

function ItemMedia(props: ItemMediaProps) {
  const [local, others] = splitProps(props, ["class", "variant"])
  return (
    <div
      class={cn(itemMediaVariants({ variant: local.variant }), local.class)}
      data-slot="item-media"
      data-variant={local.variant}
      {...others}
    />
  )
}

function ItemContent(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", local.class)}
      data-slot="item-content"
      {...others}
    />
  )
}

function ItemTitle(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex w-fit items-center gap-2 font-medium text-sm leading-snug", local.class)}
      data-slot="item-title"
      {...others}
    />
  )
}

function ItemDescription(props: ComponentProps<"p">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn(
        "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="item-description"
      {...others}
    />
  )
}

function ItemActions(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class={cn("flex items-center gap-2", local.class)} data-slot="item-actions" {...others} />
  )
}

function ItemHeader(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-header"
      {...others}
    />
  )
}

function ItemFooter(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-footer"
      {...others}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter
}
