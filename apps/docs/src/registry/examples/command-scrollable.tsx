import type { ComponentProps } from "@solidjs/web"
import { For, type Component } from "solid-js"
import { createMemo, createSignal, Show } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
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
  icon: Component<ComponentProps<"svg">>
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Navigation",
    items: [
      {
        value: "home",
        label: "Home",
        shortcut: "⌘H",
        icon: (props) => <IconPlaceholder lucide="HouseIcon" {...props} />
      },
      {
        value: "inbox",
        label: "Inbox",
        shortcut: "⌘I",
        icon: (props) => <IconPlaceholder lucide="InboxIcon" {...props} />
      },
      {
        value: "documents",
        label: "Documents",
        shortcut: "⌘D",
        icon: (props) => <IconPlaceholder lucide="FileTextIcon" {...props} />
      },
      {
        value: "folders",
        label: "Folders",
        shortcut: "⌘F",
        icon: (props) => <IconPlaceholder lucide="FolderIcon" {...props} />
      }
    ]
  },
  {
    heading: "Actions",
    items: [
      {
        value: "new-file",
        label: "New File",
        shortcut: "⌘N",
        icon: (props) => <IconPlaceholder lucide="PlusIcon" {...props} />
      },
      {
        value: "new-folder",
        label: "New Folder",
        shortcut: "⇧⌘N",
        icon: (props) => <IconPlaceholder lucide="FolderPlusIcon" {...props} />
      },
      {
        value: "copy",
        label: "Copy",
        shortcut: "⌘C",
        icon: (props) => <IconPlaceholder lucide="CopyIcon" {...props} />
      },
      {
        value: "cut",
        label: "Cut",
        shortcut: "⌘X",
        icon: (props) => <IconPlaceholder lucide="ScissorsIcon" {...props} />
      },
      {
        value: "paste",
        label: "Paste",
        shortcut: "⌘V",
        icon: (props) => (
          <IconPlaceholder lucide="ClipboardPasteIcon" {...props} />
        )
      },
      {
        value: "delete",
        label: "Delete",
        shortcut: "⌘⌫",
        icon: (props) => <IconPlaceholder lucide="TrashIcon" {...props} />
      }
    ]
  },
  {
    heading: "View",
    items: [
      {
        value: "grid-view",
        label: "Grid View",
        icon: (props) => <IconPlaceholder lucide="LayoutGridIcon" {...props} />
      },
      {
        value: "list-view",
        label: "List View",
        icon: (props) => <IconPlaceholder lucide="ListIcon" {...props} />
      },
      {
        value: "zoom-in",
        label: "Zoom In",
        shortcut: "⌘+",
        icon: (props) => <IconPlaceholder lucide="ZoomInIcon" {...props} />
      },
      {
        value: "zoom-out",
        label: "Zoom Out",
        shortcut: "⌘-",
        icon: (props) => <IconPlaceholder lucide="ZoomOutIcon" {...props} />
      }
    ]
  },
  {
    heading: "Account",
    items: [
      {
        value: "profile",
        label: "Profile",
        shortcut: "⌘P",
        icon: (props) => <IconPlaceholder lucide="UserIcon" {...props} />
      },
      {
        value: "billing",
        label: "Billing",
        shortcut: "⌘B",
        icon: (props) => <IconPlaceholder lucide="CreditCardIcon" {...props} />
      },
      {
        value: "settings",
        label: "Settings",
        shortcut: "⌘S",
        icon: (props) => <IconPlaceholder lucide="SettingsIcon" {...props} />
      },
      {
        value: "notifications",
        label: "Notifications",
        icon: (props) => <IconPlaceholder lucide="BellIcon" {...props} />
      },
      {
        value: "help-support",
        label: "Help & Support",
        icon: (props) => (
          <IconPlaceholder lucide="CircleQuestionMarkIcon" {...props} />
        )
      }
    ]
  },
  {
    heading: "Tools",
    items: [
      {
        value: "calculator",
        label: "Calculator",
        icon: (props) => <IconPlaceholder lucide="CalculatorIcon" {...props} />
      },
      {
        value: "calendar",
        label: "Calendar",
        icon: (props) => <IconPlaceholder lucide="CalendarIcon" {...props} />
      },
      {
        value: "image-editor",
        label: "Image Editor",
        icon: (props) => <IconPlaceholder lucide="ImageIcon" {...props} />
      },
      {
        value: "code-editor",
        label: "Code Editor",
        icon: (props) => <IconPlaceholder lucide="CodeIcon" {...props} />
      }
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
        <Command onQueryChange={setQuery}>
          <CommandInput
            placeholder="Type a command or search..."
            aria-label="Type a command or search..."
          />
          <CommandList>
            <For each={filteredOptions()}>
              {(group, groupIndex) => (
                <>
                  {groupIndex() > 0 ? <CommandSeparator /> : null}
                  <CommandGroup>
                    <CommandGroupLabel>{group.heading}</CommandGroupLabel>
                    <For each={group["items"]}>
                      {(option) => (
                        <CommandItem
                          value={option["value"]}
                          label={option["label"]}
                        >
                          <option.icon class="size-4" />
                          <span>{option.label}</span>
                          <Show when={option.shortcut}>
                            {(shortcut) => (
                              <CommandShortcut>{shortcut()}</CommandShortcut>
                            )}
                          </Show>
                        </CommandItem>
                      )}
                    </For>
                  </CommandGroup>
                </>
              )}
            </For>
          </CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialog>
    </div>
  )
}
