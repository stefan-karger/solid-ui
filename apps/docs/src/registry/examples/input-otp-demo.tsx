import { createSignal, For } from "solid-js"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from "~/registry/ui/input-otp"
export default function InputOTPDemo() {
  const [value, setValue] = createSignal("")
  return (
    <div class="grid gap-3">
      <InputOTP
        aria-label="Verification code"
        value={value()}
        onValueChange={setValue}
        maxLength={6}
      >
        <InputOTPGroup>
          <For each={[0, 1, 2]}>
            {(index) => <InputOTPSlot index={index} />}
          </For>
        </InputOTPGroup>
        <InputOTPSeparator>−</InputOTPSeparator>
        <InputOTPGroup>
          <For each={[3, 4, 5]}>
            {(index) => <InputOTPSlot index={index} />}
          </For>
        </InputOTPGroup>
      </InputOTP>
      <output class="text-center text-sm text-muted-foreground">
        {value() || "Enter your verification code"}
      </output>
    </div>
  )
}
