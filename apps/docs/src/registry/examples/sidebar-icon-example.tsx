import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChartPie,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Ellipsis,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map as MapIcon,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import { Avatar, AvatarFallback, AvatarImage } from "~/registry/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/registry/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/registry/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/registry/ui/dropdown-menu";
import { Kbd } from "~/registry/ui/kbd";
import { Separator } from "~/registry/ui/separator";
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
} from "~/registry/ui/sidebar";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: ChartPie },
    { name: "Travel", url: "#", icon: MapIcon },
  ],
};

// Team Switcher component
function TeamSwitcher(props: {
  teams: { name: string; logo: Component<ComponentProps<"svg">>; plan: string }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = createSignal(props.teams[0]);

  return (
    <Show when={activeTeam()} keyed>
      {(team) => (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu placement={isMobile() ? "bottom" : "right"}>
              <DropdownMenuTrigger
                as={SidebarMenuButton}
                size="lg"
                class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
              >
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {team.logo({ class: "size-4" })}
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{team.name}</span>
                  <span class="truncate text-xs">{team.plan}</span>
                </div>
                <ChevronsUpDown class="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-(--kb-popper-anchor-width) min-w-56 rounded-lg">
                <DropdownMenuGroupLabel class="text-muted-foreground text-xs">Teams</DropdownMenuGroupLabel>
                <For each={props.teams}>
                  {(team, index) => (
                    <DropdownMenuItem onSelect={() => setActiveTeam(team)} class="gap-2 p-2">
                      <div class="flex size-6 items-center justify-center rounded-md border">
                        {team.logo({ class: "size-3.5 shrink-0" })}
                      </div>
                      {team.name}
                      <Kbd class="ml-auto">⌘{index() + 1}</Kbd>
                    </DropdownMenuItem>
                  )}
                </For>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2">
                  <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus class="size-4" />
                  </div>
                  <span class="font-medium text-muted-foreground">Add team</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </Show>
  );
}

// Nav Main component
function NavMain(props: {
  items: {
    title: string;
    url: string;
    icon?: Component<ComponentProps<"svg">>;
    isActive?: boolean;
    items?: { title: string; url: string }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.items}>
          {(item) => (
            <Collapsible defaultOpen={item.isActive} class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as={SidebarMenuButton} tooltip={item.title}>
                  <Show when={item.icon} keyed>
                    {(Icon) => <Icon />}
                  </Show>
                  <span>{item.title}</span>
                  <ChevronRight class="ml-auto transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90" />
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
  );
}

// Nav Projects component
function NavProjects(props: {
  projects: { name: string; url: string; icon: Component<ComponentProps<"svg">> }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.projects}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href={item.url}>
                {item.icon({})}
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu placement={isMobile() ? "bottom-end" : "right-start"}>
                <DropdownMenuTrigger as={SidebarMenuAction} showOnHover class="">
                  <Ellipsis />
                  <span class="sr-only">More</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48 rounded-lg">
                  <DropdownMenuItem>
                    <Folder class="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward class="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 class="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <Ellipsis class="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Nav User component
function NavUser(props: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu placement={isMobile() ? "bottom-end" : "right-end"}>
          <DropdownMenuTrigger
            as={SidebarMenuButton}
            size="lg"
            class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage src={props.user.avatar} alt={props.user.name} />
              <AvatarFallback class="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{props.user.name}</span>
              <span class="truncate text-xs">{props.user.email}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-(--kb-popper-anchor-width) min-w-56 rounded-lg">
            <DropdownMenuGroupLabel class="p-0 font-normal">
              <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage src={props.user.avatar} alt={props.user.name} />
                  <AvatarFallback class="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">{props.user.name}</span>
                  <span class="truncate text-xs">{props.user.email}</span>
                </div>
              </div>
            </DropdownMenuGroupLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function SidebarIconExample() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
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
            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
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
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
