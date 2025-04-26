import { For } from "solid-js"
import { A } from "@solidjs/router"

import { IconCalendar, IconHome, IconMail, IconSearch, IconSettings } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/registry/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "#",
    icon: IconHome
  },
  {
    title: "Inbox",
    url: "#",
    icon: IconMail
  },
  {
    title: "Calendar",
    url: "#",
    icon: IconCalendar
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch
  },
  {
    title: "Settings",
    url: "#",
    icon: IconSettings
  }
]

export default function DemoSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <For each={items}>
                  {(item) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton as={A} href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </For>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header class="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
