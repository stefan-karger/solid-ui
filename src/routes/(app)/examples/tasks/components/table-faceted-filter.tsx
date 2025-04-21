import type { Column } from "@tanstack/solid-table";
import type { JSX } from "solid-js";
import { createSignal, For, Show } from "solid-js";

import { IconCheck, IconCirclePlus } from "~/components/icons";
import { cn } from "~/lib/utils";
import { Badge } from "~/registry/ui/badge";
import { Button } from "~/registry/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/registry/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover";
import { Separator } from "~/registry/ui/separator";

type TableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: (props: { class?: string }) => JSX.Element;
  }[];
};

export function TableFacetedFilter<TData, TValue>(
  props: TableFacetedFilterProps<TData, TValue>,
) {
  const facets = () => props.column?.getFacetedUniqueValues();
  const [selectedValues, setSelectedValues] = createSignal<string[]>(
    (props.column?.getFilterValue() ?? []) as string[],
  );

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger
        as={Button<"button">}
        class="h-8 border-dashed"
        size="sm"
        variant="outline"
      >
        <IconCirclePlus />
        {props.title}
        <Show when={selectedValues().length > 0}>
          <Separator class="mx-2 h-4" orientation="vertical" />
          <Badge class="rounded-sm px-1 lg:hidden" variant="secondary">
            {selectedValues().length}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Show
              fallback={
                <Badge class="rounded-sm px-1" variant="secondary">
                  {selectedValues().length} selected
                </Badge>
              }
              when={selectedValues().length < 3}
            >
              <For each={selectedValues()}>
                {(option) => (
                  <Badge class="rounded-sm px-1" variant="secondary">
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
                  const isSelected = () =>
                    selectedValues().includes(option.value);
                  return (
                    <CommandItem
                      onSelect={() => {
                        let newValues: string[];
                        if (isSelected()) {
                          newValues = selectedValues().filter(
                            (item) => item !== option.value,
                          );
                        } else {
                          newValues = [...selectedValues(), option.value];
                        }
                        props.column?.setFilterValue(
                          newValues.length ? newValues : undefined,
                        );
                      }}
                    >
                      <div
                        class={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                          isSelected()
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <IconCheck />
                      </div>
                      <Show keyed when={option.icon}>
                        {(Icon) => (
                          <Icon class="mr-2 size-4 text-muted-foreground" />
                        )}
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
                  );
                }}
              </For>
            </CommandGroup>
            <Show when={selectedValues().length > 0}>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  class="justify-center text-center"
                  onSelect={() => {
                    setSelectedValues([]);
                    props.column?.setFilterValue(undefined);
                  }}
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </Show>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
