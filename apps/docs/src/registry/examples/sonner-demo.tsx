import { Button } from "~/registry/ui/button"
import { Toaster, toast } from "~/registry/ui/sonner"

export default function SonnerDemo() {
  return (
    <div class="flex flex-col items-center gap-4">
      <Toaster />
      <div class="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM"
            })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Event has been created successfully.")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Event could not be created.")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Please verify your email address.")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Be at the area 10 minutes before the event time.")}
        >
          Info
        </Button>
      </div>
    </div>
  )
}
