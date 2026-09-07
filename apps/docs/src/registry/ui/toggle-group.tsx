import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  ToggleGroup as ToggleGroupPrimitive,
  type ToggleGroupItemProps,
  type ToggleGroupRootProps
} from "@kobalte/core/toggle-group"
import { type ComponentProps, type JSX, type ValidComponent } from "@solidjs/web"
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

type ToggleGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ToggleGroupRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }

const ToggleGroup = <T extends ValidComponent = "div">(rawProps: ToggleGroupProps<T>) => {
  const local = merge(
    {
      spacing: 0,
      orientation: "horizontal"
    } as const,
    rawProps
  ) as ToggleGroupProps
  const others = omit(
    rawProps as ToggleGroupProps,
    "class",
    "children",
    "variant",
    "size",
    "spacing",
    "orientation"
  )
  const contextValue: ToggleGroupContextValue = {
    get variant() {
      return local.variant
    },
    get size() {
      return local.size
    },
    get spacing() {
      return local.spacing
    },
    get orientation() {
      return local.orientation
    }
  }
  return (
    <ToggleGroupPrimitive
      class={cn(
        "group/toggle-group cn-toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        local.class
      )}
      data-orientation={local.orientation}
      data-size={local.size}
      data-slot="toggle-group"
      data-spacing={local.spacing}
      data-variant={local.variant}
      orientation={local.orientation ?? "horizontal"}
      style={{ "--gap": local.spacing } as JSX.CSSProperties}
      {...others}
    >
      <ToggleGroupContext value={contextValue}>{local.children}</ToggleGroupContext>
    </ToggleGroupPrimitive>
  )
}

type ToggleGroupItemComponentProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ToggleGroupItemProps<T>
> &
  VariantProps<typeof toggleVariants> &
  Pick<ComponentProps<T>, "class" | "children">

const ToggleGroupItem = <T extends ValidComponent = "button">(
  rawProps: ToggleGroupItemComponentProps<T>
) => {
  const local = merge(
    { variant: "default" as const, size: "default" as const },
    rawProps
  ) as ToggleGroupItemComponentProps
  const others = omit(
    rawProps as ToggleGroupItemComponentProps,
    "class",
    "children",
    "variant",
    "size"
  )
  const context = useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        "cn-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || local.variant,
          size: context.size || local.size
        }),
        local.class
      )}
      data-size={context.size || local.size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant || local.variant}
      {...others}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps }
