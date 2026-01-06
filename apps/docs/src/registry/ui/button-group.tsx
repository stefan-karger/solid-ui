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
import { Separator } from "~/registry/ui/separator"

const buttonGroupVariants = cva(
  "cn-button-group flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "cn-button-group-orientation-vertical flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
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
      class={cn("cn-button-group-text flex items-center [&_svg]:pointer-events-none", local.class)}
      {...others}
    />
  )
}

type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>

const ButtonGroupSeparator: Component<ButtonGroupSeparatorProps> = (rawProps) => {
  const props = mergeProps({ orientation: "vertical" } as const, rawProps)
  const [local, others] = splitProps(props, ["class", "orientation"])
  return (
    <Separator
      class={cn(
        "cn-button-group-separator relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-auto",
        local.class
      )}
      data-slot="button-group-separator"
      orientation={local.orientation}
      {...others}
    />
  )
}

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants }
