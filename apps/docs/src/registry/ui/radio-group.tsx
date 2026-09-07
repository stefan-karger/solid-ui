import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Item,
  ItemControl,
  ItemIndicator,
  ItemInput,
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupItemProps as RadioGroupItemPrimitiveProps,
  type RadioGroupRootProps
} from "@kobalte/core/radio-group"
import { type ComponentProps, type ValidComponent } from "@solidjs/web"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"

type RadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  RadioGroupRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const RadioGroup = <T extends ValidComponent = "div">(props: RadioGroupProps<T>) => {
  const others = omit(props as RadioGroupProps, "class")
  return (
    <RadioGroupPrimitive
      class={cn("cn-radio-group w-full", props.class)}
      data-slot="radio-group"
      {...others}
    />
  )
}

type RadioGroupItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  RadioGroupItemPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">

const RadioGroupItem = <T extends ValidComponent = "div">(props: RadioGroupItemProps<T>) => {
  const others = omit(props as RadioGroupItemProps, "class", "id")
  return (
    <Item class="group/radio-group-item" data-slot="radio-group-item" {...others}>
      <ItemInput
        class="peer sr-only"
        data-slot="radio-group-item-input"
        {...(props.id === undefined ? {} : { id: props.id })}
      />
      <ItemControl
        aria-invalid={others["aria-invalid"]}
        class={cn(
          "cn-radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
          props.class
        )}
        data-slot="radio-group-item-control"
      >
        <ItemIndicator class="cn-radio-group-indicator" data-slot="radio-group-indicator">
          <span class="cn-radio-group-indicator-icon" />
        </ItemIndicator>
      </ItemControl>
    </Item>
  )
}

export { RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps }
