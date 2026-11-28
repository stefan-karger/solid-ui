import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"

export default function SonnerPosition() {
  return (
    <div class="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-left" })
        }
      >
        Top Left
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-center" })
        }
      >
        Top Center
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-right" })
        }
      >
        Top Right
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-left" })
        }
      >
        Bottom Left
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-center" })
        }
      >
        Bottom Center
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-right" })
        }
      >
        Bottom Right
      </Button>
    </div>
  )
}
