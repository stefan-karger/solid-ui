import { type ComponentProps } from "@solidjs/web"
import { Toggle as SdkToggle } from "@ui-sdk/solid/toggle"
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
type ToggleProps = (Omit<ComponentProps<typeof SdkToggle>, "class"> & {
  class?: string
}) &
  VariantProps<typeof toggleVariants>
const Toggle = (props: ToggleProps) => {
  const others = omit(props, "variant", "size", "class")
  return (
    <SdkToggle
      class={cn(
        toggleVariants({ variant: props.variant, size: props.size }),
        props.class
      )}

      {...others}
    />
  )
}
export { Toggle, toggleVariants, type ToggleProps }
