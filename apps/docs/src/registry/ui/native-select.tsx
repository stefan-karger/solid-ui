// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import { type ComponentProps } from "@solidjs/web"
import { merge, omit } from "solid-js"

import { cn } from "~/lib/utils"

type NativeSelectProps = Omit<ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

const NativeSelect = (rawProps: NativeSelectProps) => {
  const local = merge({ size: "default" as const }, rawProps)
  const others = omit(rawProps, "class", "size")
  return (
    <div
      class={cn(
        "cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50",
        local.class
      )}
      data-size={local.size}
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={local.size}
        class="cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
        {...others}
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="cn-native-select-icon pointer-events-none absolute select-none"
        data-slot="native-select-icon"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

const NativeSelectOption = (props: ComponentProps<"option">) => (
  <option data-slot="native-select-option" {...props} />
)

const NativeSelectOptGroup = (props: ComponentProps<"optgroup">) => (
  <optgroup
    data-slot="native-select-optgroup"
    {...props}
    class={cn(props.class)}
  />
)

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
  type NativeSelectProps
}
