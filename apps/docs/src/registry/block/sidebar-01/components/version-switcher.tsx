import { createSignal, For } from "solid-js"

import { IconCheck, IconFile, IconSelector } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/registry/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/registry/ui/sidebar"

export function VersionSwitcher(props: { versions: string[]; defaultVersion: string }) {
  const [selectedVersion, setSelectedVersion] = createSignal(props.defaultVersion)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu placement="bottom-start">
          <DropdownMenuTrigger
            as={SidebarMenuButton}
            size="lg"
            class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <IconFile class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-semibold">Documentation</span>
              <span class="">v{selectedVersion()}</span>
            </div>
            <IconSelector class="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-[--kb-popper-anchor-width]">
            <For each={props.versions}>
              {(version) => (
                <DropdownMenuItem onSelect={() => setSelectedVersion(version)}>
                  v{version} {version === selectedVersion() && <IconCheck class="ml-auto" />}
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
