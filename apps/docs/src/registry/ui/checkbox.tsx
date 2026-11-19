import type { ComponentProps } from "@solidjs/web"
import {
  Checkbox as SdkCheckbox,
  CheckboxIndicator as SdkCheckboxIndicator
} from "@ui-sdk/solid/checkbox"
import { CheckIcon, MinusIcon } from "lucide-solid"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
type CheckboxProps = Omit<ComponentProps<typeof SdkCheckbox>, "class"> & { class?: string }
const Checkbox = (props: CheckboxProps) => {
  const rest = omit(props, "class", "children")
  return (
    <SdkCheckbox
      {...rest}
      class={cn(
        "cn-checkbox group/checkbox peer relative shrink-0 outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        props.class
      )}
    >
      <SdkCheckboxIndicator class="cn-checkbox-indicator">
        <CheckIcon class="group-data-indeterminate/checkbox:hidden" />
        <MinusIcon class="hidden group-data-indeterminate/checkbox:block" />
      </SdkCheckboxIndicator>
    </SdkCheckbox>
  )
}
export { Checkbox, type CheckboxProps }
