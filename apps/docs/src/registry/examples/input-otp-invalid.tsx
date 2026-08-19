import { createSignal } from "solid-js"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/registry/ui/input-otp"

export default function InputOTPInvalid() {
  const [value, setValue] = createSignal("000000")

  return (
    <InputOTP maxLength={6} value={value()} onValueChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} aria-invalid />
        <InputOTPSlot index={1} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} aria-invalid />
        <InputOTPSlot index={3} aria-invalid />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} aria-invalid />
        <InputOTPSlot index={5} aria-invalid />
      </InputOTPGroup>
    </InputOTP>
  )
}
