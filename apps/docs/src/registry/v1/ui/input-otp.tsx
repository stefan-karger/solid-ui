import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"

import type { DynamicProps, InputProps, RootProps } from "@corvu/otp-field"
import OtpField from "@corvu/otp-field"

import { cn } from "~/lib/utils"

export const REGEXP_ONLY_DIGITS = "^\\d*$"
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]*$"
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]*$"

type InputOTPProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string
}

const InputOTP = <T extends ValidComponent = "div">(props: DynamicProps<T, InputOTPProps<T>>) => {
  const [local, others] = splitProps(props as InputOTPProps, ["class"])

  return (
    <OtpField
      class={cn("flex items-center gap-2 has-disabled:opacity-50", local.class)}
      data-slot="input-otp-wrapper"
      {...others}
    />
  )
}

type InputOTPInputProps<T extends ValidComponent = "input"> = InputProps<T> & {
  class?: string
}

const InputOTPInput = <T extends ValidComponent = "input">(
  props: DynamicProps<T, InputOTPInputProps<T>>
) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <OtpField.Input
      class={cn("disabled:cursor-not-allowed", local.class)}
      data-slot="input-otp"
      {...others}
    />
  )
}

const InputOTPGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class={cn("flex items-center", local.class)} data-slot="input-otp-group" {...others} />
  )
}

const InputOTPSlot: Component<ComponentProps<"div"> & { index: number }> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"])
  const context = OtpField.useContext()
  const char = () => context.value()[local.index]
  const showFakeCaret = () => context.value().length === local.index && context.isInserting()

  return (
    <div
      class={cn(
        "group relative flex size-10 items-center justify-center border-input border-y border-r text-sm first:rounded-l-md first:border-l last:rounded-r-md",
        local.class
      )}
      {...others}
    >
      <div
        class={cn(
          "absolute inset-0 z-10 transition-all group-first:rounded-l-md group-last:rounded-r-md",
          context.activeSlots().includes(local.index) && "ring-2 ring-ring ring-offset-background"
        )}
      />
      {char()}
      <Show when={showFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      </Show>
    </div>
  )
}

const InputOTPSeparator: Component<ComponentProps<"div">> = (props) => {
  return (
    <div data-slot="input-otp-separator" {...props}>
      <svg
        class="size-6"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12.1" cy="12.1" r="1" />
      </svg>
    </div>
  )
}

export { InputOTP, InputOTPInput, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
