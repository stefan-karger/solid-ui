import { For } from "solid-js";

import { Button } from "~/registry/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/registry/ui/sheet";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/registry/ui/text-field";

const SHEET_POSITIONS = ["top", "right", "bottom", "left"] as const;

export default function SheetDemo() {
  return (
    <div class="grid grid-cols-2 gap-2">
      <For each={SHEET_POSITIONS}>
        {(position) => (
          <Sheet>
            <SheetTrigger as={Button<"button">} variant="outline">
              {position}
            </SheetTrigger>
            <SheetContent position={position}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div class="grid gap-4 py-4">
                <TextField class="grid grid-cols-4 items-center gap-4">
                  <TextFieldLabel class="text-right">Name</TextFieldLabel>
                  <TextFieldInput
                    class="col-span-3"
                    type="text"
                    value="Pedro Duarte"
                  />
                </TextField>
                <TextField class="grid grid-cols-4 items-center gap-4">
                  <TextFieldLabel class="text-right">Username</TextFieldLabel>
                  <TextFieldInput
                    class="col-span-3"
                    type="text"
                    value="@peduarte"
                  />
                </TextField>
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </For>
    </div>
  );
}
