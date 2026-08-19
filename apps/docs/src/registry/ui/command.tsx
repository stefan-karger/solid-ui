import { Command as CommandPrimitive } from "cmdk-solid";
import { Check, SearchIcon } from "lucide-solid";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/registry/ui/dialog";
import { InputGroup, InputGroupAddon } from "~/registry/ui/input-group";

function Command(props: ComponentProps<"div">) {
  return (
    <CommandPrimitive
      data-slot="command"
      class={cn("cn-command flex size-full flex-col overflow-hidden", props.class)}
      {...props}
    />
  );
}

type CommandDialogProps = ComponentProps<typeof Dialog> &
  Pick<ComponentProps<"div">, "class"> & {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
  };

function CommandDialog(props: CommandDialogProps) {
  const mergedProps = mergeProps(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: false,
    },
    props,
  );

  const [local, others] = splitProps(mergedProps as CommandDialogProps, [
    "title",
    "description",
    "showCloseButton",
    "children",
    "class",
  ]);

  return (
    <Dialog {...others}>
      <DialogHeader class="sr-only">
        <DialogTitle>{local.title}</DialogTitle>
        <DialogDescription>{local.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn("cn-command-dialog overflow-hidden p-0", local.class)}
        showCloseButton={local.showCloseButton}
      >
        {local.children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput(props: ComponentProps<typeof CommandPrimitive.Input>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="command-input-wrapper" class="cn-command-input-wrapper">
      <InputGroup class="cn-command-input-group">
        <CommandPrimitive.Input
          data-slot="command-input"
          class={cn(
            "cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            local.class,
          )}
          {...others}
        />
        <InputGroupAddon>
          <SearchIcon class="cn-command-input-icon" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList(props: ComponentProps<typeof CommandPrimitive.List>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      class={cn("cn-command-list overflow-y-auto overflow-x-hidden", local.class)}
      {...others}
    />
  );
}

function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      class={cn("cn-command-empty", local.class)}
      {...others}
    />
  );
}

function CommandGroup(props: ComponentProps<typeof CommandPrimitive.Group>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      class={cn("cn-command-group", local.class)}
      {...others}
    />
  );
}

function CommandSeparator(props: ComponentProps<typeof CommandPrimitive.Separator>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      class={cn("cn-command-separator", local.class)}
      {...others}
    />
  );
}

function CommandItem(props: ComponentProps<typeof CommandPrimitive.Item>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      class={cn(
        "group/command-item cn-command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <Check class="cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut(props: ComponentProps<"span">) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span data-slot="command-shortcut" class={cn("cn-command-shortcut", local.class)} {...others} />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
