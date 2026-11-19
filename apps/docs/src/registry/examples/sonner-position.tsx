import { Button } from "~/registry/ui/button"
import { createToaster, Toaster } from "~/registry/ui/sonner"

export default function SonnerPosition() {
  const toasters = {
    "top-left": createToaster(),
    "top-center": createToaster(),
    "top-right": createToaster(),
    "bottom-left": createToaster(),
    "bottom-center": createToaster(),
    "bottom-right": createToaster()
  }
  return (
    <div class="flex flex-wrap justify-center gap-2">
      <Toaster toaster={toasters["top-left"]} side="top" align="start" />
      <Toaster toaster={toasters["top-center"]} side="top" align="center" />
      <Toaster toaster={toasters["top-right"]} side="top" align="end" />
      <Toaster toaster={toasters["bottom-left"]} side="bottom" align="start" />
      <Toaster toaster={toasters["bottom-center"]} side="bottom" align="center" />
      <Toaster toaster={toasters["bottom-right"]} side="bottom" align="end" />
      <Button variant="outline" onClick={() => toasters["top-left"]("Event has been created")}>
        Top Left
      </Button>
      <Button variant="outline" onClick={() => toasters["top-center"]("Event has been created")}>
        Top Center
      </Button>
      <Button variant="outline" onClick={() => toasters["top-right"]("Event has been created")}>
        Top Right
      </Button>
      <Button variant="outline" onClick={() => toasters["bottom-left"]("Event has been created")}>
        Bottom Left
      </Button>
      <Button variant="outline" onClick={() => toasters["bottom-center"]("Event has been created")}>
        Bottom Center
      </Button>
      <Button variant="outline" onClick={() => toasters["bottom-right"]("Event has been created")}>
        Bottom Right
      </Button>
    </div>
  )
}
