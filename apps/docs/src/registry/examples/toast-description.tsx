import { Button } from "~/registry/ui/button"
import { createToaster, Toaster } from "~/registry/ui/toast"

export default function ToastDescription() {
  const toast = createToaster()
  return (
    <>
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm"
          })
        }
        variant="outline"
        class="w-fit"
      >
        Show Toast
      </Button>
      <Toaster toaster={toast} />
    </>
  )
}
