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
      role="list"
      data-slot="item-group"
      class={cn("group/item-group flex flex-col", local.class)}
      {...others}
    />
  )
}

function ItemSeparator(props: ComponentProps<typeof Separator>) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      class={cn("my-0", local.class)}
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5"
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
      data-slot="item"
      data-variant={local.variant}
      data-size={local.size}
      class={cn(itemVariants({ variant: local.variant, size: local.size }), local.class)}
      {...others}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover"
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
      data-slot="item-media"
      data-variant={local.variant}
      class={cn(itemMediaVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  )
}

function ItemContent(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="item-content"
      class={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        local.class
      )}
      {...others}
    />
  )
}

function ItemTitle(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="item-title"
      class={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        local.class
      )}
      {...others}
    />
  )
}

function ItemDescription(props: ComponentProps<"p">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      data-slot="item-description"
      class={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      {...others}
    />
  )
}

function ItemActions(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="item-actions"
      class={cn("flex items-center gap-2", local.class)}
      {...others}
    />
  )
}

function ItemHeader(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="item-header"
      class={cn(
        "flex basis-full items-center justify-between gap-2",
        local.class
      )}
      {...others}
    />
  )
}

function ItemFooter(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      data-slot="item-footer"
      class={cn(
        "flex basis-full items-center justify-between gap-2",
        local.class
      )}
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
