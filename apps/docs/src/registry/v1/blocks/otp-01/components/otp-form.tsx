import type { ComponentProps } from "solid-js"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/v1//ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/v1//ui/field"
import { Button } from "~/registry/v1/ui/button"
import { InputOTP, InputOTPGroup, InputOTPInput, InputOTPSlot } from "~/registry/v1/ui/input-otp"

export function OTPForm(props: ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel>Verification code</FieldLabel>
              <InputOTP maxLength={6}>
                <InputOTPGroup class="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
                <InputOTPInput />
              </InputOTP>
              <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit">Verify</Button>
              <FieldDescription class="text-center">
                Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
