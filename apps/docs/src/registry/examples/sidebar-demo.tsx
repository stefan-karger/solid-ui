import { dynamic, type ComponentProps } from "@solidjs/web"
import { createSignal, For, Show, untrack } from "solid-js"

import { IconPlaceholder } from "~/registry/icons/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "~/registry/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
  type SidebarProps
} from "~/registry/ui/sidebar"

const data = {
  user: {
    name: "Stefan",
    email: "@stefan-karger",
    avatar: "https://github.com/stefan-karger.png"
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="GalleryVerticalEndIcon" {...props} />
      ),
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="AudioWaveformIcon" {...props} />
      ),
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="CommandIcon" {...props} />
      ),
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="SquareTerminalIcon" {...props} />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#"
        },
        {
          title: "Starred",
          url: "#"
        },
        {
          title: "Settings",
          url: "#"
        }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="BotIcon" {...props} />
      ),
      items: [
        {
          title: "Genesis",
          url: "#"
        },
        {
          title: "Explorer",
          url: "#"
        },
        {
          title: "Quantum",
          url: "#"
        }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="BookOpenIcon" {...props} />
      ),
      items: [
        {
          title: "Introduction",
          url: "#"
        },
        {
          title: "Get Started",
          url: "#"
        },
        {
          title: "Tutorials",
          url: "#"
        },
        {
          title: "Changelog",
          url: "#"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="Settings2Icon" {...props} />
      ),
      items: [
        {
          title: "General",
          url: "#"
        },
        {
          title: "Team",
          url: "#"
        },
        {
          title: "Billing",
          url: "#"
        },
        {
          title: "Limits",
          url: "#"
        }
      ]
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="FrameIcon" {...props} />
      )
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="ChartPieIcon" {...props} />
      )
    },
    {
      name: "Travel",
      url: "#",
      icon: (props: ComponentProps<"svg">) => (
        <IconPlaceholder lucide="MapIcon" {...props} />
      )
    }
  ]
}

function TeamSwitcher(props: { teams: typeof data.teams }) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = createSignal(
    untrack(() => props.teams[0])
  )
  const TeamLogo = dynamic(() => activeTeam()?.logo)

  return (
    <Show when={activeTeam()}>
      {(team) => (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(partProps) => (
                  <SidebarMenuButton {...partProps} size="lg" />
                )}
                class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
              >
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TeamLogo class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{team().name}</span>
                  <span class="truncate text-xs">{team().plan}</span>
                </div>
                <IconPlaceholder lucide="ChevronsUpDownIcon" class="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile() ? "bottom" : "right"}
                align="start"
                class="w-(--anchor-width) min-w-56 rounded-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel class="text-xs text-muted-foreground">
                    Teams
                  </DropdownMenuLabel>
                  <For each={props.teams}>
                    {(option, index) => (
                      <DropdownMenuItem
                        class="gap-2 p-2"
                        onSelect={() => setActiveTeam(option)}
                      >
                        <div class="flex size-6 items-center justify-center rounded-md border">
                          <option.logo class="size-3.5 shrink-0" />
                        </div>
                        {option.name}
                        <DropdownMenuShortcut>
                          ⌘{index() + 1}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="gap-2 p-2">
                    <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <IconPlaceholder lucide="PlusIcon" class="size-4" />
                    </div>
                    <div class="font-medium text-muted-foreground">
                      Add team
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </Show>
  )
}

function NavMain(props: { items: typeof data.navMain }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.items}>
          {(item) => (
            <Collapsible
              class="group/collapsible"
              defaultOpen={item.isActive ?? false}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={(partProps) => (
                    <SidebarMenuButton {...partProps} tooltip={item.title} />
                  )}
                  class=""
                >
                  <item.icon />
                  <span>{item.title}</span>
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    class="ml-auto transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <For each={item.items}>
                      {(subItem) => (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton as="a" href={subItem.url}>
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </For>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )}
        </For>
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavProjects(props: { projects: typeof data.projects }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.projects}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={(partProps) => (
                    <SidebarMenuAction {...partProps} showOnHover />
                  )}
                  class=""
                >
                  <IconPlaceholder lucide="EllipsisIcon" />
                  <span class="sr-only">More</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={isMobile() ? "bottom" : "right"}
                  align={isMobile() ? "end" : "start"}
                  class="w-48 rounded-lg"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="FolderIcon"
                        class="text-muted-foreground"
                      />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="ForwardIcon"
                        class="text-muted-foreground"
                      />
                      <span>Share Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="TrashIcon"
                        class="text-muted-foreground"
                      />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <IconPlaceholder
              lucide="EllipsisIcon"
              class="text-sidebar-foreground/70"
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavUser(props: { user: typeof data.user }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(partProps) => (
              <SidebarMenuButton {...partProps} size="lg" />
            )}
            class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
          >
            <Avatar class="size-8 rounded-lg">
              <AvatarImage alt={props.user.name} src={props.user.avatar} />
              <AvatarFallback class="rounded-lg">SK</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{props.user.name}</span>
              <span class="truncate text-xs">{props.user.email}</span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              class="ml-auto size-4"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile() ? "bottom" : "right"}
            align="end"
            class="w-(--anchor-width) min-w-56 rounded-lg"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="size-8 rounded-lg">
                    <AvatarImage
                      alt={props.user.name}
                      src={props.user.avatar}
                    />
                    <AvatarFallback class="rounded-lg">SK</AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-medium">{props.user.name}</span>
                    <span class="truncate text-xs">{props.user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder lucide="SparklesIcon" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder lucide="BadgeCheckIcon" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder lucide="CreditCardIcon" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder lucide="BellIcon" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder lucide="LogOutIcon" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default function SidebarDemo(props: SidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
