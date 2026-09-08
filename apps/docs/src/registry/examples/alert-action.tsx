import { Alert, AlertAction, AlertDescription, AlertTitle } from "~/registry/ui/alert"
import { Button } from "~/registry/ui/button"

export default function AlertActionExample() {
  return (
    <Alert class="max-w-md">
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="default">
          Enable
        </Button>
      </AlertAction>
    </Alert>
  )
}
