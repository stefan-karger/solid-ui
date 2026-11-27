import type { ComponentProps } from "@solidjs/web"
import { For, type Component } from "solid-js"
import { createMemo, createSignal, Show } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import {
  Command,
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
  disabled?: boolean
  icon: Component<ComponentProps<"svg">>
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Suggestions",
    items: [
      {
        value: "calculator",
        label: "Calculator",
        disabled: true,
        icon: (props) => <IconPlaceholder lucide="CalculatorIcon" {...props} />
      },
      {
        value: "calendar",
        label: "Calendar",
        icon: (props) => <IconPlaceholder lucide="CalendarIcon" {...props} />
      },
      {
        value: "search-emoji",
        label: "Search Emoji",
        icon: (props) => (
          <IconPlaceholder lucide="FaceSlightlySmilingIcon" {...props} />
        )
      }
    ]
  },
  {
    heading: "Settings",
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
      }
    ]
  }
]

export default function CommandDemo() {
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

  return (
    <Command
      class="max-w-sm rounded-lg border shadow-md"
      onQueryChange={setQuery}
    >
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
                      disabled={option["disabled"] ?? false}
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
  )
}
