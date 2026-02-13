import { InputOTP } from "~/registry/ui/input-otp"

export default function InputOTPDemo() {
  return (
    <div class="flex flex-col items-center gap-4">
      <InputOTP maxLength={6} />
      <p class="text-muted-foreground text-sm">Enter your 6-digit code.</p>
    </div>
  )
}
