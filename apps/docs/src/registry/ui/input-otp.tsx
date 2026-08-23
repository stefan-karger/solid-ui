import { type ComponentProps, Show, splitProps } from "solid-js"

import OtpField, { type RootProps as OtpFieldRootProps } from "@corvu/otp-field"
import { Minus } from "lucide-solid"

import { cn } from "~/lib/utils"

type InputOTPProps = OtpFieldRootProps &
  ComponentProps<"div"> &
  Pick<ComponentProps<"input">, "disabled" | "required"> & {
    containerClass?: string
    /**
     * Regex pattern for the input, forwarded to the underlying `OtpField.Input`.
     * Defaults to digits only (`'^\d*$'`). Pass `null` to allow all characters.
     */
    pattern?: string | null
  }

const InputOTP = (props: InputOTPProps) => {
  const [local, others] = splitProps(props as InputOTPProps, [
    "class",
    "containerClass",
    "children",
    "id",
    "disabled",
    "required",
    "value",
    "onValueChange",
    "pattern"
  ])

  return (
    <OtpField
      class={cn("cn-input-otp flex items-center has-disabled:opacity-50", local.containerClass)}
      data-slot="input-otp"
      spellcheck={false}
      {...others}
    >
      <OtpField.Input
        class={cn("cn-input-otp-input disabled:cursor-not-allowed", local.class)}
        data-slot="input-otp-input"
        disabled={local.disabled}
        id={local.id}
        onChange={(e) => local.onValueChange?.(e.target.value)}
        pattern={local.pattern}
        required={local.required}
        spellcheck={false}
        value={local.value}
      />
      {local.children}
    </OtpField>
  )
}

type InputOTPGroupProps = ComponentProps<"div">

const InputOTPGroup = (props: InputOTPGroupProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-input-otp-group flex items-center", local.class)}
      data-slot="input-otp-group"
      {...others}
    />
  )
}

type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number
}

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const [local, others] = splitProps(props, ["index", "class"])
  const context = OtpField.useContext()

  const char = () => context.value()[local.index]
  const isActive = () => context.activeSlots().includes(local.index)
  const showCaret = () => isActive() && context.isInserting()

  return (
    <div
      class={cn(
        "cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10",
        local.class
      )}
      data-active={isActive()}
      data-slot="input-otp-slot"
      {...others}
    >
      {char()}
      <Show when={showCaret()}>
        <div class="cn-input-otp-caret pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="cn-input-otp-caret-line h-4 w-px animate-caret-blink bg-foreground" />
        </div>
      </Show>
    </div>
  )
}

type InputOTPSeparatorProps = ComponentProps<"div">

const InputOTPSeparator = (props: InputOTPSeparatorProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      aria-hidden="true"
      class={cn("cn-input-otp-separator flex items-center", local.class)}
      data-slot="input-otp-separator"
      {...others}
    >
      <Minus />
    </div>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  type InputOTPGroupProps,
  type InputOTPProps,
  InputOTPSeparator,
  type InputOTPSeparatorProps,
  InputOTPSlot,
  type InputOTPSlotProps
}
