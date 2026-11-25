// Inline SVG icons from Lucide (https://lucide.dev), ISC License, Copyright (c) Lucide Icons and Contributors.
import type { ComponentProps, JSX } from "@solidjs/web"
import {
  Command as SdkCommand,
  CommandInput as SdkCommandInput,
  CommandList as SdkCommandList,
  CommandEmpty as SdkCommandEmpty,
  CommandGroup as SdkCommandGroup,
  CommandGroupLabel as SdkCommandGroupLabel,
  CommandSeparator as SdkCommandSeparator,
  CommandItem as SdkCommandItem,
  CommandShortcut as SdkCommandShortcut,
  CommandItemText as SdkCommandItemText
} from "@ui-sdk/solid/command"
import { omit } from "solid-js"

import { cn } from "~/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "~/registry/ui/dialog"
import { InputGroup, InputGroupAddon } from "~/registry/ui/input-group"
const Command = (
  props: Omit<ComponentProps<typeof SdkCommand>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommand
    {...props}
    class={cn(
      "cn-command flex size-full flex-col overflow-hidden",
      props.class
    )}
  />
)
const CommandInput = (
  props: Omit<ComponentProps<typeof SdkCommandInput>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <div data-ui="command-input-wrapper" class="cn-command-input-wrapper">
    <InputGroup class="cn-command-input-group">
      <SdkCommandInput
        aria-label="Search commands"
        data-ui="input-group-control"
        {...props}
        class={cn(
          "cn-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )}
      />
      <InputGroupAddon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          data-ui="command-input-icon"
          class="cn-command-input-icon"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </InputGroupAddon>
    </InputGroup>
  </div>
)
const CommandList = (
  props: Omit<ComponentProps<typeof SdkCommandList>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommandList
    {...props}
    class={cn("cn-command-list overflow-x-hidden overflow-y-auto", props.class)}
  />
)
const CommandEmpty = (
  props: Omit<ComponentProps<typeof SdkCommandEmpty>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommandEmpty
    {...props}
    class={cn("cn-command-empty empty:hidden", props.class)}
  />
)
const CommandGroup = (
  props: Omit<ComponentProps<typeof SdkCommandGroup>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => <SdkCommandGroup {...props} class={cn("cn-command-group", props.class)} />
const CommandGroupLabel = SdkCommandGroupLabel
const CommandSeparator = (
  props: Omit<
    ComponentProps<typeof SdkCommandSeparator>,
    "class" | "children"
  > & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommandSeparator
    {...props}
    class={cn("cn-command-separator", props.class)}
  />
)
const CommandShortcut = (
  props: Omit<
    ComponentProps<typeof SdkCommandShortcut>,
    "class" | "children"
  > & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommandShortcut
    {...props}
    class={cn("cn-command-shortcut", props.class)}
  />
)
const CommandItem = (
  props: Omit<ComponentProps<typeof SdkCommandItem>, "class" | "children"> & {
    class?: string
    children?: JSX.Element
  }
) => (
  <SdkCommandItem
    {...props}
    class={cn(
      "cn-command-item group/command-item relative flex cursor-default items-center outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50",
      props.class
    )}
  />
)
const CommandItemLabel = SdkCommandItemText
const CommandItemDescription = (props: ComponentProps<"span">) => (
  <span {...props} />
)
type CommandDialogProps = ComponentProps<typeof Dialog> & {
  class?: string
  title?: string
  description?: string
  showCloseButton?: boolean
}
const CommandDialog = (props: CommandDialogProps) => {
  const rest = omit(
    props,
    "class",
    "title",
    "description",
    "showCloseButton",
    "children"
  )
  return (
    <Dialog {...rest}>
      <DialogContent
        class={cn(
          "cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0",
          props.class
        )}
        showCloseButton={props.showCloseButton ?? false}
      >
        <DialogHeader class="sr-only">
          <DialogTitle>{props.title ?? "Command Palette"}</DialogTitle>
          <DialogDescription>
            {props.description ?? "Search for a command to run..."}
          </DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  )
}
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandSeparator,
  CommandShortcut,
  CommandItem,
  CommandItemLabel,
  CommandItemDescription,
  CommandDialog
}
