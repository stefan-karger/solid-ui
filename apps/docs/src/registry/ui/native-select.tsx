import { type ComponentProps, mergeProps, splitProps } from "solid-js"

import { ChevronDown } from "lucide-solid"

import { cn } from "~/lib/utils"

type NativeSelectProps = ComponentProps<"select"> & {
  size?: "sm" | "default"
}

function NativeSelect(props: NativeSelectProps) {
  const mergedProps = mergeProps({ size: "default" }, props)
  const [local, others] = splitProps(mergedProps, ["class", "size"])
  return (
    <div
      class={cn(
        "group/native-select cn-native-select-wrapper relative w-fit has-[select:disabled]:opacity-50",
        local.class
      )}
      data-size={local.size}
      data-slot="native-select-wrapper"
    >
      <select
        class="cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
        data-size={local.size}
        data-slot="native-select"
        {...others}
      />
      <ChevronDown
        class="cn-native-select-icon pointer-events-none absolute select-none"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption(props: ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup(props: ComponentProps<"optgroup">) {
  const [local, others] = splitProps(props, ["class"])
  return <optgroup class={cn(local.class)} data-slot="native-select-optgroup" {...others} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
