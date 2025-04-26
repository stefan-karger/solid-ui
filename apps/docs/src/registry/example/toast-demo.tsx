import { Button } from "@/registry/ui/button"
import { showToast, Toaster } from "@/registry/ui/toast"

export default function ToastDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          showToast({
            title: "Event has been created",
            description: "Monday, January 3rd at 6:00pm"
          })
        }
      >
        Add Event
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          showToast({
            title: "Event has been deleted",
            description: "Monday, January 3rd at 6:00pm",
            variant: "destructive"
          })
        }
      >
        Delete Event
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast({
            title: "SUCCESS!",
            description: "Monday, January 3rd at 6:00pm",
            variant: "success"
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast({
            title: "WARING!",
            description: "Monday, January 3rd at 6:00pm",
            variant: "warning"
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast({
            title: "ERROR!",
            description: "Monday, January 3rd at 6:00pm",
            variant: "error"
          })
        }
      >
        Error
      </Button>
      <Toaster />
    </div>
  )
}
