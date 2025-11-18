import type { Component, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import * as SwitchPrimitive from "@kobalte/core/switch"

import { cn } from "~/lib/utils"

type SwitchProps<T extends ValidComponent = "div"> = SwitchPrimitive.SwitchRootProps<T> & {
  class?: string
}

const Switch: Component<SwitchProps> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <SwitchPrimitive.Root data-slot="switch" {...others}>
      <SwitchPrimitive.Input
        class={cn(
          "outline-none [&:focus-visible+div]:border-ring [&:focus-visible+div]:ring-[3px] [&:focus-visible+div]:ring-ring/50"
        )}
      />
      <SwitchPrimitive.Control
        class={cn(
          "inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input shadow-xs transition-all data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[disabled]:opacity-50 dark:bg-input/80 dark:data-[checked]:bg-primary",
          local.class
        )}
        data-slot="switch-control"
      >
        <SwitchPrimitive.Thumb
          class={cn(
            "pointer-events-none block size-4 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-[calc(100%-2px)] dark:bg-foreground dark:data-[checked]:bg-primary-foreground"
          )}
          data-slot="switch-thumb"
        />
      </SwitchPrimitive.Control>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
