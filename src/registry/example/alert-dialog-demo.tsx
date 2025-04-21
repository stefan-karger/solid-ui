import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/registry/ui/alert-dialog";
import { Button } from "~/registry/ui/button";

export default function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger as={Button} variant="outline">
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
        <AlertDialogDescription>
          An Alert Dialog enables assistive technologies and browsers to
          distinguish alert dialogs from other dialogs so they have the option
          of giving alert dialogs special treatment, such as playing a system
          alert sound.
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
