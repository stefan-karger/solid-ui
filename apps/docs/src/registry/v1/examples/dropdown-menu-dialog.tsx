import { createSignal } from "solid-js"

import { IconDots } from "~/components/icons"
import { Button } from "~/registry/v1/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/registry/v1/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/registry/v1/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "~/registry/v1/ui/field"
import { Input } from "~/registry/v1/ui/input"
import { Label } from "~/registry/v1/ui/label"
import { Textarea } from "~/registry/v1/ui/textarea"

export default function DropdownMenuDialog() {
  const [showNewDialog, setShowNewDialog] = createSignal(false)
  const [showShareDialog, setShowShareDialog] = createSignal(false)

  return (
    <>
      <DropdownMenu modal={false} placement="bottom-end">
        <DropdownMenuTrigger
          aria-label="Open menu"
          as={Button<"button">}
          size="icon-sm"
          variant="outline"
        >
          <IconDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-40">
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>New File...</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>Share...</DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog onOpenChange={setShowNewDialog} open={showNewDialog()}>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup class="pb-3">
            <Field>
              <FieldLabel for="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose as={Button<"button">} variant="outline">
              Cancel
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog onOpenChange={setShowShareDialog} open={showShareDialog()}>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup class="py-3">
            <Field>
              <Label for="email">Email Address</Label>
              <Input
                auto-complete="off"
                id="email"
                name="email"
                placeholder="shadcn@vercel.com"
                type="email"
              />
            </Field>
            <Field>
              <FieldLabel for="message">Message (Optional)</FieldLabel>
              <Textarea id="message" name="message" placeholder="Check out this file" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose as={Button<"button">} variant="outline">
              Cancel
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
