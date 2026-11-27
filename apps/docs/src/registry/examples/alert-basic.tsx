import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"

export default function AlertBasic() {
  return (
    <Alert class="max-w-md">
      <IconPlaceholder lucide="CircleCheckIcon" class="size-4" />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}
