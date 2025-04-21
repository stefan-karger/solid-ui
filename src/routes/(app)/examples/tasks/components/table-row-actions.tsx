import type { Row } from "@tanstack/solid-table";
import { For } from "solid-js";

import { IconDots } from "~/components/icons";
import { Button } from "~/registry/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu";

import type { Task } from "./data";
import { labels } from "./data";

type TableRowActionsProps = {
  row: Row<Task>;
};

export function TableRowActions(props: TableRowActionsProps) {
  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger
        as={Button<"button">}
        class="flex size-8 p-0 data-[state=open]:bg-muted"
        variant="ghost"
      >
        <IconDots />
        <span class="sr-only">Open menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub overlap>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={props.row.original.label}>
                <For each={labels}>
                  {(label) => (
                    <DropdownMenuRadioItem value={label.value}>
                      {label.label}
                    </DropdownMenuRadioItem>
                  )}
                </For>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
