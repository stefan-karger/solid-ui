import { createSignal, Show } from "solid-js"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/registry/ui/input-otp"

export default function InputOTPControlled() {
  const [value, setValue] = createSignal("")
  return (
    <div class="space-y-2">
      <InputOTP maxLength={6} onValueChange={setValue} value={value()}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div class="text-center text-sm">
        <Show fallback={<>Enter your one-time password.</>} when={value() && value().length}>
          You entered: {value()}
        </Show>
      </div>
    </div>
  )
}
