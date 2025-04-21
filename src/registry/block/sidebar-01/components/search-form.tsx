import type { ComponentProps } from "solid-js";

import { IconSearch } from "~/components/icons";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "~/registry/ui/sidebar";

export function SearchForm(props: ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup class="py-0">
        <SidebarGroupContent class="relative">
          <label class="sr-only" for="search">
            Search
          </label>
          <SidebarInput
            class="pl-8"
            id="search"
            placeholder="Search the docs..."
          />
          <IconSearch class="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 size-4 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
