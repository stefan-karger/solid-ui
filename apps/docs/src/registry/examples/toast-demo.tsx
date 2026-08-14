import { toast } from "solid-sonner"
import { Button } from "~/registry/ui/button"

export default function ToastDemo() {
  const showToast = () =>
    toast("Event created", {
      description: "Sunday, December 3 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => {},
      },
    });

  return (
    <Button variant="outline" onClick={showToast}>
      Show Toast
    </Button>
  )
}