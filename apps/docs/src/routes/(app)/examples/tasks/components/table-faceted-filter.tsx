import type { JSX } from "solid-js"
import { For, Show } from "solid-js"

import type { Column } from "@tanstack/solid-table"

import { IconCheck, IconCirclePlus } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"
import { Separator } from "@/registry/ui/separator"

type TableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: (props: { class?: string }) => JSX.Element
  }[]
}

export function TableFacetedFilter<TData, TValue>(props: TableFacetedFilterProps<TData, TValue>) {
  // const [selectedValues, setSelectedValues] = createSignal<string[]>([])
  const facets = () => props.column?.getFacetedUniqueValues()
  const selectedValues = () => (props.column?.getFilterValue() ?? []) as string[]

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger as={Button<"button">} variant="outline" size="sm" class="h-8 border-dashed">
        <IconCirclePlus />
        {props.title}
        <Show when={selectedValues().length > 0}>
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge variant="secondary" class="rounded-sm px-1 lg:hidden">
            {selectedValues().length}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Show
              when={selectedValues().length < 3}
              fallback={
                <Badge variant="secondary" class="rounded-sm px-1">
                  {selectedValues().length} selected
                </Badge>
              }
            >
              <For each={selectedValues()}>
                {(option) => (
                  <Badge variant="secondary" class="rounded-sm px-1">
                    {option}
                  </Badge>
                )}
              </For>
            </Show>
          </div>
        </Show>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={props.title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <For each={props.options}>
                {(option) => {
                  const isSelected = () => selectedValues().includes(option.value)
                  return (
                    <CommandItem
                      onSelect={() => {
                        let newValues
                        if (isSelected()) {
                          newValues = selectedValues().filter((item) => item !== option.value)
                        } else {
                          newValues = [...selectedValues(), option.value]
                        }
                        props.column?.setFilterValue(newValues.length ? newValues : undefined)
                      }}
                    >
                      <div
                        class={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                          isSelected()
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <IconCheck />
                      </div>
                      <Show when={option.icon} keyed>
                        {(Icon) => <Icon class="mr-2 size-4 text-muted-foreground" />}
                      </Show>
                      <span>{option.label}</span>
                      <Show when={facets()?.get(option.value)}>
                        {(count) => (
                          <span class="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                            {count()}
                          </span>
                        )}
                      </Show>
                    </CommandItem>
                  )
                }}
              </For>
            </CommandGroup>
            <Show when={selectedValues().length > 0}>
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues([])
                      props.column?.setFilterValue(undefined)
                    }}
                    class="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            </Show>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
