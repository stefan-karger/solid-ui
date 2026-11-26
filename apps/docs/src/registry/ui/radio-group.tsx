import type { ComponentProps } from "@solidjs/web"
import {
  Radio as SdkRadio,
  RadioIndicator as SdkRadioIndicator,
  RadioGroup as SdkRadioGroup
} from "@ui-sdk/solid/radio"

import { cn } from "~/lib/utils"
type RadioGroupProps = Omit<ComponentProps<typeof SdkRadioGroup>, "class"> & {
  class?: string
}
const RadioGroup = (props: RadioGroupProps) => (
  <SdkRadioGroup {...props} class={cn("cn-radio-group w-full", props.class)} />
)
type RadioGroupItemProps = Omit<ComponentProps<typeof SdkRadio>, "class"> & {
  class?: string
}
const RadioGroupItem = (props: RadioGroupItemProps) => (
  <SdkRadio
    {...props}
    class={cn(
      "cn-radio-group-item peer relative aspect-square shrink-0 border outline-none data-disabled:opacity-50",
      props.class
    )}
  >
    <SdkRadioIndicator class="cn-radio-group-indicator">
      <span class="cn-radio-group-indicator-icon" />
    </SdkRadioIndicator>
  </SdkRadio>
)
export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps
}
