import { createSignal, Show } from "solid-js"

import { useIsMobile } from "~/registry/hooks/use-mobile"
import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/registry/ui/drawer"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"

const description = "Make changes to your profile here. Click save when you're done."

function ProfileForm(props: { class?: string; onSave: () => void }) {
  return (
    <form
      class={["grid items-start gap-6", props.class]}
      onSubmit={(event) => {
        event.preventDefault()
        props.onSave()
      }}
    >
      <div class="grid gap-3">
        <Label for="drawer-profile-email">Email</Label>
        <Input type="email" id="drawer-profile-email" value="shadcn@example.com" />
      </div>
      <div class="grid gap-3">
        <Label for="drawer-profile-username">Username</Label>
        <Input id="drawer-profile-username" value="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}

export default function DrawerDialogDemo() {
  const mobile = useIsMobile()
  const [open, setOpen] = createSignal(false)
  const close = () => setOpen(false)
  return (
    <Show
      when={mobile()}
      fallback={
        <Dialog open={open()} onOpenChange={setOpen}>
          <DialogTrigger render={(part) => <Button {...part} variant="outline" />}>
            Edit Profile
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <ProfileForm onSave={close} />
          </DialogContent>
        </Dialog>
      }
    >
      <Drawer open={open()} onOpenChange={setOpen}>
        <DrawerTrigger render={(part) => <Button {...part} variant="outline" />}>
          Edit Profile
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader class="text-start">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <ProfileForm class="px-4" onSave={close} />
          <DrawerFooter class="pt-2">
            <DrawerClose render={(part) => <Button {...part} variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Show>
  )
}
