import { type ComponentProps, createUniqueId, splitProps } from "solid-js"

import { cn } from "~/lib/utils"

type InputProps = ComponentProps<"input"> & {
  defaultValue?: ComponentProps<"input">["value"]
}

const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, [
    "class",
    "defaultValue",
    "disabled",
    "id",
    "type",
    "value"
  ])
  const generatedId = `base-ui-${createUniqueId()}`

  return (
    <input
      class={cn(
        "cn-input w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      data-disabled={local.disabled ? "" : undefined}
      data-slot="input"
      disabled={local.disabled}
      id={local.id ?? generatedId}
      type={local.type}
      value={local.value ?? local.defaultValue}
      {...others}
    />
  )
}

export { Input, type InputProps }
