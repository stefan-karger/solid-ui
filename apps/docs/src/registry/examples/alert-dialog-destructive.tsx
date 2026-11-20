import { TrashIcon } from "lucide-solid"

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

export default function AlertDialogDestructive() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={(partProps) => <Button {...partProps} variant="destructive" />}
      >
        Delete Chat
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <TrashIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View{" "}
            <a href="#">Settings</a>, then delete any memories saved during this
            chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
