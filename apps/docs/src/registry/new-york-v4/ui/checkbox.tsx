import type { ValidComponent } from "solid-js"
import { Match, Switch, splitProps } from "solid-js"

import * as CheckboxPrimitive from "@kobalte/core/checkbox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "~/lib/utils"

type CheckboxRootProps<T extends ValidComponent = "div"> =
  CheckboxPrimitive.CheckboxRootProps<T> & { class?: string | undefined }

const Checkbox = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CheckboxRootProps<T>>
) => {
  const [local, others] = splitProps(props as CheckboxRootProps, ["class"])
  return (
    <CheckboxPrimitive.Root
      class="items-top group relative flex space-x-2"
      data-slot="checkbox"
      {...others}
    >
      <CheckboxPrimitive.Input class="peer" data-slot="checkbox-input" />
      <CheckboxPrimitive.Control
        class={cn(
          "size-4 shrink-0 rounded-sm border border-input outline-none peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-[checked]:border-primary data-[indeterminate]:border-primary data-[checked]:bg-primary data-[indeterminate]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:text-primary-foreground data-disabled:opacity-50",
          local.class
        )}
        data-slot="checkbox-control"
      >
        <CheckboxPrimitive.Indicator
          class="flex items-center justify-center text-current transition-none"
          data-slot="checkbox-indicator"
        >
          <Switch>
            <Match when={!others.indeterminate}>
              <svg
                class="size-3.5"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </Match>
            <Match when={others.indeterminate}>
              <svg
                class="size-3.5"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 12l14 0" />
              </svg>
            </Match>
          </Switch>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
