import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert class="max-w-md" variant="destructive">
      <IconPlaceholder lucide="CircleExclamationPointIcon" class="size-4" />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method
        and try again.
      </AlertDescription>
    </Alert>
  )
}
