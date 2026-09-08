import { Dynamic } from "@solidjs/web"
import {
  Bell,
  Calculator,
  Calendar,
  ClipboardPaste,
  Code,
  Copy,
  CreditCard,
  FileText,
  Folder,
  FolderPlus,
  CircleQuestionMarkIcon,
  HouseIcon,
  Image,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Settings,
  Trash,
  User,
  ZoomIn,
  ZoomOut,
  type LucideIcon
} from "lucide-solid"
import { createMemo, createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "~/registry/ui/command"

type CommandOption = {
  value: string
  label: string
  shortcut?: string
  icon: LucideIcon
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Navigation",
    items: [
      { value: "home", label: "Home", shortcut: "⌘H", icon: HouseIcon },
      { value: "inbox", label: "Inbox", shortcut: "⌘I", icon: Inbox },
      { value: "documents", label: "Documents", shortcut: "⌘D", icon: FileText },
      { value: "folders", label: "Folders", shortcut: "⌘F", icon: Folder }
    ]
  },
  {
    heading: "Actions",
    items: [
      { value: "new-file", label: "New File", shortcut: "⌘N", icon: Plus },
      { value: "new-folder", label: "New Folder", shortcut: "⇧⌘N", icon: FolderPlus },
      { value: "copy", label: "Copy", shortcut: "⌘C", icon: Copy },
      { value: "cut", label: "Cut", shortcut: "⌘X", icon: Scissors },
      { value: "paste", label: "Paste", shortcut: "⌘V", icon: ClipboardPaste },
      { value: "delete", label: "Delete", shortcut: "⌘⌫", icon: Trash }
    ]
  },
  {
    heading: "View",
    items: [
      { value: "grid-view", label: "Grid View", icon: LayoutGrid },
      { value: "list-view", label: "List View", icon: List },
      { value: "zoom-in", label: "Zoom In", shortcut: "⌘+", icon: ZoomIn },
      { value: "zoom-out", label: "Zoom Out", shortcut: "⌘-", icon: ZoomOut }
    ]
  },
  {
    heading: "Account",
    items: [
      { value: "profile", label: "Profile", shortcut: "⌘P", icon: User },
      { value: "billing", label: "Billing", shortcut: "⌘B", icon: CreditCard },
      { value: "settings", label: "Settings", shortcut: "⌘S", icon: Settings },
      { value: "notifications", label: "Notifications", icon: Bell },
      { value: "help-support", label: "Help & Support", icon: CircleQuestionMarkIcon }
    ]
  },
  {
    heading: "Tools",
    items: [
      { value: "calculator", label: "Calculator", icon: Calculator },
      { value: "calendar", label: "Calendar", icon: Calendar },
      { value: "image-editor", label: "Image Editor", icon: Image },
      { value: "code-editor", label: "Code Editor", icon: Code }
    ]
  }
]

export default function CommandScrollable() {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")

  const filteredOptions = createMemo(() => {
    const trimmedQuery = query().trim().toLowerCase()

    if (!trimmedQuery) {
      return options
    }

    return options
      .map(({ heading, items }) => ({
        heading,
        items: items.filter((item) => {
          return (
            item.label.toLowerCase().includes(trimmedQuery) ||
            item.value.toLowerCase().includes(trimmedQuery)
          )
        })
      }))
      .filter((group) => group.items.length > 0)
  })

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setQuery("")
    }
  }

  return (
    <div class="flex flex-col gap-4">
      <Button class="w-fit" onClick={() => setOpen(true)} variant="outline">
        Open Menu
      </Button>
      <CommandDialog onOpenChange={handleOpenChange} open={open()}>
        <Command<CommandOption, CommandGroupOption>
          onInputChange={setQuery}
          placeholder="Type a command or search..."
          options={filteredOptions()}
          optionGroupChildren="items"
          optionValue="value"
          optionTextValue="label"
          optionLabel="label"
          itemComponent={(props) => (
            <CommandItem item={props.item}>
              <Dynamic class="size-4" component={props.item.rawValue.icon} />
              <span>{props.item.rawValue.label}</span>
              <Show when={props.item.rawValue.shortcut}>
                {(shortcut) => <CommandShortcut>{shortcut()}</CommandShortcut>}
              </Show>
            </CommandItem>
          )}
          sectionComponent={(props) => (
            <>
              {props.section.index > 0 ? <CommandSeparator /> : null}
              <CommandGroup>
                <CommandGroupLabel>{props.section.rawValue.heading}</CommandGroupLabel>
              </CommandGroup>
            </>
          )}
        >
          <CommandInput />
          <CommandList />
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialog>
    </div>
  )
}
