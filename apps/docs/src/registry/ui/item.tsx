import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js"
import { Dynamic } from "solid-js/web"

import type { PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/ui/separator"

function ItemGroup(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-item-group group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        local.class
      )}
      data-slot="item-group"
      role="list"
      {...others}
    />
  )
}

type ItemSeparatorProps = ComponentProps<typeof Separator>

function ItemSeparator(props: ItemSeparatorProps) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Separator
      class={cn("cn-item-separator my-2", local.class)}
      data-slot="item-separator"
      orientation="horizontal"
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm outline-none transition-colors duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50"
      },
      size: {
        default: "gap-2.5 px-3 py-2.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 in-data-[slot=dropdown-menu-content]:p-0 px-2.5 py-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ItemProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof itemVariants> & {
    as?: T
    class?: string
  }

const Item = <T extends ValidComponent = "div">(rawProps: PolymorphicProps<T, ItemProps<T>>) => {
  const props = mergeProps(
    {
      variant: "default",
      size: "default",
      as: "div" as T
    } as const,
    rawProps
  )
  const [local, others] = splitProps(props as ItemProps, ["as", "class", "variant", "size"])
  return (
    <Dynamic
      class={cn(
        itemVariants({
          variant: local.variant,
          size: local.size,
          class: "cn-item"
        }),
        local.class
      )}
      component={local.as as any}
      data-size={local.size}
      data-slot="item"
      data-variant={local.variant}
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
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>

function ItemMedia(rawProps: ItemMediaProps) {
  const props = mergeProps({ variant: "default" } as const, rawProps)
  const [local, others] = splitProps(props as ItemMediaProps, ["class", "variant"])
  return (
    <div
      class={cn(
        itemMediaVariants({
          variant: local.variant,
          class: "cn-item-media"
        }),
        local.class
      )}
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
      class={cn(
        "cn-item-content flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        local.class
      )}
      data-slot="item-content"
      {...others}
    />
  )
}

function ItemTitle(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-item-title line-clamp-1 flex w-fit items-center gap-2 font-medium text-sm leading-snug underline-offset-4",
        local.class
      )}
      data-slot="item-title"
      {...others}
    />
  )
}

function ItemDescription(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn(
        "cn-item-description line-clamp-2 text-left font-normal text-muted-foreground text-sm leading-normal group-data-[size=xs]/item:text-xs [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
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
    <div
      class={cn("cn-item-actions flex items-center gap-2", local.class)}
      data-slot="item-actions"
      {...others}
    />
  )
}

function ItemHeader(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-header flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-header"
      {...others}
    />
  )
}

function ItemFooter(props: ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-footer flex basis-full items-center justify-between gap-2", local.class)}
      data-slot="item-footer"
      {...others}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle
}
