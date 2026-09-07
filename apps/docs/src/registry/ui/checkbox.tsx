import * as CheckboxPrimitive from "@kobalte/core/checkbox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { CheckIcon, Minus } from "lucide-solid"
import { Match, omit, Switch } from "solid-js"

import { cn } from "~/lib/utils"

type CheckboxProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  Omit<CheckboxPrimitive.CheckboxRootProps<T>, "children">
> &
  Pick<ComponentProps<T>, "class"> & {
    "aria-invalid"?: ComponentProps<"div">["aria-invalid"]
  }

const Checkbox = <T extends ValidComponent = "div">(props: CheckboxProps<T>) => {
  const others = omit(props as CheckboxProps, "class", "aria-invalid", "id")
  return (
    <CheckboxPrimitive.Root data-slot="checkbox-root" {...others}>
      <CheckboxPrimitive.Input
        data-slot="checkbox-input"
        {...(props.id === undefined ? {} : { id: props.id })}
      />
      <CheckboxPrimitive.Control
        aria-invalid={props["aria-invalid"]}
        class={cn(
          "cn-checkbox peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
          props.class
        )}
        data-slot="checkbox"
      >
        <Switch>
          <Match when={!others.indeterminate /* checked */}>
            <CheckboxPrimitive.Indicator
              class="cn-checkbox-indicator"
              data-slot="checkbox-indicator"
            >
              <CheckIcon />
            </CheckboxPrimitive.Indicator>
          </Match>
          <Match when={others.indeterminate}>
            <CheckboxPrimitive.Indicator
              class="cn-checkbox-indicator"
              data-slot="checkbox-indicator"
            >
              <Minus />
            </CheckboxPrimitive.Indicator>
          </Match>
        </Switch>
      </CheckboxPrimitive.Control>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, type CheckboxProps }
