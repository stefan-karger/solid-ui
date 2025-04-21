import { A } from "@solidjs/router";
import { For } from "solid-js";

import {
  IconCalendar,
  IconHome,
  IconMail,
  IconSearch,
  IconSettings,
} from "~/components/icons";
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
  SidebarTrigger,
} from "~/registry/ui/sidebar";

const items = [
  {
    icon: IconHome,
    title: "Home",
    url: "#",
  },
  {
    icon: IconMail,
    title: "Inbox",
    url: "#",
  },
  {
    icon: IconCalendar,
    title: "Calendar",
    url: "#",
  },
  {
    icon: IconSearch,
    title: "Search",
    url: "#",
  },
  {
    icon: IconSettings,
    title: "Settings",
    url: "#",
  },
];

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
  );
}
