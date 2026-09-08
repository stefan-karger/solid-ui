import { TriangleAlert } from "lucide-solid"

import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"

export default function AlertColors() {
  return (
    <Alert class="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <TriangleAlert class="size-4" />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to continue using the
        service.
      </AlertDescription>
    </Alert>
  )
}
