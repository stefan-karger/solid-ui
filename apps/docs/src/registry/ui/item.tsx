import type { PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"
import { mergeProps, splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/ui/separator"

function ItemGroup(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      role="list"
      data-slot="item-group"
      class={cn(
        "cn-item-group group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        local.class
      )}
      {...others}
    />
  )
}

type ItemSeparatorProps = ComponentProps<typeof Separator>

function ItemSeparator(props: ItemSeparatorProps) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      class={cn("cn-item-separator my-2", local.class)}
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ItemProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof itemVariants> & {
    as?: T
    class?: string
  }

const Item = <T extends ValidComponent = "div">(
  rawProps: PolymorphicProps<T, ItemProps<T>>
) => {
  const props = mergeProps({
    variant: "default",
    size: "default",
    as: "div" as T
  } as const, rawProps)
  const [local, others] = splitProps(props as ItemProps, [
    "as",
    "class",
    "variant",
    "size",
  ])
  return (
    <Dynamic
      component={local.as as any}
      data-slot="item"
      data-variant={local.variant}
      data-size={local.size}
      class={cn(
        itemVariants({
          variant: local.variant,
          size: local.size,
          class: "cn-item"
        }),
        local.class
      )}
      {...others}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>

function ItemMedia(rawProps: ItemMediaProps) {
  const props = mergeProps({ variant: "default" } as const, rawProps)
  const [local, others] = splitProps(props as ItemMediaProps, ["class", "variant"])
  return (
    <div
      data-slot="item-media"
      data-variant={local.variant}
      class={cn(
        itemMediaVariants({
          variant: local.variant,
          class: "cn-item-media"
        }),
        local.class
      )}
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
        "cn-item-content flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
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
        "cn-item-title line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
        local.class
      )}
      {...others}
    />
  )
}

function ItemDescription(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      data-slot="item-description"
      class={cn(
        "cn-item-description line-clamp-2 text-left text-sm leading-normal font-normal text-muted-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
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
      class={cn("cn-item-actions flex items-center gap-2", local.class)}
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
        "cn-item-header flex basis-full items-center justify-between gap-2",
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
        "cn-item-footer flex basis-full items-center justify-between gap-2",
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
  ItemFooter,
}
