import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

const NativeSelect: Component<
  Omit<ComponentProps<"select">, "size"> & { size?: "sm" | "default" }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"])
  const size = local.size ?? "default"

  return (
    <div
      class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        class={cn(
          "cn-native-select h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          local.class
        )}
        data-size={size}
        data-slot="native-select"
        {...others}
      />
      <ChevronDown
        aria-hidden="true"
        class="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3.5 size-4 select-none text-muted-foreground opacity-50"
        data-slot="native-select-icon"
      />
    </div>
  )
}

const NativeSelectOption: Component<ComponentProps<"option">> = (props) => {
  return <option data-slot="native-select-option" {...props} />
}

const NativeSelectOptGroup: Component<ComponentProps<"optgroup">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <optgroup class={cn(local.class)} data-slot="native-select-optgroup" {...others} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
