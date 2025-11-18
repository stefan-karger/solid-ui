import { IconAlertCircle, IconCheckCircle, IconPopcorn } from "~/components/icons"
import { Alert, AlertDescription, AlertTitle } from "~/registry/new-york-v4/ui/alert"

export default function AlertDemo() {
  return (
    <div class="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <IconCheckCircle />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
      </Alert>
      <Alert>
        <IconPopcorn />
        <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <IconAlertCircle />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul class="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
