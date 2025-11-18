import type { JSX, ValidComponent } from "solid-js"
import { createContext, splitProps, useContext } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as ToggleGroupPrimitive from "@kobalte/core/toggle-group"
import type { VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { toggleVariants } from "~/registry/v1/ui/toggle"

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number | null
  }
>({
  size: "default",
  variant: "default",
  spacing: 0
})

type ToggleGroupRootProps<T extends ValidComponent = "div"> =
  ToggleGroupPrimitive.ToggleGroupRootProps<T> &
    VariantProps<typeof toggleVariants> & {
      class?: string | undefined
      children?: JSX.Element
      spacing?: number
    }

const ToggleGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToggleGroupRootProps<T>>
) => {
  const [local, others] = splitProps(props as ToggleGroupRootProps, [
    "class",
    "children",
    "size",
    "variant",
    "spacing"
  ])

  return (
    <ToggleGroupPrimitive.Root
      class={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        local.class
      )}
      data-slot="toggle-group"
      style={{ "--gap": local.spacing }}
      {...others}
    >
      <ToggleGroupContext.Provider
        value={{
          get size() {
            return local.size
          },
          get variant() {
            return local.variant
          },
          get spacing() {
            return local.spacing
          }
        }}
      >
        {local.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

type ToggleGroupItemProps<T extends ValidComponent = "button"> =
  ToggleGroupPrimitive.ToggleGroupItemProps<T> &
    VariantProps<typeof toggleVariants> & { class?: string | undefined }

const ToggleGroupItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ToggleGroupItemProps<T>>
) => {
  const [local, others] = splitProps(props as ToggleGroupItemProps, ["class", "size", "variant"])
  const context = useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      class={cn(
        toggleVariants({
          size: context.size || local.size,
          variant: context.variant || local.variant
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:first:rounded-l-md",
        local.class
      )}
      data-slot="toggle-group-item"
      {...others}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
