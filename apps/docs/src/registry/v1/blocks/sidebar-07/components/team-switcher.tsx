import { type ComponentProps, createSignal, For, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"

import { IconChevronsUpDown, IconPlus } from "~/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "~/registry/v1/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "~/registry/v1/ui/sidebar"

export function TeamSwitcher(props: {
  teams: {
    name: string
    logo: (props: ComponentProps<"svg">) => JSX.Element
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = createSignal(props.teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            as={DropdownMenuTrigger}
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            size="lg"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Dynamic class="size-4" component={activeTeam().logo} />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{activeTeam().name}</span>
              <span class="truncate text-xs">{activeTeam().plan}</span>
            </div>
            <IconChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>

          <DropdownMenuContent
            class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            // side={isMobile ? "bottom" : "right"}
            // sideOffset={4}
          >
            <DropdownMenuLabel class="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
            <For each={props.teams}>
              {(team, index) => (
                <DropdownMenuItem class="gap-2 p-2" onClick={() => setActiveTeam(team)}>
                  <div class="flex size-6 items-center justify-center rounded-md border">
                    <Dynamic class="size-3.5 shrink-0" component={team.logo} />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index() + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
            </For>

            <DropdownMenuSeparator />
            <DropdownMenuItem class="gap-2 p-2">
              <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <IconPlus class="size-4" />
              </div>
              <div class="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
