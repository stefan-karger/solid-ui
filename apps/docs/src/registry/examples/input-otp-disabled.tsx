import { For } from "solid-js"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/registry/ui/input-otp"
export default function InputOTPDisabled() {
  return (
    <InputOTP aria-label="Disabled verification code" defaultValue="123456" disabled>
      <InputOTPGroup>
        <For each={[0, 1, 2, 3, 4, 5]}>{(index) => <InputOTPSlot index={index} />}</For>
      </InputOTPGroup>
    </InputOTP>
  )
}
