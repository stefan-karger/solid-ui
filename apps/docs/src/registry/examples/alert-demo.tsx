import { CircleCheck, InfoIcon } from "lucide-solid"

import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"

export default function AlertDemo() {
  return (
    <div class="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CircleCheck class="size-4" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon class="size-4" />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account settings.
        </AlertDescription>
      </Alert>
    </div>
  )
}
