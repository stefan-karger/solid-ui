import { dynamic, type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { isStatic, omit } from "solid-js"

import { cn } from "~/lib/utils"
const buttonVariants = cva(
  "group/button cn-button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-button-variant-default",
        outline: "cn-button-variant-outline",
        secondary: "cn-button-variant-secondary",
        ghost: "cn-button-variant-ghost",
        destructive: "cn-button-variant-destructive",
        link: "cn-button-variant-link"
      },
      size: {
        default: "cn-button-size-default",
        xs: "cn-button-size-xs",
        sm: "cn-button-size-sm",
        lg: "cn-button-size-lg",
        icon: "cn-button-size-icon",
        "icon-xs": "cn-button-size-icon-xs",
        "icon-sm": "cn-button-size-icon-sm",
        "icon-lg": "cn-button-size-icon-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
type ButtonProps<T extends ValidComponent = "button"> = Omit<
  ComponentProps<NoInfer<T>>,
  "as" | "class" | "variant" | "size"
> &
  VariantProps<typeof buttonVariants> & {
    as?: T
    class?: string
  }

function Button<T extends ValidComponent = "button">(props: ButtonProps<T>) {
  const Comp = dynamic<ValidComponent>(() => props.as ?? "button", {
    static: isStatic(props, "as")
  })
  const rest = omit(props, "as", "class", "variant", "size")
  return (
    <Comp
      type={(props.as ?? "button") === "button" ? "button" : undefined}
      data-slot="button"
      data-variant={props.variant === undefined ? "default" : props.variant}
      data-size={props.size === undefined ? "default" : props.size}
      class={cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)}
      {...rest}
    />
  )
}
export { Button, buttonVariants, type ButtonProps }
