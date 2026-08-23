import type { ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as ToggleButtonPrimitive from "@kobalte/core/toggle-button"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

const toggleVariants = cva(
  "cn-toggle group/toggle inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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

type ToggleButtonRootProps<T extends ValidComponent = "button"> =
  ToggleButtonPrimitive.ToggleButtonRootProps<T> &
    VariantProps<typeof toggleVariants> & { class?: string | undefined }

const Toggle = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ToggleButtonRootProps<T>>
) => {
  const [local, others] = splitProps(props as ToggleButtonRootProps, ["class", "variant", "size"])
  return (
    <ToggleButtonPrimitive.Root
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
      data-slot="toggle"
      {...others}
    />
  )
}

export type { ToggleButtonRootProps as ToggleProps }
export { Toggle, toggleVariants }
