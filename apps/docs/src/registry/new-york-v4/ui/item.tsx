import { type Component, type ComponentProps, splitProps, type ValidComponent } from "solid-js"

import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/new-york-v4/ui/separator"

const ItemGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("group/item-group flex flex-col", local.class)}
      data-slot="item-group"
      role="list"
      {...other}
    />
  )
}

const ItemSeparator: Component<ComponentProps<typeof Separator>> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <Separator
      class={cn("my-0", local.class)}
      data-slot="item-separator"
      orientation="horizontal"
      {...other}
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

type ItemProps = ComponentProps<"div"> & VariantProps<typeof itemVariants>

const Item = <T extends ValidComponent = "div">(props: PolymorphicProps<T, ItemProps>) => {
  const [local, other] = splitProps(props, ["class", "variant", "size"])

  return (
    <Polymorphic
      as="div"
      class={cn(itemVariants({ variant: local.variant, size: local.size, class: local.class }))}
      data-size={local.size}
      data-slot="item"
      data-variant={local.variant}
      {...other}
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

const ItemMedia: Component<ItemMediaProps> = (props) => {
  const [local, other] = splitProps(props, ["class", "variant"])

  return (
    <div
      class={cn(itemMediaVariants({ variant: local.variant, class: local.class }))}
      data-slot="item-media"
      data-variant={local.variant}
      {...other}
    />
  )
}

const ItemContent: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", local.class)}
      data-slot="item-content"
      {...other}
    />
  )
}

const ItemTitle: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex w-fit items-center gap-2 font-medium text-sm leading-snug", local.class)}
      data-slot="item-title"
      {...other}
    />
  )
}

const ItemDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <p
      class={cn(
        "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        local.class
      )}
      data-slot="item-description"
      {...other}
    />
  )
}

const ItemActions: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div class={cn("flex items-center gap-2", local.class)} data-slot="item-actions" {...other} />
  )
}

const ItemHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-header"
      {...other}
    />
  )
}

const ItemFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, other] = splitProps(props, ["class"])

  return (
    <div
      class={cn("flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-footer"
      {...other}
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
