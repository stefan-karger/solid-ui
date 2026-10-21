import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"

export default function ToastPromise() {
  const showToast = () =>
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "Event" }), 2000)
      }),
      {
        loading: "Creating event…",
        success: (data) => `${data.name} created.`,
        error: "Could not create event."
      }
    )

  return (
    <Button onClick={showToast} variant="outline">
      Create Event
    </Button>
  )
}
