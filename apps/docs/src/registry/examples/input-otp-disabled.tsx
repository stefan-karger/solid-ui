import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/registry/ui/input-otp"

export default function InputOTPDisabled() {
  return (
    <InputOTP disabled id="disabled" maxLength={6} value="123456">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
