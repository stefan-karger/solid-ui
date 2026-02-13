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
        data-slot="native-select"
        data-size={size}
        class={cn(
          "cn-native-select border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          local.class
        )}
        {...others}
      />
      <ChevronDown
        class="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
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
  return (
    <optgroup
      data-slot="native-select-optgroup"
      class={cn(local.class)}
      {...others}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
