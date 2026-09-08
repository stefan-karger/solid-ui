import { Dynamic } from "@solidjs/web"
import {
  AudioWaveformIcon,
  BadgeCheckIcon,
  BellIcon,
  BookOpenIcon,
  BotIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CreditCardIcon,
  FolderIcon,
  ForwardIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  LogOutIcon,
  MapIcon,
  EllipsisIcon,
  ChartPieIcon,
  PlusIcon,
  Settings2Icon,
  SparklesIcon,
  SquareTerminalIcon,
  TrashIcon
} from "lucide-solid"
import { createSignal, For, Show } from "solid-js"

import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"
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
      logo: GalleryVerticalEndIcon,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveformIcon,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: CommandIcon,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminalIcon,
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
      icon: BotIcon,
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
      icon: BookOpenIcon,
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
      icon: Settings2Icon,
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
      icon: FrameIcon
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: ChartPieIcon
    },
    {
      name: "Travel",
      url: "#",
      icon: MapIcon
    }
  ]
}

function TeamSwitcher(props: { teams: typeof data.teams }) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = createSignal(props.teams[0])

  return (
    <Show when={activeTeam()}>
      {(team) => (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu placement={isMobile() ? "bottom-start" : "right-start"}>
              <DropdownMenuTrigger
                as={SidebarMenuButton}
                class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
                size="lg"
              >
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Dynamic class="size-4" component={team().logo} />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{team().name}</span>
                  <span class="truncate text-xs">{team().plan}</span>
                </div>
                <ChevronsUpDownIcon class="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-(--kb-popper-anchor-width) min-w-56 rounded-lg">
                <DropdownMenuGroup>
                  <DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
                  <For each={props.teams}>
                    {(option, index) => (
                      <DropdownMenuItem class="gap-2 p-2" onSelect={() => setActiveTeam(option)}>
                        <div class="flex size-6 items-center justify-center rounded-md border">
                          <Dynamic class="size-3.5 shrink-0" component={option.logo} />
                        </div>
                        {option.name}
                        <DropdownMenuShortcut>⌘{index() + 1}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    )}
                  </For>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem class="gap-2 p-2">
                    <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <PlusIcon class="size-4" />
                    </div>
                    <div class="font-medium text-muted-foreground">Add team</div>
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
            <Collapsible class="group/collapsible" defaultOpen={item.isActive ?? false}>
              <SidebarMenuItem>
                <CollapsibleTrigger as={SidebarMenuButton} class="" tooltip={item.title}>
                  <Dynamic component={item.icon} />
                  <span>{item.title}</span>
                  <ChevronRightIcon class="ml-auto transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90" />
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
                <Dynamic component={item.icon} />
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu placement={isMobile() ? "bottom-end" : "right-start"}>
                <DropdownMenuTrigger as={SidebarMenuAction} class="" showOnHover>
                  <EllipsisIcon />
                  <span class="sr-only">More</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48 rounded-lg">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <FolderIcon class="text-muted-foreground" />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ForwardIcon class="text-muted-foreground" />
                      <span>Share Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <TrashIcon class="text-muted-foreground" />
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
            <EllipsisIcon class="text-sidebar-foreground/70" />
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
        <DropdownMenu placement={isMobile() ? "bottom-end" : "right-end"}>
          <DropdownMenuTrigger
            as={SidebarMenuButton}
            class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
            size="lg"
          >
            <Avatar class="size-8 rounded-lg">
              <AvatarImage alt={props.user.name} src={props.user.avatar} />
              <AvatarFallback class="rounded-lg">SK</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{props.user.name}</span>
              <span class="truncate text-xs">{props.user.email}</span>
            </div>
            <ChevronsUpDownIcon class="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-(--kb-popper-anchor-width) min-w-56 rounded-lg">
            <DropdownMenuGroup>
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="size-8 rounded-lg">
                    <AvatarImage alt={props.user.name} src={props.user.avatar} />
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
                <SparklesIcon />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOutIcon />
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
