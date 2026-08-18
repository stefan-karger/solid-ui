import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Polymorphic, type PolymorphicProps } from "@kobalte/core/polymorphic"

const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
  {
    variants: {
      variant: {
        default: "",
        separator: "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b border-border pb-2",
      },
    },
  }
)

type MarkerProps<T extends ValidComponent = "div"> = ComponentProps<T> &
  VariantProps<typeof markerVariants> & {
    class?: string | undefined
    as?: T
  }

const Marker = <T extends ValidComponent = "div">(props: PolymorphicProps<T, MarkerProps<T>>) => {
  const merged = mergeProps({ as: "div", variant: "default" }, props)
  const [local, others] = splitProps(merged as MarkerProps, [
    "as",
    "class",
    "variant",
  ])

  return (
    <Polymorphic
      as={local.as}
      data-slot="marker"
      data-variant={local.variant}
      class={cn(
        markerVariants({
          variant: local.variant,
        }),
        local.class
      )}
      {...others}
    />
  )
}

const MarkerIcon = (props: ComponentProps<"span">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      class={cn(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        local.class
      )}
      {...others}
    />
  )
}

const MarkerContent = (props: ComponentProps<"span">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <span
      data-slot="marker-content"
      class={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        local.class
      )}
      {...others}
    />
  )
}

export {
  Marker,
  MarkerIcon,
  MarkerContent,
  markerVariants,
}