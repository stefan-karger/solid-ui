import { RefreshCwIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/registry/ui/input-otp"

export default function InputOTPForm() {
  return (
    <Card class="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span class="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div class="flex items-center justify-between">
            <FieldLabel for="otp-verification">Verification code</FieldLabel>
            <Button size="xs" variant="outline">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP id="otp-verification" maxLength={6} required>
            <InputOTPGroup class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator class="mx-2" />
            <InputOTPGroup class="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            {/* biome-ignore lint/a11y/useValidAnchor: hash ok */}
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button class="w-full" type="submit">
            Verify
          </Button>
          <div class="text-muted-foreground text-sm">
            Having trouble signing in?{/* biome-ignore lint/a11y/useValidAnchor: hash ok */}
            <a class="underline underline-offset-4 transition-colors hover:text-primary" href="#">
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}
