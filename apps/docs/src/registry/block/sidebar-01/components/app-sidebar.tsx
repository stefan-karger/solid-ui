import { For } from "solid-js"
import type { ComponentProps } from "solid-js"
import { A } from "@solidjs/router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/registry/ui/sidebar"

import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-switcher"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#"
        },
        {
          title: "Project Structure",
          url: "#"
        }
      ]
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#"
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true
        },
        {
          title: "Rendering",
          url: "#"
        },
        {
          title: "Caching",
          url: "#"
        },
        {
          title: "Styling",
          url: "#"
        },
        {
          title: "Optimizing",
          url: "#"
        },
        {
          title: "Configuring",
          url: "#"
        },
        {
          title: "Testing",
          url: "#"
        },
        {
          title: "Authentication",
          url: "#"
        },
        {
          title: "Deploying",
          url: "#"
        },
        {
          title: "Upgrading",
          url: "#"
        },
        {
          title: "Examples",
          url: "#"
        }
      ]
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#"
        },
        {
          title: "File Conventions",
          url: "#"
        },
        {
          title: "Functions",
          url: "#"
        },
        {
          title: "next.config.js Options",
          url: "#"
        },
        {
          title: "CLI",
          url: "#"
        },
        {
          title: "Edge Runtime",
          url: "#"
        }
      ]
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#"
        },
        {
          title: "Fast Refresh",
          url: "#"
        },
        {
          title: "Next.js Compiler",
          url: "#"
        },
        {
          title: "Supported Browsers",
          url: "#"
        },
        {
          title: "Turbopack",
          url: "#"
        }
      ]
    }
  ]
}

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <For each={data.navMain}>
          {(item) => (
            <SidebarGroup>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <For each={item.items}>
                    {(item) => (
                      <SidebarMenuItem>
                        <SidebarMenuButton as={A} isActive={item.isActive} href={item.url}>
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </For>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </For>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
