import { ActivityIcon } from "lucide-solid"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger
} from "~/registry/ui/alert-dialog"
import { Button } from "~/registry/ui/button"

export default function AlertDialogSmallMedia() {
  return (
    <AlertDialog>
      <AlertDialogTrigger as={Button} variant="outline">
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <ActivityIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
          <AlertDialogAction>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
