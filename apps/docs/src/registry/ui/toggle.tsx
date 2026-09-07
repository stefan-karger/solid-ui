import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { ToggleButton, type ToggleButtonRootProps } from "@kobalte/core/toggle-button"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { cva, type VariantProps } from "class-variance-authority"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

const toggleVariants = cva(
  "group/toggle cn-toggle inline-flex items-center justify-center whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-toggle-variant-default",
        outline: "cn-toggle-variant-outline"
      },
      size: {
        default: "cn-toggle-size-default",
        sm: "cn-toggle-size-sm",
        lg: "cn-toggle-size-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ToggleProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ToggleButtonRootProps<T>
> &
  VariantProps<typeof toggleVariants> &
  Pick<ComponentProps<T>, "class">

const Toggle = <T extends ValidComponent = "button">(props: ToggleProps<T>) => {
  const others = omit(props as ToggleProps, "variant", "size", "class")
  return (
    <ToggleButton
      class={cn(toggleVariants({ variant: props.variant, size: props.size }), props.class)}
      data-slot="toggle"
      {...others}
    />
  )
}

export { Toggle, type ToggleProps, toggleVariants }
