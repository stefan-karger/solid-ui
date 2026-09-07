import * as ButtonPrimitive from "@kobalte/core/button"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

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

type ButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ButtonPrimitive.ButtonRootProps<T>
> &
  VariantProps<typeof buttonVariants> &
  Pick<ComponentProps<T>, "class">

const Button = <T extends ValidComponent = "button">(props: ButtonProps<T>) => {
  const others = omit(props as ButtonProps, "variant", "size", "class")
  return (
    <ButtonPrimitive.Root
      class={cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)}
      data-slot="button"
      {...others}
    />
  )
}

export { Button, type ButtonProps, buttonVariants }
