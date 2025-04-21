import type { ComponentProps } from "solid-js";
import { createSignal, onMount, Show } from "solid-js";

import { cn } from "~/lib/utils";
import { Button } from "~/registry/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/registry/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/registry/ui/drawer";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/registry/ui/text-field";

export default function DrawerDialogDemo() {
  const [open, setOpen] = createSignal(false);
  const [isDesktop, setIsDesktop] = createSignal(false);

  onMount(() => {
    setIsDesktop(window.innerWidth >= 768);
  });

  const MobileDialog = () => (
    <Drawer onOpenChange={setOpen} open={open()}>
      <DrawerTrigger as={Button<"button">} variant="outline">
        Edit Profile
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader class="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm class="px-4" />
        <DrawerFooter class="pt-2">
          <DrawerClose as={Button<"button">} variant="outline">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Show fallback={<MobileDialog />} when={isDesktop()}>
      <Dialog onOpenChange={setOpen} open={open()}>
        <DialogTrigger as={Button} variant="outline">
          Edit Profile
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    </Show>
  );
}

function ProfileForm(props: ComponentProps<"form">) {
  return (
    <form class={cn("grid items-start gap-4", props.class)}>
      <TextField class="grid gap-2">
        <TextFieldLabel>Email</TextFieldLabel>
        <TextFieldInput placeholder="shadcn@example.com" type="email" />
      </TextField>
      <TextField class="grid gap-2">
        <TextFieldLabel>Username</TextFieldLabel>
        <TextFieldInput placeholder="@shadcn" type="text" />
      </TextField>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
