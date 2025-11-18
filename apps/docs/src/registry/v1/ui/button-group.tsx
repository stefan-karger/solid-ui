import {
  type Component,
  type ComponentProps,
  mergeProps,
  splitProps,
  type ValidComponent
} from "solid-js"

import { Polymorphic, type PolymorphicProps } from "@kobalte/core"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/v1/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>

const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"])
  return (
    <div
      class={cn(buttonGroupVariants({ orientation: local.orientation }), local.class)}
      data-orientation={local.orientation}
      data-slot="button-group"
      role="group"
      {...others}
    />
  )
}

const ButtonGroupText = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ComponentProps<"div">>
) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Polymorphic
      class={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        local.class
      )}
      data-slot="button-group-text"
      {...others}
    />
  )
}

const ButtonGroupSeparator: Component<ComponentProps<typeof Separator>> = (rawProps) => {
  const props = mergeProps({ orientation: "vertical" } as const, rawProps)
  const [local, others] = splitProps(props, ["class", "orientation"])
  return (
    <Separator
      class={cn(
        "!m-0 relative self-stretch bg-input data-[orientation=vertical]:h-auto",
        local.class
      )}
      data-slot="button-group-separator"
      orientation={local.orientation}
      {...others}
    />
  )
}

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants }
