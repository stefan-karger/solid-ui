import { Dynamic, type ComponentProps, type JSX, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Separator, type SeparatorProps } from "~/registry/ui/separator"

type ItemGroupProps = ComponentProps<"div">

const ItemGroup = (props: ItemGroupProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("group/item-group cn-item-group flex w-full flex-col", props.class)}
      data-slot="item-group"
      role="list"
      {...others}
    />
  )
}

type ItemSeparatorProps = SeparatorProps

const ItemSeparator = (props: ItemSeparatorProps) => {
  const others = omit(props, "class")
  return (
    <Separator
      class={cn("cn-item-separator", props.class)}
      data-slot="item-separator"
      orientation="horizontal"
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item cn-item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        outline: "cn-item-variant-outline",
        muted: "cn-item-variant-muted"
      },
      size: {
        default: "cn-item-size-default",
        sm: "cn-item-size-sm",
        xs: "cn-item-size-xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ItemProps<T extends ValidComponent = "div"> = {
  as?: T
  class?: string | undefined
  children?: JSX.Element
} & VariantProps<typeof itemVariants> &
  Omit<ComponentProps<T>, "as" | "class" | "children">

const Item = <T extends ValidComponent = "div">(rawProps: ItemProps<T>) => {
  const local = merge(
    { as: "div" as T, variant: "default", size: "default" } as const,
    rawProps
  ) as ItemProps
  const others = omit(rawProps as ItemProps, "as", "class", "variant", "size")
  return (
    <Dynamic
      class={cn(itemVariants({ variant: local.variant, size: local.size }), local.class)}
      component={local.as}
      data-size={local.size}
      data-slot="item"
      data-variant={local.variant}
      {...others}
    />
  )
}

const itemMediaVariants = cva(
  "cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-item-media-variant-default",
        icon: "cn-item-media-variant-icon",
        image: "cn-item-media-variant-image"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>

const ItemMedia = (rawProps: ItemMediaProps) => {
  const local = merge({ variant: "default" } as const, rawProps)
  const others = omit(rawProps, "class", "variant")
  return (
    <div
      class={cn(itemMediaVariants({ variant: local.variant }), local.class)}
      data-slot="item-media"
      data-variant={local.variant}
      {...others}
    />
  )
}

type ItemContentProps = ComponentProps<"div">

const ItemContent = (props: ItemContentProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn(
        "cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
        props.class
      )}
      data-slot="item-content"
      {...others}
    />
  )
}

type ItemTitleProps = ComponentProps<"div">

const ItemTitle = (props: ItemTitleProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-item-title line-clamp-1 flex w-fit items-center", props.class)}
      data-slot="item-title"
      {...others}
    />
  )
}

type ItemDescriptionProps = ComponentProps<"p">

const ItemDescription = (props: ItemDescriptionProps) => {
  const others = omit(props, "class")
  return (
    <p
      class={cn(
        "cn-item-description line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        props.class
      )}
      data-slot="item-description"
      {...others}
    />
  )
}

type ItemActionsProps = ComponentProps<"div">

const ItemActions = (props: ItemActionsProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-item-actions flex items-center", props.class)}
      data-slot="item-actions"
      {...others}
    />
  )
}

type ItemHeaderProps = ComponentProps<"div">

const ItemHeader = (props: ItemHeaderProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-item-header flex basis-full items-center justify-between", props.class)}
      data-slot="item-header"
      {...others}
    />
  )
}

type ItemFooterProps = ComponentProps<"div">

const ItemFooter = (props: ItemFooterProps) => {
  const others = omit(props, "class")
  return (
    <div
      class={cn("cn-item-footer flex basis-full items-center justify-between", props.class)}
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
  ItemFooter,
  itemVariants,
  itemMediaVariants
}
