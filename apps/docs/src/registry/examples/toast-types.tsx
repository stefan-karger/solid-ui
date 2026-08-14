import { toast } from "solid-sonner"
import { Button } from "~/registry/ui/button"

export default function ToastTypes() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Event has been created.")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Event has been created.")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Arrive 10 minutes before the event.")}>
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("The event cannot start before 8:00 AM.")}
      >
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("The event could not be created.")}>
        Error
      </Button>
    </div>
  )
}