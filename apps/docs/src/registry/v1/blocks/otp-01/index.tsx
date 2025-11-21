import { OTPForm } from "~/registry/v1/blocks/otp-01/components/otp-form"

export default function OTPPage() {
  return (
    <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-xs">
        <OTPForm />
      </div>
    </div>
  )
}
