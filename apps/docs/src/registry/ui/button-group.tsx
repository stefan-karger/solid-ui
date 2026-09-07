import { Dynamic, type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import { Separator } from "~/registry/ui/separator"

const buttonGroupVariants = cva(
  "cn-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:first-child)>[data-slot=select-trigger]]:rounded-l-none [&>*:not(:first-child)>[data-slot=select-trigger]]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>*:not(:last-child)>[data-slot=select-trigger]]:rounded-r-none",
        vertical:
          "cn-button-group-orientation-vertical flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:first-child)>[data-slot=select-trigger]]:rounded-t-none [&>*:not(:first-child)>[data-slot=select-trigger]]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child)>[data-slot=select-trigger]]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
)

type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>

const ButtonGroup = (props: ButtonGroupProps) => {
  const others = omit(props, "class", "orientation")
  return (
    <div
      class={cn(buttonGroupVariants({ orientation: props.orientation }), props.class)}
      data-orientation={props.orientation}
      data-slot="button-group"
      role="group"
      {...others}
    />
  )
}

type ButtonGroupTextProps<T extends ValidComponent = "div"> = {
  as?: T
  class?: string | undefined
} & Omit<ComponentProps<T>, "as" | "class">

const ButtonGroupText = <T extends ValidComponent = "div">(rawProps: ButtonGroupTextProps<T>) => {
  const props = rawProps as ButtonGroupTextProps
  const others = omit(props, "as", "class")
  return (
    <Dynamic
      component={props.as ?? "div"}
      data-slot="button-group-text"
      class={cn("cn-button-group-text flex items-center [&_svg]:pointer-events-none", props.class)}
      {...others}
    />
  )
}

type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>

const ButtonGroupSeparator = (props: ButtonGroupSeparatorProps) => {
  const others = omit(props, "class", "orientation")
  return (
    <Separator
      class={cn(
        "cn-button-group-separator relative self-stretch data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
        props.class
      )}
      data-slot="button-group-separator"
      orientation={props.orientation ?? "vertical"}
      {...others}
    />
  )
}

export { ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants }
