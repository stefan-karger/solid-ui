import OtpField, { type RootProps as OtpFieldRootProps } from "@corvu/otp-field"
import { Minus } from "lucide-solid"
import { type ComponentProps, Show, splitProps } from "solid-js"

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
    "pattern",
  ])

  return (
    <OtpField
      data-slot="input-otp"
      spellcheck={false}
      class={cn("cn-input-otp flex items-center has-disabled:opacity-50", local.containerClass)}
      {...others}
    >
      <OtpField.Input
        id={local.id}
        data-slot="input-otp-input"
        class={cn("cn-input-otp-input disabled:cursor-not-allowed", local.class)}
        spellcheck={false}
        disabled={local.disabled}
        required={local.required}
        value={local.value}
        onChange={(e) => local.onValueChange?.(e.target.value)}
        pattern={local.pattern}
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
      data-slot="input-otp-group"
      class={cn("cn-input-otp-group flex items-center", local.class)}
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
      data-slot="input-otp-slot"
      data-active={isActive()}
      class={cn(
        "relative cn-input-otp-slot flex items-center justify-center data-[active=true]:z-10",
        local.class,
      )}
      {...others}
    >
      {char()}
      <Show when={showCaret()}>
        <div class="pointer-events-none absolute inset-0 cn-input-otp-caret flex items-center justify-center">
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
      data-slot="input-otp-separator"
      class={cn("cn-input-otp-separator flex items-center", local.class)}
      aria-hidden="true"
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
  type InputOTPSlotProps,
}
