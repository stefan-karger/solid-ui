import { Button } from "~/registry/ui/button";
import { showToast, Toaster } from "~/registry/ui/toast";

export default function ToastDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          showToast({
            description: "Monday, January 3rd at 6:00pm",
            title: "Event has been created",
          })
        }
      >
        Add Event
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: "Monday, January 3rd at 6:00pm",
            title: "Event has been deleted",
            variant: "destructive",
          })
        }
        variant="destructive"
      >
        Delete Event
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: "Monday, January 3rd at 6:00pm",
            title: "SUCCESS!",
            variant: "success",
          })
        }
        variant="outline"
      >
        Success
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: "Monday, January 3rd at 6:00pm",
            title: "WARING!",
            variant: "warning",
          })
        }
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          showToast({
            description: "Monday, January 3rd at 6:00pm",
            title: "ERROR!",
            variant: "error",
          })
        }
        variant="outline"
      >
        Error
      </Button>
      <Toaster />
    </div>
  );
}
