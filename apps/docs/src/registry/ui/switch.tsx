import type { ComponentProps } from "@solidjs/web"
import {
  Switch as SdkSwitch,
  SwitchThumb as SdkSwitchThumb
} from "@ui-sdk/solid/switch"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
type SwitchProps = Omit<ComponentProps<typeof SdkSwitch>, "class"> & {
  class?: string
  size?: "sm" | "default"
}
const Switch = (props: SwitchProps) => {
  const rest = omit(props, "class", "children", "size")
  return (
    <SdkSwitch
      {...rest}
      data-size={props.size ?? "default"}
      class={cn(
        "cn-switch peer group/switch relative inline-flex items-center justify-start p-0 transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        props.class
      )}
    >
      <SdkSwitchThumb
        class={cn(
          "cn-switch-thumb pointer-events-none block rounded-[inherit] ring-0 transition-transform"
        )}
      />
    </SdkSwitch>
  )
}
export { Switch, type SwitchProps }
