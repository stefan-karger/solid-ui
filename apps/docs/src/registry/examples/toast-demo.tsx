import { onCleanup } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Toaster, createToaster } from "~/registry/ui/toast"
export default function ToastDemo() {
  const toast = createToaster()
  onCleanup(() => toast.dismiss())
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onAction: () => toast.info("Event removed")
            }
          })
        }
      >
        Show Toast
      </Button>
      <Toaster toaster={toast} />
    </>
  )
}
