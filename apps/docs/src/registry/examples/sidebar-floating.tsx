import type { JSX } from "solid-js"
import { For, Show } from "solid-js"

import { GalleryVerticalEnd } from "lucide-solid"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/registry/ui/breadcrumb"
import { Separator } from "~/registry/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from "~/registry/ui/sidebar"

// Sample data
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" }
      ]
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        { title: "Routing", url: "#" },
        { title: "Data Fetching", url: "#", isActive: true },
        { title: "Rendering", url: "#" },
        { title: "Caching", url: "#" },
        { title: "Styling", url: "#" },
        { title: "Optimizing", url: "#" },
        { title: "Configuring", url: "#" },
        { title: "Testing", url: "#" },
        { title: "Authentication", url: "#" },
        { title: "Deploying", url: "#" },
        { title: "Upgrading", url: "#" },
        { title: "Examples", url: "#" }
      ]
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        { title: "Components", url: "#" },
        { title: "File Conventions", url: "#" },
        { title: "Functions", url: "#" },
        { title: "next.config.js Options", url: "#" },
        { title: "CLI", url: "#" },
        { title: "Edge Runtime", url: "#" }
      ]
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        { title: "Accessibility", url: "#" },
        { title: "Fast Refresh", url: "#" },
        { title: "Next.js Compiler", url: "#" },
        { title: "Supported Browsers", url: "#" },
        { title: "Turbopack", url: "#" }
      ]
    },
    {
      title: "Community",
      url: "#",
      items: [{ title: "Contribution Guide", url: "#" }]
    }
  ]
}

export default function SidebarFloatingExample() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem"
        } as JSX.CSSProperties
      }
    >
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href="#" size="lg">
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd class="size-4" />
                </div>
                <div class="flex flex-col gap-0.5 leading-none">
                  <span class="font-medium">Documentation</span>
                  <span class="">v1.0.0</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu class="gap-2">
              <For each={data.navMain}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as="a" class="font-medium" href={item.url}>
                      {item.title}
                    </SidebarMenuButton>
                    <Show when={item.items?.length}>
                      <SidebarMenuSub class="ml-0 border-l-0 px-1.5">
                        <For each={item.items}>
                          {(subItem) => (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                as="a"
                                href={subItem.url}
                                isActive={subItem.isActive}
                              >
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </For>
                      </SidebarMenuSub>
                    </Show>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator class="mr-2 data-[orientation=vertical]:h-full" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
