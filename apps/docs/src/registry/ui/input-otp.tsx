import type { ComponentProps } from "@solidjs/web"
import {
  OTPInput as SdkOTPInput,
  OTPInputGroup as SdkOTPInputGroup,
  OTPInputSlot as SdkOTPInputSlot,
  OTPInputSeparator as SdkOTPInputSeparator
} from "@ui-sdk/solid/otp-input"

import { cn } from "~/lib/utils"

export function InputOTP(
  props: Omit<ComponentProps<typeof SdkOTPInput>, "class"> & { class?: string }
) {
  return (
    <SdkOTPInput
      {...props}
      class={cn(
        "cn-input-otp flex items-center gap-2 has-disabled:opacity-50",
        props.class
      )}
    />
  )
}

export function InputOTPGroup(
  props: Omit<ComponentProps<typeof SdkOTPInputGroup>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkOTPInputGroup
      {...props}
      class={cn("cn-input-otp-group flex items-center", props.class)}
    />
  )
}

export function InputOTPSlot(
  props: Omit<ComponentProps<typeof SdkOTPInputSlot>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkOTPInputSlot
      {...props}
      class={cn(
        "cn-input-otp-slot relative flex items-center justify-center data-fake-caret:after:absolute data-fake-caret:after:h-4 data-fake-caret:after:w-px data-fake-caret:after:animate-caret-blink data-fake-caret:after:bg-current data-active:z-10",
        props.class
      )}
    />
  )
}

export function InputOTPSeparator(
  props: Omit<ComponentProps<typeof SdkOTPInputSeparator>, "class"> & {
    class?: string
  }
) {
  return (
    <SdkOTPInputSeparator
      {...props}
      class={cn("cn-input-otp-separator", props.class)}
    />
  )
}
