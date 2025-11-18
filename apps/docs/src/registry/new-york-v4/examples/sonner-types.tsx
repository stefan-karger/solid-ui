import { toast } from "solid-sonner"

import { Button } from "~/registry/new-york-v4/ui/button"
import { Toaster } from "~/registry/new-york-v4/ui/sonner"

export default function SonnerTypes() {
  return (
    <>
      <div class="flex flex-wrap gap-2">
        <Button onClick={() => toast("Event has been created")} variant="outline">
          Default
        </Button>
        <Button onClick={() => toast.success("Event has been created")} variant="outline">
          Success
        </Button>
        <Button
          onClick={() => toast.info("Be at the area 10 minutes before the event time")}
          variant="outline"
        >
          Info
        </Button>
        <Button
          onClick={() => toast.warning("Event start time cannot be earlier than 8am")}
          variant="outline"
        >
          Warning
        </Button>
        <Button onClick={() => toast.error("Event has not been created")} variant="outline">
          Error
        </Button>
        <Button
          onClick={() => {
            toast.promise<{ name: string }>(
              () => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),
              {
                loading: "Loading...",
                success: (data) => `${data.name} has been created`,
                error: "Error"
              }
            )
          }}
          variant="outline"
        >
          Promise
        </Button>
      </div>
      <Toaster />
    </>
  )
}
