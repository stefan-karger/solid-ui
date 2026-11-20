import { type ComponentProps, type JSX } from "@solidjs/web"
import {
  Toggle as SdkToggle,
  ToggleGroup as SdkToggleGroup
} from "@ui-sdk/solid/toggle"
import type { VariantProps } from "class-variance-authority"
import { createContext, merge, omit, useContext } from "solid-js"

import { cn } from "~/lib/utils"
import { toggleVariants } from "~/registry/ui/toggle"
type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  spacing?: number | undefined
  orientation?: "horizontal" | "vertical" | undefined
}
const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
})
type ToggleGroupProps = (Omit<
  ComponentProps<typeof SdkToggleGroup>,
  "class" | "children"
> & {
  children?: JSX.Element
  class?: string
}) &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
const ToggleGroup = (rawProps: ToggleGroupProps) => {
  const local = merge(
    {
      spacing: 0,
      orientation: "horizontal"
    } as const,
    rawProps
  ) as ToggleGroupProps
  const others = omit(
    rawProps,
    "class",
    "children",
    "variant",
    "size",
    "spacing",
    "orientation"
  )
  return (
    <SdkToggleGroup
      class={cn(
        "group/toggle-group cn-toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        local.class
      )}
      data-orientation={local.orientation}
      data-size={local.size}

      data-spacing={local.spacing}
      data-variant={local.variant}
      orientation={local.orientation ?? "horizontal"}
      style={{ "--gap": local.spacing } as JSX.CSSProperties}
      {...others}
    >
      <ToggleGroupContext value={local}>{local.children}</ToggleGroupContext>
    </SdkToggleGroup>
  )
}
type ToggleGroupItemComponentProps = (Omit<
  ComponentProps<typeof SdkToggle> & {
    value: string
  },
  "class"
> & {
  class?: string
}) &
  VariantProps<typeof toggleVariants>
const ToggleGroupItem = (rawProps: ToggleGroupItemComponentProps) => {
  const local = merge(
    { variant: "default" as const, size: "default" as const },
    rawProps
  ) as ToggleGroupItemComponentProps
  const others = omit(rawProps, "class", "children", "variant", "size")
  const context = useContext(ToggleGroupContext)
  return (
    <SdkToggle
      class={cn(
        "cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || local.variant,
          size: context.size || local.size
        }),
        local.class
      )}
      data-size={context.size || local.size}

      data-spacing={context.spacing}
      data-variant={context.variant || local.variant}
      {...others}
    >
      {local.children}
    </SdkToggle>
  )
}
export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps }
