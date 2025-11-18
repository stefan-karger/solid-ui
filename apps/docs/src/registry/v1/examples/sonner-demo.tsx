import { toast } from "solid-sonner"

import { Button } from "~/registry/v1/ui/button"
import { Toaster } from "~/registry/v1/ui/sonner"

export default function SonnerDemo() {
  return (
    <>
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo")
            }
          })
        }
        variant="outline"
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  )
}
