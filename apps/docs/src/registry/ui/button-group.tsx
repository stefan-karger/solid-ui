import {
  type ComponentProps,
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent
} from "solid-js"
import { Dynamic } from "solid-js/web"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/ui/separator"

const buttonGroupVariants = cva(
  "group/button-group cn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal *:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "cn-button-group-orientation-vertical flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>

const ButtonGroup = (props: ButtonGroupProps) => {
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

type ButtonGroupTextProps<T extends ValidComponent = "div"> = {
  as?: T
  class?: string | undefined
  children?: JSX.Element
} & Omit<ComponentProps<T>, "as" | "class" | "children">

const ButtonGroupText = <T extends ValidComponent = "div">(rawProps: ButtonGroupTextProps<T>) => {
  const props = mergeProps({ as: "div" as T } as const, rawProps)
  const [local, others] = splitProps(props as ButtonGroupTextProps, ["as", "class"])
  return (
    <Dynamic
      class={cn("cn-button-group-text flex items-center [&_svg]:pointer-events-none", local.class)}
      component={local.as}
      data-slot="button-group-text"
      {...others}
    />
  )
}

type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>

const ButtonGroupSeparator = (props: ButtonGroupSeparatorProps) => {
  const mergedProps = mergeProps({ orientation: "vertical" } as const, props)
  const [local, others] = splitProps(mergedProps, ["class", "orientation"])
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

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
