// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps } from "@solidjs/web"
import {
  Checkbox as SdkCheckbox,
  CheckboxIndicator as SdkCheckboxIndicator
} from "@ui-sdk/solid/checkbox"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
type CheckboxProps = Omit<ComponentProps<typeof SdkCheckbox>, "class"> & {
  class?: string
}
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
          class="group-data-indeterminate/checkbox:hidden"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
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
          class="hidden group-data-indeterminate/checkbox:block"
        >
          <path d="M5 12h14" />
        </svg>
      </SdkCheckboxIndicator>
    </SdkCheckbox>
  )
}
export { Checkbox, type CheckboxProps }
