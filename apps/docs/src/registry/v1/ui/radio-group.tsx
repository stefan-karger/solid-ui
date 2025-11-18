import type { JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as RadioGroupPrimitive from "@kobalte/core/radio-group"

import { cn } from "~/lib/utils"

type RadioGroupRootProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupRootProps<T> & { class?: string | undefined }

const RadioGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupRootProps<T>>
) => {
  const [local, others] = splitProps(props as RadioGroupRootProps, ["class"])
  return (
    <RadioGroupPrimitive.Root
      class={cn("grid gap-3", local.class)}
      data-slot="radio-group"
      {...others}
    />
  )
}

type RadioGroupItemProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupItemProps<T> & {
    class?: string | undefined
    children?: JSX.Element
  }

const RadioGroupItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupItemProps<T>>
) => {
  const [local, others] = splitProps(props as RadioGroupItemProps, ["class", "children"])
  return (
    <RadioGroupPrimitive.Item
      class={cn("flex items-center space-x-2", local.class)}
      data-slot="radio-group-item"
      {...others}
    >
      <RadioGroupPrimitive.ItemInput class="peer" />
      <RadioGroupPrimitive.ItemControl class="aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40">
        <RadioGroupPrimitive.ItemIndicator
          class="relative flex h-full items-center justify-center"
          data-slot="radio-group-indicator"
        >
          <svg
            class="size-2 fill-primary"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          </svg>
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupPrimitive.ItemControl>
      {local.children}
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
