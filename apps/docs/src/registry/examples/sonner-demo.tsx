import { Button } from "~/registry/ui/button"
import { Toaster, toast } from "~/registry/ui/sonner"

export default function SonnerDemo() {
  return (
    <div class="flex flex-col items-center gap-4">
      <Toaster />
      <div class="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM"
            })
          }
          variant="outline"
        >
          Default
        </Button>
        <Button
          onClick={() => toast.success("Event has been created successfully.")}
          variant="outline"
        >
          Success
        </Button>
        <Button onClick={() => toast.error("Event could not be created.")} variant="outline">
          Error
        </Button>
        <Button
          onClick={() => toast.warning("Please verify your email address.")}
          variant="outline"
        >
          Warning
        </Button>
        <Button
          onClick={() => toast.info("Be at the area 10 minutes before the event time.")}
          variant="outline"
        >
          Info
        </Button>
      </div>
    </div>
  )
}
