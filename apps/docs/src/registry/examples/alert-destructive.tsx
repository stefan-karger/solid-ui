import { CircleAlert } from "lucide-solid"

import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert class="max-w-md" variant="destructive">
      <CircleAlert class="size-4" />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  )
}
