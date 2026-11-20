import { type ComponentProps } from "@solidjs/web"
import { ChevronDownIcon } from "lucide-solid"
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
      <ChevronDownIcon
        aria-hidden="true"
        class="cn-native-select-icon pointer-events-none absolute select-none"
        data-slot="native-select-icon"
      />
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
