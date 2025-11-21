import type { ComponentProps, JSX } from "solid-js"

import { IconFolder, IconForward, IconMoreHorizontal, IconTrash2 } from "~/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/v1/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "~/registry/v1/ui/sidebar"

export function NavProjects({
  projects
}: {
  projects: {
    name: string
    url: string
    icon: (props: ComponentProps<"svg">) => JSX.Element
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton as="a" href={item.url}>
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <SidebarMenuAction as={DropdownMenuTrigger} showOnHover>
                <IconMoreHorizontal />
                <span class="sr-only">More</span>
              </SidebarMenuAction>
              <DropdownMenuContent
                // align={isMobile ? "end" : "start"}
                class="w-48 rounded-lg"
                // side={isMobile ? "bottom" : "right"}
              >
                <DropdownMenuItem>
                  <IconFolder class="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconForward class="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <IconTrash2 class="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <IconMoreHorizontal class="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
