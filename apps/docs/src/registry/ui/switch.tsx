import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SwitchPrimitive from "@kobalte/core/switch"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type SwitchProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SwitchPrimitive.SwitchRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "aria-invalid"> & {
    size?: "sm" | "default"
  }

const Switch = <T extends ValidComponent = "div">(rawProps: SwitchProps<T>) => {
  const local = merge({ size: "default" as const }, rawProps) as SwitchProps
  const others = omit(rawProps as SwitchProps, "class", "size", "id", "aria-invalid")
  return (
    <SwitchPrimitive.Root
      class={cn(
        "peer group/switch relative inline-flex items-center outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        local.class
      )}
      data-size={local.size}
      data-slot="switch"
      {...others}
    >
      <SwitchPrimitive.Input
        class="peer sr-only"
        data-slot="switch-input"
        {...(local.id === undefined ? {} : { id: local.id })}
      />
      <SwitchPrimitive.Control
        aria-invalid={local["aria-invalid"]}
        class="cn-switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-all peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed"
        data-size={local.size}
        data-slot="switch-control"
      >
        <SwitchPrimitive.Thumb
          class="cn-switch-thumb pointer-events-none block ring-0 transition-transform"
          data-slot="switch-thumb"
        />
      </SwitchPrimitive.Control>
    </SwitchPrimitive.Root>
  )
}

export { Switch, type SwitchProps }
