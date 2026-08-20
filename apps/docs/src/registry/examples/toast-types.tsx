import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"

export default function ToastTypes() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button onClick={() => toast("Event has been created.")} variant="outline">
        Default
      </Button>
      <Button onClick={() => toast.success("Event has been created.")} variant="outline">
        Success
      </Button>
      <Button onClick={() => toast.info("Arrive 10 minutes before the event.")} variant="outline">
        Info
      </Button>
      <Button
        onClick={() => toast.warning("The event cannot start before 8:00 AM.")}
        variant="outline"
      >
        Warning
      </Button>
      <Button onClick={() => toast.error("The event could not be created.")} variant="outline">
        Error
      </Button>
    </div>
  )
}
